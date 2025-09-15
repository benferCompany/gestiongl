<?php
/*
Editar stock:
id (obligatorio),
producto_id (opcional),
id_producto_proveedor (opcional, VARCHAR),
stock (opcional),
stock_min (opcional),
stock_max (opcional)
*/
header("Content-Type: application/json; charset=UTF-8");
include "../../../conexion.php";

$data = json_decode(file_get_contents("php://input"), true);
if (!$data) $data = $_POST;

if (!isset($data['id'])) {
    http_response_code(400);
    echo json_encode([
        "status" => "error",
        "message" => "Falta el campo obligatorio: id"
    ]);
    exit;
}

try {
    $fields = [];
    $params = [":id" => $data['id']];

    if (isset($data['producto_id'])) {
        $fields[] = "producto_id = :producto_id";
        $params[":producto_id"] = $data['producto_id'];
    }
    if (isset($data['id_producto_proveedor'])) {
        $fields[] = "id_producto_proveedor = :id_producto_proveedor";
        $params[":id_producto_proveedor"] = $data['id_producto_proveedor']; // VARCHAR
    }
    if (isset($data['stock'])) {
        $fields[] = "stock = :stock";
        $params[":stock"] = $data['stock'];
    }
    if (isset($data['stock_min'])) {
        $fields[] = "stock_min = :stock_min";
        $params[":stock_min"] = $data['stock_min'];
    }
    if (isset($data['stock_max'])) {
        $fields[] = "stock_max = :stock_max";
        $params[":stock_max"] = $data['stock_max'];
    }

    if (empty($fields)) {
        http_response_code(400);
        echo json_encode([
            "status" => "error",
            "message" => "No se enviaron campos para actualizar"
        ]);
        exit;
    }

    $sql = "UPDATE Stock SET " . implode(", ", $fields) . " WHERE id = :id";
    $stmt = $pdo->prepare($sql);
    $stmt->execute($params);

    if ($stmt->rowCount() > 0) {
        echo json_encode([
            "status" => "success",
            "message" => "Stock actualizado correctamente",
            "data" => $data
        ]);
    } else {
        echo json_encode([
            "status" => "warning",
            "message" => "No se actualizó ningún stock (¿ID inexistente o valores iguales?)"
        ]);
    }
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        "status"  => "error",
        "message" => "No se pudo actualizar el stock",
        "error"   => $e->getMessage()
    ]);
}
