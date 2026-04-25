<?php
// consultarGananciasPorProducto.php
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

    
    $db =$pdo;

    $query = "
        SELECT 
            p.id,
            p.descripcion,
            p.costo,
            p.pvp,
            SUM(dv.cantidad) as cantidad_vendida,
            SUM(dv.cantidad * dv.pvp) as total_ventas,
            SUM(dv.cantidad * p.costo) as total_costos,
            SUM(dv.cantidad * (dv.pvp - p.costo)) as ganancia_total,
            COUNT(DISTINCT dv.id_factura_venta) as facturas_count
        FROM DetalleVenta dv
        INNER JOIN Producto p ON dv.id_producto = p.id
        INNER JOIN FacturaVenta fv ON dv.id_factura_venta = fv.id
        WHERE DATE(fv.fecha) BETWEEN :desde AND :hasta
        AND fv.id_tipo_factura != 2  /* 🔥 EXCLUIR FACTURAS TIPO 2 */
        GROUP BY p.id, p.descripcion, p.costo, p.pvp
        HAVING cantidad_vendida > 0
        ORDER BY ganancia_total DESC
    ";

    $stmt = $db->prepare($query);
    $stmt->execute([
        ':desde' => $desde,
        ':hasta' => $hasta
    ]);

    $productos = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Calcular margen para cada producto
    foreach ($productos as &$producto) {
        $producto['margen_bruto'] = $producto['total_ventas'] > 0 
            ? round(($producto['ganancia_total'] / $producto['total_ventas']) * 100, 2)
            : 0;
        
        $producto['total_ventas'] = round($producto['total_ventas'], 2);
        $producto['total_costos'] = round($producto['total_costos'], 2);
        $producto['ganancia_total'] = round($producto['ganancia_total'], 2);
    }

    echo json_encode([
        'status' => 'success',
        'data' => $productos
    ]);

} catch (Exception $e) {
    echo json_encode([
        'status' => 'error',
        'message' => $e->getMessage()
    ]);
}
?>