<?php
/*
Listar stock con nombre de producto
*/
header("Content-Type: application/json; charset=UTF-8");
include "../conexion.php";

try {
    $sql = "SELECT 
    s.id,
    JSON_OBJECT(
        'id_producto', p.id_producto,
        'descripcion', p.descripcion,
        'costo', p.costo,
        'pvp', p.pvp
    ) AS producto,
    s.id_producto_proveedor,
    s.stock,
    s.stock_min,
    s.stock_max
    FROM stock s
    INNER JOIN producto p ON s.id_producto = p.id
    ORDER BY s.id DESC;";
    $stmt = $pdo->query($sql);
    $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
    foreach ($data as &$row) {
        $row['producto'] = json_decode($row['producto'], true);
    }
    echo json_encode([
        "status" => "success",
        "data"   => $data
    ]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        "status"  => "error",
        "message" => "No se pudo obtener el stock",
        "error"   => $e->getMessage()
    ]);
}
