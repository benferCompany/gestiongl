<?php
/*
Crear stock:
id_producto (obligatorio),
id_producto_proveedor (texto, obligatorio),
stock (obligatorio),
stock_min (obligatorio),
stock_max (obligatorio)
*/
header("Content-Type: application/json; charset=UTF-8");
include "../../../conexion.php";

$data = json_decode(file_get_contents("php://input"), true);
if (!$data) $data = $_POST;

$required = ['id_producto','id_producto_proveedor','stock','stock_min','stock_max'];
foreach ($required as $field) {
    if (!isset($data[$field])) {
        http_response_code(400);
        echo json_encode([
            "status" => "error",
            "message" => "Falta el campo obligatorio: $field"
        ]);
        exit;
    }
}

try {
    $sql = "INSERT INTO stock (id_producto, id_producto_proveedor, stock, stock_min, stock_max) 
            VALUES (:id_producto, :id_producto_proveedor, :stock, :stock_min, :stock_max)";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([
        ":id_producto"            => $data['id_producto'],
        ":id_producto_proveedor"  => $data['id_producto_proveedor'], // VARCHAR
        ":stock"                  => $data['stock'],
        ":stock_min"              => $data['stock_min'],
        ":stock_max"              => $data['stock_max']
    ]);

    echo json_encode([
        "status" => "success",
        "message" => "Stock creado correctamente",
        "id" => $pdo->lastInsertId()
    ]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        "status"  => "error",
        "message" => "No se pudo crear el stock",
        "error"   => $e->getMessage()
    ]);
}
