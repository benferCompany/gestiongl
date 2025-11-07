<?php
$data = json_decode(file_get_contents("php://input"), true);

try {
    $stmt = $pdo->prepare("DELETE FROM Pagos_Proveedor WHERE id=?");
    $stmt->execute([$data['id']]);

    echo json_encode(["status" => "success"]);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        "status" => "error",
        "message" => "No se pudo eliminar el pago",
        "error" => $e->getMessage()
    ]);
}
