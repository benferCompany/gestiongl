<?php
header("Content-Type: application/json; charset=UTF-8");
include "../../../conexion.php";

try {
    // 🔹 Evita cortes en JSON largos
    $pdo->exec("SET SESSION group_concat_max_len = 1000000");

    $sql = "
        SELECT 
            fv.id AS factura_id,
            fv.id_cliente,
            fv.id_tipo_factura,

            -- Cliente 
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

            fv.descuento AS factura_descuento,
            fv.total AS factura_total,
            fv.fecha AS factura_fecha,

            -- Detalles de factura
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
                                'descuento', dv.descuento
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
                                'id', pc.id,
                                'fecha', pc.fecha,
                                'tipo_pago', JSON_OBJECT(
                                    'id', tp.id,
                                    'nombre', tp.descripcion
                                ),
                                'monto', pc.monto
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
        ORDER BY fv.id DESC
    ";

    $stmt = $pdo->query($sql);
    $data = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // 🔹 Convertir strings JSON a arrays reales
    foreach ($data as &$row) {
        $row['cliente'] = json_decode($row['cliente'], true) ?? [];
        $row['tipo_factura'] = json_decode($row['tipo_factura'], true) ?? [];
        $row['detalles'] = json_decode($row['detalles'], true) ?? [];
        $row['pagos'] = json_decode($row['pagos'], true) ?? [];
    }

    echo json_encode([
        "status" => "success",
        "data"   => $data
    ], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        "status"  => "error",
        "message" => "No se pudo obtener las facturas de venta",
        "error"   => $e->getMessage()
    ]);
}
?>
