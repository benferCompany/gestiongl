<?php
header("Content-Type: application/json; charset=UTF-8");

// Incluir conexión
include "../../conexion.php";  // ajustá la ruta según dónde esté tu archivo

// Recibir datos enviados por POST (JSON o form-data)
$data = json_decode(file_get_contents("php://input"), true);
if (!$data) {
    $data = $_POST; // fallback si no es JSON
}

// Validación de campos requeridos
if (!isset($data['nombre'], $data['apellido'], $data['cuit'])) {
    http_response_code(400);
    echo json_encode([
        "status" => "error",
        "message" => "Faltan campos obligatorios: nombre, apellido y cuit"
    ]);
    exit;
}

try {
    $stmt = $pdo->prepare("
        INSERT INTO Cliente (nombre, apellido, direccion, cuit, telefono) 
        VALUES (:nombre, :apellido, :direccion, :cuit, :telefono)
    ");

    $stmt->execute([
        ":nombre"    => $data['nombre'],
        ":apellido"  => $data['apellido'],
        ":direccion" => $data['direccion'] ?? null,
        ":cuit"      => $data['cuit'],
        ":telefono"  => $data['telefono'] ?? null
    ]);

    $cliente_id = $pdo->lastInsertId();

    http_response_code(201);
    echo json_encode([
        "status"  => "success",
        "message" => "Cliente creado correctamente",
        "data" => [
            "id"        => $cliente_id,
            "nombre"    => $data['nombre'],
            "apellido"  => $data['apellido'],
            "direccion" => $data['direccion'] ?? null,
            "cuit"      => $data['cuit'],
            "telefono"  => $data['telefono'] ?? null
        ]
    ]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        "status"  => "error",
        "message" => "No se pudo crear el cliente",
        "error"   => $e->getMessage()
    ]);
}
