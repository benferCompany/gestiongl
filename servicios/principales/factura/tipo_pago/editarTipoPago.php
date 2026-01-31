<?php
header("Content-Type: application/json; charset=UTF-8");
include "../../../conexion.php";

$data = json_decode(file_get_contents("php://input"), true);

if (
    !isset($data["id"]) ||
    !isset($data["descripcion"]) ||
    empty(trim($data["descripcion"]))
) {
    http_response_code(400);
    echo json_encode([
        "status" => "error",
        "message" => "ID y descripción son obligatorios"
    ]);
    exit;
}

try {
    $sql = "
        UPDATE Tipo_Pago 
        SET descripcion = :descripcion
        WHERE id = :id
    ";

    $stmt = $pdo->prepare($sql);
    $stmt->bindParam(":descripcion", $data["descripcion"]);
    $stmt->bindParam(":id", $data["id"], PDO::PARAM_INT);
    $stmt->execute();

    echo json_encode([
        "status" => "success",
        "message" => "Tipo de pago actualizado correctamente"
    ]);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        "status" => "error",
        "message" => "No se pudo actualizar el tipo de pago",
        "error" => $e->getMessage()
    ]);
}
