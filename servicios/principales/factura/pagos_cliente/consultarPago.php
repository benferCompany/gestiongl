<?php
header("Content-Type: application/json; charset=UTF-8");
include "../../../conexion.php";

try {
    $sql = "
        SELECT 
            pp.id AS pago_id,
            pp.id_factura_venta,
            pp.fecha,
            pp.monto,
            fc.total AS factura_total,
            fc.descuento AS factura_descuento,
            clien.nombre AS cliente_nombre,
            clien.apellido AS cliente_apellido
        FROM Pagos_Cliente pp
        INNER JOIN FacturaVenta fc 
            ON pp.id_factura_venta = fc.id
        INNER JOIN Cliente clien 
            ON fc.id_cliente = clien.id
        ORDER BY pp.fecha DESC
    ";

    $stmt = $pdo->prepare($sql);
    $stmt->execute();
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
