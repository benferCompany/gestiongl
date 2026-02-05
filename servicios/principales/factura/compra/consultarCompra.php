<?php
header("Content-Type: application/json; charset=UTF-8");
include "../../../conexion.php";

try {

    $pdo->exec("SET SESSION group_concat_max_len = 1000000");

    $sql = "
        SELECT 
            fc.id AS factura_id,
            fc.id_proveedor,

            -- Proveedor
            JSON_OBJECT(
                'id', prov.id,
                'razon_social', prov.razon_social,
                'cuit', prov.cuit,
                'nombre_contacto', prov.nombre_contacto,
                'direccion', prov.direccion,
                'telefono', prov.telefono
            ) AS proveedor,



            -- Tipo de factura
            JSON_OBJECT(
                'id', tf.id,
                'tipo_factura', tf.tipo_factura
            ) AS tipo_factura,


            prov.razon_social,
            fc.descuento AS factura_descuento,
            fc.total AS factura_total,
            fc.fecha AS factura_fecha,
            fc.id_tipo_factura,

            -- Detalles de factura
            (
                SELECT CONCAT(
                    '[',
                    IFNULL(
                        GROUP_CONCAT(
                            JSON_OBJECT(
                                'id', dc.id,
                                'id_producto', dc.id_producto,
                                'descripcion', dc.descripcion,
                                'cantidad', dc.cantidad,
                                'pvp', dc.costo,
                                'descuento', dc.descuento
                            )
                        ),
                        ''
                    ),
                    ']'
                )
                FROM DetalleCompra dc
                WHERE dc.id_factura_compra = fc.id
            ) AS detalles,

            -- Pagos de proveedor (MISMA ESTRUCTURA QUE VENTA)
            (
                SELECT CONCAT(
                    '[',
                    IFNULL(
                        GROUP_CONCAT(
                            JSON_OBJECT(
                                'id', pp.id,
                                'fecha', pp.fecha,
                                'tipo_pago', JSON_OBJECT(
                                    'id', tp.id,
                                    'nombre', tp.descripcion
                                ),
                                'monto', pp.monto
                            )
                        ),
                        ''
                    ),
                    ']'
                )
                FROM Pagos_Proveedor pp
                INNER JOIN Tipo_Pago tp ON tp.id = pp.id_tipo_pago
                WHERE pp.id_factura_compra = fc.id
            ) AS pagos

        FROM FacturaCompra fc
        INNER JOIN Proveedor prov ON fc.id_proveedor = prov.id
        INNER JOIN Tipo_Factura tf ON fc.id_tipo_factura = tf.id
        ORDER BY fc.id DESC
    ";

    $stmt = $pdo->query($sql);
    $data = $stmt->fetchAll(PDO::FETCH_ASSOC);

    foreach ($data as &$row) {
        $row['proveedor'] = json_decode($row['proveedor'], true) ?? [];
        $row['tipo_factura'] = json_decode($row['tipo_factura'], true) ?? [];
        $row['detalles'] = json_decode($row['detalles'], true) ?? [];
        $row['pagos']    = json_decode($row['pagos'], true) ?? [];
    }

    echo json_encode([
        "status" => "success",
        "data"   => $data
    ], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        "status"  => "error",
        "message" => "No se pudo obtener las facturas de compra",
        "error"   => $e->getMessage()
    ]);
}
?>
