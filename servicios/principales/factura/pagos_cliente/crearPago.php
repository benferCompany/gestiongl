<?php
header("Content-Type: application/json; charset=UTF-8");
include "../../../conexion.php";

$data = json_decode(file_get_contents("php://input"), true);

if (
    !isset($data['id_factura_venta']) ||
    !isset($data['fecha']) ||
    !isset($data['id_tipo_pago']) ||
    !isset($data['monto'])
) {
    http_response_code(400);
    echo json_encode([
        "status" => "error",
        "message" => "Datos incompletos"
    ]);
    exit;
}

try {
    $stmt = $pdo->prepare("
        INSERT INTO Pagos_Cliente 
        (id_factura_venta, fecha, id_tipo_pago, monto) 
        VALUES (?, ?, ?, ?)
    ");

    $stmt->execute([
        $data['id_factura_venta'],
        $data['fecha'],
        $data['id_tipo_pago'],
        $data['monto']
    ]);

    echo json_encode([
        "status" => "success",
        "id_pago" => $pdo->lastInsertId()
    ]);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        "status" => "error",
        "message" => "No se pudo crear el pago",
        "error" => $e->getMessage()
    ]);
}
