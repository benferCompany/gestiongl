<?php
header("Content-Type: application/json; charset=UTF-8");
include "../../../conexion.php";

try {
    $sql = "
        SELECT 
            pp.id AS pago_id,
            pp.id_factura_compra,
            pp.fecha,
            pp.tipo_pago,
            pp.monto,
            fc.total AS factura_total,
            fc.descuento AS factura_descuento,
            prov.razon_social
        FROM Pagos_Proveedor pp
        INNER JOIN FacturaCompra fc ON pp.id_factura_compra = fc.id
        INNER JOIN Proveedor prov ON fc.id_proveedor = prov.id
        ORDER BY pp.fecha DESC
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
        "message" => "No se pudieron obtener los pagos",
        "error" => $e->getMessage()
    ]);
}
