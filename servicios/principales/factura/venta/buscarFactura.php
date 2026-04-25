<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Incluir conexión - ajusta la ruta según sea necesario
require_once "../../../conexion.php";

try {
    if (!isset($pdo)) {
        throw new Exception("Error de conexión a la base de datos");
    }

    // Obtener parámetros de fecha
    $desde = isset($_GET['desde']) ? $_GET['desde'] : date('Y-m-d');
    $hasta = isset($_GET['hasta']) ? $_GET['hasta'] : date('Y-m-d');

    // Configurar para evitar cortes en JSON largos
    $pdo->exec("SET SESSION group_concat_max_len = 1000000");

    // Obtener ventas del período - EXCLUYENDO id_tipo_factura = 2
    $sqlVentas = "
        SELECT 
            fv.id AS factura_id,
            fv.id_cliente,
            fv.id_tipo_factura,
            COALESCE(fv.descuento, 0) AS factura_descuento,
            COALESCE(fv.total, 0) AS factura_total,
            fv.fecha AS factura_fecha,
            COALESCE(fv.descuento, 0) AS descuento,
            COALESCE(fv.total, 0) AS total,

            -- Cliente
            JSON_OBJECT(
                'id', COALESCE(cli.id, 0),
                'nombre', COALESCE(cli.nombre, ''),
                'apellido', COALESCE(cli.apellido, ''),
                'cuit', COALESCE(cli.cuit, ''),
                'direccion', COALESCE(cli.direccion, ''),
                'telefono', COALESCE(cli.telefono, '')
            ) AS cliente,

            -- Tipo de factura
            JSON_OBJECT(
                'id', COALESCE(tf.id, 0),
                'tipo_factura', COALESCE(tf.tipo_factura, '')
            ) AS tipo_factura,

            -- Detalles de venta
            (
                SELECT CONCAT(
                    '[',
                    IFNULL(
                        GROUP_CONCAT(
                            JSON_OBJECT(
                                'id', COALESCE(dv.id, 0),
                                'id_producto', COALESCE(dv.id_producto, 0),
                                'descripcion', COALESCE(dv.descripcion, ''),
                                'cantidad', COALESCE(dv.cantidad, 0),
                                'pvp', COALESCE(dv.pvp, 0),
                                'descuento', COALESCE(dv.descuento, 0),
                                'subtotal', COALESCE((dv.cantidad * dv.pvp - COALESCE(dv.descuento, 0)), 0)
                            ) SEPARATOR ','
                        ),
                        ''
                    ),
                    ']'
                )
                FROM DetalleVenta dv
                WHERE dv.id_factura_venta = fv.id
            ) AS detalles,

            -- Pagos del cliente
            (
                SELECT CONCAT(
                    '[',
                    IFNULL(
                        GROUP_CONCAT(
                            JSON_OBJECT(
                                'id', COALESCE(pc.id, 0),
                                'fecha', COALESCE(pc.fecha, ''),
                                'tipo_pago', JSON_OBJECT(
                                    'id', COALESCE(tp.id, 0),
                                    'descripcion', COALESCE(tp.descripcion, '')
                                ),
                                'monto', COALESCE(pc.monto, 0),
                                'monto_final', COALESCE(pc.monto_final, 0)
                            ) SEPARATOR ','
                        ),
                        ''
                    ),
                    ']'
                )
                FROM Pagos_Cliente pc
                LEFT JOIN Tipo_Pago tp ON tp.id = pc.id_tipo_pago
                WHERE pc.id_factura_venta = fv.id
            ) AS pagos

        FROM FacturaVenta fv
        LEFT JOIN Cliente cli ON fv.id_cliente = cli.id
        LEFT JOIN Tipo_Factura tf ON fv.id_tipo_factura = tf.id
        WHERE DATE(fv.fecha) BETWEEN :desde AND :hasta
        AND fv.id_tipo_factura != 2  /* 🔥 EXCLUIR FACTURAS TIPO 2 */
        ORDER BY fv.fecha DESC
    ";

    // Resumen por tipo de pago - EXCLUYENDO id_tipo_factura = 2
    $sqlPagosPorTipo = "
        SELECT 
            COALESCE(tp.id, 0) AS tipo_pago_id,
            COALESCE(tp.descripcion, 'Efectivo') AS tipo_pago,
            COUNT(DISTINCT pc.id_factura_venta) AS cantidad_facturas,
            COUNT(pc.id) AS cantidad_pagos,
            COALESCE(SUM(pc.monto_final), 0) AS total_pagado
        FROM Pagos_Cliente pc
        LEFT JOIN Tipo_Pago tp ON tp.id = pc.id_tipo_pago
        INNER JOIN FacturaVenta fv ON fv.id = pc.id_factura_venta
        WHERE DATE(fv.fecha) BETWEEN :desde AND :hasta
        AND fv.id_tipo_factura != 2  /* 🔥 EXCLUIR FACTURAS TIPO 2 */
        GROUP BY tp.id, tp.descripcion
        ORDER BY total_pagado DESC
    ";

    // Resumen general - EXCLUYENDO id_tipo_factura = 2
    $sqlResumen = "
        SELECT 
            COUNT(DISTINCT fv.id) AS total_facturas,
            COALESCE(SUM(fv.total), 0) AS total_ventas,
            COALESCE(SUM(fv.descuento), 0) AS total_descuentos,
            COALESCE((
                SELECT SUM(COALESCE(monto_final, 0)) 
                FROM Pagos_Cliente pc 
                INNER JOIN FacturaVenta fv2 ON fv2.id = pc.id_factura_venta
                WHERE DATE(fv2.fecha) BETWEEN :desde AND :hasta
                AND fv2.id_tipo_factura != 2  /* 🔥 EXCLUIR FACTURAS TIPO 2 */
            ), 0) AS total_pagado,
            COUNT(DISTINCT fv.id_cliente) AS clientes_atendidos
        FROM FacturaVenta fv
        WHERE DATE(fv.fecha) BETWEEN :desde AND :hasta
        AND fv.id_tipo_factura != 2  /* 🔥 EXCLUIR FACTURAS TIPO 2 */
    ";

    // Ejecutar consultas
    $stmt = $pdo->prepare($sqlVentas);
    $stmt->execute([':desde' => $desde, ':hasta' => $hasta]);
    $ventas = $stmt->fetchAll(PDO::FETCH_ASSOC);

    $stmt = $pdo->prepare($sqlPagosPorTipo);
    $stmt->execute([':desde' => $desde, ':hasta' => $hasta]);
    $pagosPorTipo = $stmt->fetchAll(PDO::FETCH_ASSOC);

    $stmt = $pdo->prepare($sqlResumen);
    $stmt->execute([':desde' => $desde, ':hasta' => $hasta]);
    $resumen = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$resumen) {
        $resumen = [
            'total_facturas' => 0,
            'total_ventas' => 0,
            'total_descuentos' => 0,
            'total_pagado' => 0,
            'clientes_atendidos' => 0
        ];
    }

    // Convertir strings JSON a arrays
    foreach ($ventas as &$row) {
        $row['cliente'] = json_decode($row['cliente'], true) ?: [];
        $row['tipo_factura'] = json_decode($row['tipo_factura'], true) ?: [];
        $row['detalles'] = json_decode($row['detalles'], true) ?: [];
        $row['pagos'] = json_decode($row['pagos'], true) ?: [];
        
        // Asegurar que los valores numéricos sean números
        $row['factura_descuento'] = floatval($row['factura_descuento']);
        $row['factura_total'] = floatval($row['factura_total']);
        $row['descuento'] = floatval($row['descuento']);
        $row['total'] = floatval($row['total']);
    }

    echo json_encode([
        "status" => "success",
        "data" => [
            "ventas" => $ventas,
            "resumen" => $resumen,
            "pagos_por_tipo" => $pagosPorTipo
        ],
        "filtros" => [
            "desde" => $desde,
            "hasta" => $hasta
        ]
    ], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        "status" => "error",
        "message" => "Error en la base de datos: " . $e->getMessage()
    ]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        "status" => "error",
        "message" => $e->getMessage()
    ]);
}
?>