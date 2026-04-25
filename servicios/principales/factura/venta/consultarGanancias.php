<?php
// consultarGanancias.php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET');

include "../../../conexion.php";
try {
    $desde = $_GET['desde'] ?? null;
    $hasta = $_GET['hasta'] ?? null;

    if (!$desde || !$hasta) {
        throw new Exception('Fechas requeridas');
    }

    
    $db = $pdo;

    // 1. Obtener facturas del período (solo pagadas) - EXCLUYENDO TIPO 2
    $queryFacturas = "
        SELECT 
            fv.id as factura_id,
            fv.total as total_venta,
            fv.descuento as descuento_factura,
            fv.fecha,
            (
                SELECT SUM(monto_final)
                FROM Pagos_Cliente pc
                WHERE pc.id_factura_venta = fv.id
            ) as total_pagado
        FROM FacturaVenta fv
        WHERE DATE(fv.fecha) BETWEEN :desde AND :hasta
        AND fv.id_tipo_factura != 2  /* 🔥 EXCLUIR FACTURAS TIPO 2 */
        HAVING total_pagado >= total_venta - 0.01 -- Solo facturas pagadas
        ORDER BY fv.fecha DESC
    ";

    $stmt = $db->prepare($queryFacturas);
    $stmt->execute([
        ':desde' => $desde,
        ':hasta' => $hasta
    ]);
    $facturas = $stmt->fetchAll(PDO::FETCH_ASSOC);

    if (empty($facturas)) {
        echo json_encode([
            'status' => 'success',
            'data' => [
                'ventas_totales' => 0,
                'costo_ventas' => 0,
                'ganancia_bruta' => 0,
                'gastos_operativos' => 0,
                'ganancia_neta' => 0,
                'margen_bruto' => 0,
                'margen_neto' => 0,
                'facturas_count' => 0,
                'productos_vendidos' => 0,
                'detalle_por_producto' => [],
                'detalle_por_factura' => []
            ]
        ]);
        exit;
    }

    $facturasIds = array_column($facturas, 'factura_id');
    $facturasIdsStr = implode(',', $facturasIds);

    // 2. Obtener detalles de venta con costos de productos
    $queryDetalles = "
        SELECT 
            dv.id_factura_venta,
            dv.id_producto,
            dv.descripcion,
            dv.cantidad,
            dv.pvp as precio_venta,
            p.costo as precio_costo,
            (dv.pvp - p.costo) as ganancia_unitaria,
            (dv.cantidad * dv.pvp) as total_venta_producto,
            (dv.cantidad * p.costo) as total_costo_producto,
            (dv.cantidad * (dv.pvp - p.costo)) as ganancia_producto
        FROM DetalleVenta dv
        INNER JOIN Producto p ON dv.id_producto = p.id
        WHERE dv.id_factura_venta IN ($facturasIdsStr)
    ";

    $stmt = $db->prepare($queryDetalles);
    $stmt->execute();
    $detalles = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // 3. Calcular totales
    $ventas_totales = 0;
    $costo_ventas = 0;
    $productos_vendidos = 0;
    $ganancia_bruta = 0;

    $detalle_por_producto = [];
    $detalle_por_factura = [];

    foreach ($detalles as $detalle) {
        $ventas_totales += $detalle['total_venta_producto'];
        $costo_ventas += $detalle['total_costo_producto'];
        $productos_vendidos += $detalle['cantidad'];
        
        $ganancia_producto = $detalle['total_venta_producto'] - $detalle['total_costo_producto'];
        $ganancia_bruta += $ganancia_producto;

        // Agrupar por producto
        $producto_id = $detalle['id_producto'];
        if (!isset($detalle_por_producto[$producto_id])) {
            $detalle_por_producto[$producto_id] = [
                'id_producto' => $producto_id,
                'descripcion' => $detalle['descripcion'],
                'cantidad_vendida' => 0,
                'ventas_totales' => 0,
                'costo_total' => 0,
                'ganancia' => 0,
                'margen' => 0
            ];
        }

        $detalle_por_producto[$producto_id]['cantidad_vendida'] += $detalle['cantidad'];
        $detalle_por_producto[$producto_id]['ventas_totales'] += $detalle['total_venta_producto'];
        $detalle_por_producto[$producto_id]['costo_total'] += $detalle['total_costo_producto'];
        $detalle_por_producto[$producto_id]['ganancia'] += $ganancia_producto;

        // Agrupar por factura
        $factura_id = $detalle['id_factura_venta'];
        if (!isset($detalle_por_factura[$factura_id])) {
            $detalle_por_factura[$factura_id] = [
                'factura_id' => $factura_id,
                'fecha' => null,
                'total_venta' => 0,
                'costo_total' => 0,
                'ganancia' => 0,
                'productos' => []
            ];
        }

        $detalle_por_factura[$factura_id]['total_venta'] += $detalle['total_venta_producto'];
        $detalle_por_factura[$factura_id]['costo_total'] += $detalle['total_costo_producto'];
        $detalle_por_factura[$factura_id]['ganancia'] += $ganancia_producto;
    }

    // Calcular márgenes
    $margen_bruto = $ventas_totales > 0 ? ($ganancia_bruta / $ventas_totales) * 100 : 0;

    // 4. Obtener gastos operativos (si tienes tabla de gastos)
    $gastos_operativos = 0;
    // $gastos_operativos = $this->obtenerGastos($desde, $hasta);

    $ganancia_neta = $ganancia_bruta - $gastos_operativos;
    $margen_neto = $ventas_totales > 0 ? ($ganancia_neta / $ventas_totales) * 100 : 0;

    // Asignar fechas a facturas
    foreach ($facturas as $factura) {
        if (isset($detalle_por_factura[$factura['factura_id']])) {
            $detalle_por_factura[$factura['factura_id']]['fecha'] = $factura['fecha'];
        }
    }

    // Convertir a arrays indexados
    $detalle_por_producto = array_values($detalle_por_producto);
    $detalle_por_factura = array_values($detalle_por_factura);

    // Calcular margen por producto
    foreach ($detalle_por_producto as &$producto) {
        $producto['margen'] = $producto['ventas_totales'] > 0 
            ? ($producto['ganancia'] / $producto['ventas_totales']) * 100 
            : 0;
    }

    $resultado = [
        'ventas_totales' => round($ventas_totales, 2),
        'costo_ventas' => round($costo_ventas, 2),
        'ganancia_bruta' => round($ganancia_bruta, 2),
        'gastos_operativos' => round($gastos_operativos, 2),
        'ganancia_neta' => round($ganancia_neta, 2),
        'margen_bruto' => round($margen_bruto, 2),
        'margen_neto' => round($margen_neto, 2),
        'facturas_count' => count($facturas),
        'productos_vendidos' => $productos_vendidos,
        'detalle_por_producto' => $detalle_por_producto,
        'detalle_por_factura' => $detalle_por_factura,
        'fecha_desde' => $desde,
        'fecha_hasta' => $hasta
    ];

    echo json_encode([
        'status' => 'success',
        'data' => $resultado
    ]);

} catch (Exception $e) {
    echo json_encode([
        'status' => 'error',
        'message' => $e->getMessage()
    ]);
}
?>