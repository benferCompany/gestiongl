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
if (!isset($data['id'], $data['razon_social'], $data['cuit'])) {
    http_response_code(400);
    echo json_encode([
        "status" => "error",
        "message" => "Faltan campos obligatorios: id, razon_social y cuit"
    ]);
    exit;
}

try {
    $stmt = $pdo->prepare("
        UPDATE Proveedor 
        SET razon_social   = :razon_social, 
            cuit           = :cuit, 
            nombre_contacto = :nombre_contacto, 
            direccion      = :direccion, 
            telefono       = :telefono
        WHERE id = :id
    ");

    $stmt->execute([
        ":id"             => $data['id'],
        ":razon_social"   => $data['razon_social'],
        ":cuit"           => $data['cuit'],
        ":nombre_contacto"=> $data['nombre_contacto'] ?? null,
        ":direccion"      => $data['direccion'] ?? null,
        ":telefono"       => $data['telefono'] ?? null
    ]);

    if ($stmt->rowCount() > 0) {
        echo json_encode([
            "status"   => "success",
            "message"  => "Proveedor actualizado correctamente",
            "proveedor" => [
                "id"              => $data['id'],
                "razon_social"    => $data['razon_social'],
                "cuit"            => $data['cuit'],
                "nombre_contacto" => $data['nombre_contacto'] ?? null,
                "direccion"       => $data['direccion'] ?? null,
                "telefono"        => $data['telefono'] ?? null
            ]
        ]);
    } else {
        echo json_encode([
            "status"  => "warning",
            "message" => "No se realizaron cambios o el proveedor no existe"
        ]);
    }
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        "status"  => "error",
        "message" => "No se pudo actualizar el proveedor",
        "error"   => $e->getMessage()
    ]);
}
