<?php
header("Content-Type: application/json; charset=UTF-8");
include "../../../conexion.php";

$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data["id"])) {
    http_response_code(400);
    echo json_encode([
        "status" => "error",
        "message" => "El ID es obligatorio"
    ]);
    exit;
}

try {
    $sql = "DELETE FROM Tipo_Pago WHERE id = :id";
    $stmt = $pdo->prepare($sql);
    $stmt->bindParam(":id", $data["id"], PDO::PARAM_INT);
    $stmt->execute();

    echo json_encode([
        "status" => "success",
        "message" => "Tipo de pago eliminado correctamente"
    ]);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        "status" => "error",
        "message" => "No se pudo eliminar el tipo de pago",
        "error" => $e->getMessage()
    ]);
}
