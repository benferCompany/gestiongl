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
if (!isset($data['razon_social'], $data['cuit'])) {
    http_response_code(400);
    echo json_encode([
        "status" => "error",
        "message" => "Faltan campos obligatorios: razon_social y cuit"
    ]);
    exit;
}

try {
    $stmt = $pdo->prepare("
        INSERT INTO Proveedor (razon_social, cuit, nombre_contacto, direccion, telefono)
        VALUES (:razon_social, :cuit, :nombre_contacto, :direccion, :telefono)
    ");

    $stmt->execute([
        ":razon_social"    => $data['razon_social'],
        ":cuit"            => $data['cuit'],
        ":nombre_contacto" => $data['nombre_contacto'] ?? null,
        ":direccion"       => $data['direccion'] ?? null,
        ":telefono"        => $data['telefono'] ?? null
    ]);

    // Obtener el ID autogenerado
    $newId = $pdo->lastInsertId();

    echo json_encode([
        "status"   => "success",
        "message"  => "Proveedor creado correctamente",
        "data" => [
            "id"              => $newId,
            "razon_social"    => $data['razon_social'],
            "cuit"            => $data['cuit'],
            "nombre_contacto" => $data['nombre_contacto'] ?? null,
            "direccion"       => $data['direccion'] ?? null,
            "telefono"        => $data['telefono'] ?? null
        ]
    ]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        "status"  => "error",
        "message" => "No se pudo crear el proveedor",
        "error"   => $e->getMessage()
    ]);
}
