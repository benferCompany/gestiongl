<?php
header("Content-Type: application/json; charset=UTF-8");
include "../../../conexion.php";

try {
    $sql = "
        SELECT 
            fc.id AS factura_id,
            fc.id_proveedor,
            prov.razon_social,
            fc.descuento AS factura_descuento,
            fc.total AS factura_total,
            fc.fecha AS factura_fecha,
            
            -- Subconsulta para detalles
            (SELECT JSON_ARRAYAGG(
                        JSON_OBJECT(
                            'id', dc.id,
                            'id_producto', dc.id_producto,
                            'descripcion', dc.descripcion,
                            'costo', dc.costo,
                            'cantidad', dc.cantidad,
                            'descuento', dc.descuento
                        )
                   )
             FROM DetalleCompra dc
             WHERE dc.id_factura_compra = fc.id
            ) AS detalles,

            -- Subconsulta para pagos
            (SELECT JSON_ARRAYAGG(
                        JSON_OBJECT(
                            'id', pp.id,
                            'fecha', pp.fecha,
                            'tipo_pago', pp.tipo_pago,
                            'monto', pp.monto
                        )
                   )
             FROM Pagos_Proveedor pp
             WHERE pp.id_factura_compra = fc.id
            ) AS pagos

        FROM FacturaCompra fc
        INNER JOIN Proveedor prov ON fc.id_proveedor = prov.id
        ORDER BY fc.id DESC
    ";

    $stmt = $pdo->query($sql);
    $data = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // 🔹 Decodificar los campos JSON (detalles y pagos)
    foreach ($data as &$row) {
        $row['detalles'] = $row['detalles'] ? json_decode($row['detalles'], true) : [];
        $row['pagos'] = $row['pagos'] ? json_decode($row['pagos'], true) : [];
    }

    echo json_encode([
        "status" => "success",
        "data" => $data
    ], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        "status" => "error",
        "message" => "No se pudo obtener las facturas de compra",
        "error" => $e->getMessage()
    ]);
}
