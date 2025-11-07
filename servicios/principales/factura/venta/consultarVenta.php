<?php
header("Content-Type: application/json; charset=UTF-8");
include "../../../conexion.php";

try {
    $sql = "
        SELECT 
            fv.id AS factura_id,
            fv.id_cliente,
            cli.nombre,
            cli.apellido,
            fv.descuento AS factura_descuento,
            fv.total AS factura_total,
            fv.fecha AS factura_fecha,

            -- Detalles en subconsulta
            (SELECT JSON_ARRAYAGG(
                        JSON_OBJECT(
                            'id', dv.id,
                            'id_producto', dv.id_producto,
                            'descripcion', dv.descripcion,
                            'cantidad', dv.cantidad,
                            'pvp', dv.pvp,
                            'descuento', dv.descuento
                        )
                   )
             FROM DetalleVenta dv
             WHERE dv.id_factura_venta = fv.id
            ) AS detalles

        FROM FacturaVenta fv
        INNER JOIN Cliente cli ON fv.id_cliente = cli.id
        ORDER BY fv.id DESC
    ";

    $stmt = $pdo->query($sql);
    $data = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode([
        "status" => "success",
        "data" => $data
    ]);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        "status" => "error",
        "message" => "No se pudo obtener las facturas de venta",
        "error" => $e->getMessage()
    ]);
}
