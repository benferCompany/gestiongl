<?php
header("Content-Type: application/json; charset=UTF-8");
include "../../../conexion.php";

$data = json_decode(file_get_contents("php://input"), true);

try {
    $stmt = $pdo->prepare("INSERT INTO Pagos_Proveedor (id_factura_compra, fecha, tipo_pago, monto) VALUES (?, ?, ?, ?)");
    $stmt->execute([
        $data['id_factura_compra'],
        $data['fecha'],
        $data['tipo_pago'],
        $data['monto']
    ]);

    $pagoId = $pdo->lastInsertId();

    echo json_encode([
        "status" => "success",
        "id_pago" => $pagoId
    ]);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        "status" => "error",
        "message" => "No se pudo crear el pago",
        "error" => $e->getMessage()
    ]);
}
