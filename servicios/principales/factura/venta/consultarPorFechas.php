<?php
header("Content-Type: application/json; charset=UTF-8");
include "../../../conexion.php";

try {
    // 🔹 Obtener parámetros de fecha
    $desde = isset($_GET['desde']) ? $_GET['desde'] : null;
    $hasta = isset($_GET['hasta']) ? $_GET['hasta'] : null;

    if (!$desde || !$hasta) {
        echo json_encode([
            "status" => "error",
            "message" => "Debe especificar fecha desde y hasta"
        ]);
        exit;
    }

    // 🔹 Evita cortes en JSON largos
    $pdo->exec("SET SESSION group_concat_max_len = 1000000");

    // 🔹 Obtener ventas del período - EXCLUYENDO TIPO 2
    $sqlVentas = "
        SELECT 
            fv.id AS factura_id,
            fv.id_cliente,
            fv.id_tipo_factura,
            fv.descuento AS factura_descuento,
            fv.total AS factura_total,
            fv.fecha AS factura_fecha,

            -- Cliente completo
            JSON_OBJECT(
                'id', cli.id,
                'nombre', cli.nombre,
                'apellido', cli.apellido,
                'cuit', cli.cuit,
                'direccion', cli.direccion,
                'telefono', cli.telefono
            ) AS cliente,

            -- Tipo de factura
            JSON_OBJECT(
                'id', tf.id,
                'tipo_factura', tf.tipo_factura
            ) AS tipo_factura,

            -- Detalles de venta con productos
            (
                SELECT CONCAT(
                    '[',
                    IFNULL(
                        GROUP_CONCAT(
                            JSON_OBJECT(
                                'id', dv.id,
                                'id_producto', dv.id_producto,
                                'descripcion', dv.descripcion,
                                'cantidad', dv.cantidad,
                                'pvp', dv.pvp,
                                'descuento', dv.descuento,
                                'subtotal', (dv.cantidad * dv.pvp - dv.descuento)
                            ) SEPARATOR ','
                        ),
                        ''
                    ),
                    ']'
                )
                FROM DetalleVenta dv
                WHERE dv.id_factura_venta = fv.id
            ) AS detalles,

            -- Pagos del cliente con tipo de pago
            (
                SELECT CONCAT(
                    '[',
                    IFNULL(
                        GROUP_CONCAT(
                            JSON_OBJECT(
                                'id', pc.id,
                                'fecha', pc.fecha,
                                'tipo_pago', JSON_OBJECT(
                                    'id', tp.id,
                                    'descripcion', tp.descripcion
                                ),
                                'monto', pc.monto,
                                'monto_final', pc.monto_final
                            ) SEPARATOR ','
                        ),
                        ''
                    ),
                    ']'
                )
                FROM Pagos_Cliente pc
                INNER JOIN Tipo_Pago tp ON tp.id = pc.id_tipo_pago
                WHERE pc.id_factura_venta = fv.id
            ) AS pagos

        FROM FacturaVenta fv
        INNER JOIN Cliente cli ON fv.id_cliente = cli.id
        INNER JOIN Tipo_Factura tf ON fv.id_tipo_factura = tf.id
        WHERE DATE(fv.fecha) BETWEEN :desde AND :hasta
        AND fv.id_tipo_factura != 2  /* 🔥 EXCLUIR FACTURAS TIPO 2 */
        ORDER BY fv.fecha DESC
    ";

    // 🔹 Obtener resumen por tipo de pago - EXCLUYENDO TIPO 2
    $sqlPagosPorTipo = "
        SELECT 
            tp.id AS tipo_pago_id,
            tp.descripcion AS tipo_pago,
            COUNT(DISTINCT pc.id_factura_venta) AS cantidad_facturas,
            COUNT(pc.id) AS cantidad_pagos,
            SUM(pc.monto_final) AS total_pagado
        FROM Pagos_Cliente pc
        INNER JOIN Tipo_Pago tp ON tp.id = pc.id_tipo_pago
        INNER JOIN FacturaVenta fv ON fv.id = pc.id_factura_venta
        WHERE DATE(fv.fecha) BETWEEN :desde AND :hasta
        AND fv.id_tipo_factura != 2  /* 🔥 EXCLUIR FACTURAS TIPO 2 */
        GROUP BY tp.id, tp.descripcion
        ORDER BY total_pagado DESC
    ";

    // 🔹 Resumen general del período - EXCLUYENDO TIPO 2
    $sqlResumen = "
        SELECT 
            COUNT(DISTINCT fv.id) AS total_facturas,
            COALESCE(SUM(fv.total), 0) AS total_ventas,
            COALESCE(SUM(fv.descuento), 0) AS total_descuentos,
            COALESCE((
                SELECT SUM(monto_final) 
                FROM Pagos_Cliente pc 
                INNER JOIN FacturaVenta fv2 ON fv2.id = pc.id_factura_venta
                WHERE DATE(fv2.fecha) BETWEEN :desde AND :hasta
                AND fv2.id_tipo_factura != 2  /* 🔥 EXCLUIR FACTURAS TIPO 2 */
            ), 0) AS total_pagado,
            COALESCE((
                SELECT COUNT(DISTINCT id_cliente) 
                FROM FacturaVenta 
                WHERE DATE(fecha) BETWEEN :desde AND :hasta
                AND id_tipo_factura != 2  /* 🔥 EXCLUIR FACTURAS TIPO 2 */
            ), 0) AS clientes_atendidos
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

    // 🔹 Convertir strings JSON a arrays
    foreach ($ventas as &$row) {
        $row['cliente'] = json_decode($row['cliente'], true) ?? [];
        $row['tipo_factura'] = json_decode($row['tipo_factura'], true) ?? [];
        $row['detalles'] = json_decode($row['detalles'], true) ?? [];
        $row['pagos'] = json_decode($row['pagos'], true) ?? [];
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
        "message" => "Error en la base de datos",
        "error" => $e->getMessage()
    ]);
}
?>