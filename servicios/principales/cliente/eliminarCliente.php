<?php
header("Content-Type: application/json; charset=UTF-8");

// Incluir conexión
include "../../conexion.php";  // ajustá la ruta según dónde esté tu archivo

// Recibir datos enviados (puede ser JSON o form-data)
$data = json_decode(file_get_contents("php://input"), true);
if (!$data) {
    $data = $_POST; // fallback si no es JSON
}

// Validación de campo requerido
if (!isset($data['id'])) {
    http_response_code(400);
    echo json_encode([
        "status"  => "error",
        "message" => "Falta el campo obligatorio: id"
    ]);
    exit;
}

try {
    // Verificar que el cliente exista
    $stmt = $pdo->prepare("SELECT * FROM Cliente WHERE id = :id");
    $stmt->execute([":id" => $data['id']]);
    $cliente = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$cliente) {
        http_response_code(404);
        echo json_encode([
            "status"  => "error",
            "message" => "El cliente con id {$data['id']} no existe"
        ]);
        exit;
    }

    // Eliminar cliente
    $stmt = $pdo->prepare("DELETE FROM Cliente WHERE id = :id");
    $stmt->execute([":id" => $data['id']]);

    http_response_code(200);
    echo json_encode([
        "status"  => "success",
        "message" => "Cliente eliminado correctamente",
        "cliente" => $cliente
    ]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        "status"  => "error",
        "message" => "No se pudo eliminar el cliente",
        "error"   => $e->getMessage()
    ]);
}
