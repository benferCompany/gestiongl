<?php
header("Content-Type: application/json; charset=UTF-8");

// Incluir conexión
include "../../conexion.php";  // ajustá la ruta según dónde esté tu archivo

// Recibir datos enviados por POST (JSON o form-data)
$data = json_decode(file_get_contents("php://input"), true);
if (!$data) {
    $data = $_POST; // fallback si no es JSON
}

// Validación de campo requerido (id o cuit)
if (!isset($data['id'])) {
    http_response_code(400);
    echo json_encode([
        "status" => "error",
        "message" => "Falta el campo obligatorio: id"
    ]);
    exit;
}

try {
    $stmt = $pdo->prepare("DELETE FROM Proveedor WHERE id = :id");

    $stmt->execute([
        ":id" => $data['id']
    ]);

    if ($stmt->rowCount() > 0) {
        echo json_encode([
            "status"  => "success",
            "message" => "Proveedor eliminado correctamente",
            "id"      => $data['id']
        ]);
    } else {
        echo json_encode([
            "status"  => "error",
            "message" => "No se encontró un proveedor con ese id"
        ]);
    }

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        "status"  => "error",
        "message" => "No se pudo eliminar el proveedor",
        "error"   => $e->getMessage()
    ]);
}
