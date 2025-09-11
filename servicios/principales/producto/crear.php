<?php


/*
id_producto, descripcion, costo, pvp
*/
header("Content-Type: application/json; charset=UTF-8");

// Incluir conexión
include "../../conexion.php";  // ajustá la ruta según dónde esté tu archivo

// Recibir datos enviados por POST (JSON o form-data)
$data = json_decode(file_get_contents("php://input"), true);
if (!$data) {
    $data = $_POST; // fallback si no es JSON
}

// Validación de campos requeridos
if (!isset($data['id_producto'], $data['costo'])) {
    http_response_code(400);
    echo json_encode([
        "status" => "error",
        "message" => "Faltan campos obligatorios: id_producto y costo"
    ]);
    exit;
}

try {
    $stmt = $pdo->prepare("
        INSERT INTO Producto (id_producto, descripcion, costo, pvp) 
        VALUES (:id_producto, :descripcion, :costo, :pvp)
    ");

    $stmt->execute([
        ":id_producto" => $data['id_producto'],
        ":descripcion" => $data['descripcion'] ?? null,
        ":costo"       => $data['costo'],
        ":pvp"         => $data['pvp'] ?? 0
    ]);

    $producto_id = $pdo->lastInsertId();

    http_response_code(201);
    echo json_encode([
        "status"  => "success",
        "message" => "Producto creado correctamente",
        "data" => [
            "id"          => $producto_id,
            "id_producto" => $data['id_producto'],
            "descripcion" => $data['descripcion'] ?? null,
            "costo"       => $data['costo'],
            "pvp"         => $data['pvp'] ?? 0
        ]
    ]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        "status"  => "error",
        "message" => "No se pudo crear el producto",
        "error"   => $e->getMessage()
    ]);
}
