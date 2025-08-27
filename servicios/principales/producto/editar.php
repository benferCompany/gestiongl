<?php
/*
Editar producto:
id_producto (obligatorio para saber qué producto editar),
descripcion, costo, pvp
*/
header("Content-Type: application/json; charset=UTF-8");

// Incluir conexión
include "../../conexion.php";

// Recibir datos enviados por POST (JSON o form-data)
$data = json_decode(file_get_contents("php://input"), true);
if (!$data) {
    $data = $_POST; // fallback si no es JSON
}

// Validación de campos requeridos
if (!isset($data['id_producto'])) {
    http_response_code(400);
    echo json_encode([
        "status" => "error",
        "message" => "Falta el campo obligatorio: id_producto"
    ]);
    exit;
}

try {
    // Construimos el SQL dinámico según los campos enviados
    $fields = [];
    $params = [":id_producto" => $data['id_producto']];

    if (isset($data['descripcion'])) {
        $fields[] = "descripcion = :descripcion";
        $params[":descripcion"] = $data['descripcion'];
    }

    if (isset($data['costo'])) {
        $fields[] = "costo = :costo";
        $params[":costo"] = $data['costo'];
    }

    if (isset($data['pvp'])) {
        $fields[] = "pvp = :pvp";
        $params[":pvp"] = $data['pvp'];
    }

    if (empty($fields)) {
        http_response_code(400);
        echo json_encode([
            "status" => "error",
            "message" => "No se enviaron campos para actualizar"
        ]);
        exit;
    }

    $sql = "UPDATE Producto SET " . implode(", ", $fields) . " WHERE id_producto = :id_producto";
    $stmt = $pdo->prepare($sql);
    $stmt->execute($params);

    if ($stmt->rowCount() > 0) {
        echo json_encode([
            "status" => "success",
            "message" => "Producto actualizado correctamente",
            "producto" => $data
        ]);
    } else {
        echo json_encode([
            "status" => "warning",
            "message" => "No se actualizó ningún producto (¿ID inexistente o valores iguales?)"
        ]);
    }
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        "status"  => "error",
        "message" => "No se pudo actualizar el producto",
        "error"   => $e->getMessage()
    ]);
}
