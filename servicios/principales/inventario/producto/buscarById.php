<?php
// Encabezado JSON
header("Content-Type: application/json; charset=UTF-8");

// Incluir la conexión
include "../../../conexion.php";
$data = json_decode(file_get_contents("php://input"), true);
if (!$data) {
    $data = $_POST; // fallback si no es JSON
}

$id = $data['id'] ?? '';

if (trim($id) === '') {
    http_response_code(400);
    echo json_encode([
        "status" => "error",
        "message" => "Debe ingresar un id"
    ]);
    exit;
}

try {
    // Consulta SQL con LIMIT
    $sql = "SELECT * FROM Producto WHERE id = ".$id." LIMIT 1";

    // Preparar y ejecutar
    $stmt = $pdo->prepare($sql);
    $stmt->execute();

    // Obtener resultados
    $productos = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Retornar como JSON
    echo json_encode([
        "status" => "success",
        "data" => $productos
    ], JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);

} catch (PDOException $e) {
    echo json_encode([
        "status" => "error",
        "message" => $e->getMessage()
    ]);
}
