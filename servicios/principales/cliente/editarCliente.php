<?php
header("Content-Type: application/json; charset=UTF-8");

// Incluir conexión
include "../../conexion.php";  // ajustá la ruta según dónde esté tu archivo

// Recibir datos enviados por POST/PUT (JSON o form-data)
$data = json_decode(file_get_contents("php://input"), true);
if (!$data) {
    $data = $_POST; // fallback si no es JSON
}

// Validación de campos requeridos
if (!isset($data['id'], $data['nombre'], $data['apellido'], $data['cuit'])) {
    http_response_code(400);
    echo json_encode([
        "status" => "error",
        "message" => "Faltan campos obligatorios: id, nombre, apellido y cuit"
    ]);
    exit;
}

try {
    $stmt = $pdo->prepare("
        UPDATE Cliente 
        SET nombre = :nombre, 
            apellido = :apellido, 
            direccion = :direccion, 
            cuit = :cuit, 
            telefono = :telefono
        WHERE id = :id
    ");

    $stmt->execute([
        ":id"        => $data['id'],
        ":nombre"    => $data['nombre'],
        ":apellido"  => $data['apellido'],
        ":direccion" => $data['direccion'] ?? null,
        ":cuit"      => $data['cuit'],
        ":telefono"  => $data['telefono'] ?? null
    ]);

    if ($stmt->rowCount() > 0) {
        echo json_encode([
            "status"  => "success",
            "message" => "Cliente actualizado correctamente",
            "cliente" => [
                "id"        => $data['id'],
                "nombre"    => $data['nombre'],
                "apellido"  => $data['apellido'],
                "direccion" => $data['direccion'] ?? null,
                "cuit"      => $data['cuit'],
                "telefono"  => $data['telefono'] ?? null
            ]
        ]);
    } else {
        echo json_encode([
            "status"  => "warning",
            "message" => "No se realizaron cambios o el cliente no existe"
        ]);
    }
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        "status"  => "error",
        "message" => "No se pudo actualizar el cliente",
        "error"   => $e->getMessage()
    ]);
}
