<?php
/*
Eliminar producto:
id_producto (obligatorio)
*/
header("Content-Type: application/json; charset=UTF-8");

// Incluir conexión
include "../../../conexion.php";

// Recibir datos enviados por POST (JSON o form-data)
$data = json_decode(file_get_contents("php://input"), true);
if (!$data) {
    $data = $_POST; // fallback si no es JSON
}

// Validación de campo requerido
if (!isset($data['id_producto'])) {
    http_response_code(400);
    echo json_encode([
        "status" => "error",
        "message" => "Falta el campo obligatorio: id_producto"
    ]);
    exit;
}

try {
    $stmt = $pdo->prepare("DELETE FROM Producto WHERE id_producto = :id_producto");
    $stmt->execute([":id_producto" => $data['id_producto']]);

    if ($stmt->rowCount() > 0) {
        echo json_encode([
            "status" => "success",
            "message" => "Producto eliminado correctamente",
            "id_producto" => $data['id_producto']
        ]);
    } else {
        echo json_encode([
            "status" => "warning",
            "message" => "No se encontró el producto con el id especificado"
        ]);
    }
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        "status"  => "error",
        "message" => "No se pudo eliminar el producto",
        "error"   => $e->getMessage()
    ]);
}
