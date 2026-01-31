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

$required = ['producto_id','id_producto_proveedor','proveedor_id','stock','stock_min','stock_max'];
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
    $sql = "INSERT INTO Stock (producto_id, id_producto_proveedor, proveedor_id, stock, stock_min, stock_max) 
            VALUES (:producto_id, :id_producto_proveedor, :proveedor_id, :stock, :stock_min, :stock_max)";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([
        ":producto_id"            => $data['producto_id'],
        ":id_producto_proveedor"  => $data['id_producto_proveedor'], // VARCHAR
        ":proveedor_id"           => $data['proveedor_id'],
        ":stock"                  => $data['stock'],
        ":stock_min"              => $data['stock_min'],
        ":stock_max"              => $data['stock_max']
    ]);

    echo json_encode([
        "status" => "success",
        "message" => "Stock creado correctamente",
        "data" => array_merge(
            ["id" => $pdo->lastInsertId()],
            $data)
    ]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        "status"  => "error",
        "message" => "No se pudo crear el stock",
        "error"   => $e->getMessage()
    ]);
}
