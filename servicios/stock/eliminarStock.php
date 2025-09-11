<?php
/*
Eliminar stock:
id (obligatorio)
*/
header("Content-Type: application/json; charset=UTF-8");
include "../../conexion.php";

$data = json_decode(file_get_contents("php://input"), true);
if (!$data) $data = $_POST;

if (!isset($data['id'])) {
    http_response_code(400);
    echo json_encode([
        "status" => "error",
        "message" => "Falta el campo obligatorio: id"
    ]);
    exit;
}

try {
    $sql = "DELETE FROM stock WHERE id = :id";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([":id" => $data['id']]);

    if ($stmt->rowCount() > 0) {
        echo json_encode([
            "status" => "success",
            "message" => "Stock eliminado correctamente"
        ]);
    } else {
        echo json_encode([
            "status" => "warning",
            "message" => "No se encontró el stock con ese ID"
        ]);
    }
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        "status"  => "error",
        "message" => "No se pudo eliminar el stock",
        "error"   => $e->getMessage()
    ]);
}
