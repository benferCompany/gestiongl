<?php
header("Content-Type: application/json; charset=UTF-8");

// Configuración de la base de datos
$host = "localhost";
$user = "tu_usuario";
$password = "";
$dbname = "";

$response = [];

// Conectar con MySQL usando PDO (seguro y profesional)
try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $user, $password, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
    ]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        "status" => "error",
        "message" => "Error en la conexión a la base de datos",
        "error" => $e->getMessage()
    ]);
    exit;
}

// Recibir datos enviados por POST (JSON o form-data)
$data = json_decode(file_get_contents("php://input"), true);

if (!$data) {
    $data = $_POST; // fallback si no es JSON
}

// Validación de campos requeridos
if (!isset($data['nombre'], $data['precio'])) {
    http_response_code(400);
    echo json_encode([
        "status" => "error",
        "message" => "Faltan campos obligatorios: nombre y precio"
    ]);
    exit;
}

try {
    $stmt = $pdo->prepare("INSERT INTO productos (nombre, descripcion, precio, stock) 
                           VALUES (:nombre, :descripcion, :precio, :stock)");

    $stmt->execute([
        ":nombre" => $data['nombre'],
        ":descripcion" => $data['descripcion'] ?? null,
        ":precio" => $data['precio'],
        ":stock" => $data['stock'] ?? 0
    ]);

    $producto_id = $pdo->lastInsertId();

    http_response_code(201);
    echo json_encode([
        "status" => "success",
        "message" => "Producto creado correctamente",
        "producto" => [
            "id" => $producto_id,
            "nombre" => $data['nombre'],
            "descripcion" => $data['descripcion'] ?? null,
            "precio" => $data['precio'],
            "stock" => $data['stock'] ?? 0
        ]
    ]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        "status" => "error",
        "message" => "No se pudo crear el producto",
        "error" => $e->getMessage()
    ]);
}
