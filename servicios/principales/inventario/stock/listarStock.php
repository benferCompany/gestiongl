<?php
/*
Listar stock con nombre de producto
*/
header("Content-Type: application/json; charset=UTF-8");
include "../../../conexion.php";

try {
    $sql = "SELECT 
        s.id,
        s.producto_id,
        s.proveedor_id,
        prov.razon_social,
        prod.id_producto,
        prod.descripcion,
        s.id_producto_proveedor,
        s.stock,
        s.stock_min,
        s.stock_max
        FROM stock s
        INNER JOIN producto prod   ON s.producto_id = prod.id
        INNER JOIN proveedor prov  ON s.proveedor_id = prov.id
        ORDER BY s.id DESC;";
    
    $stmt = $pdo->query($sql);
    $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    echo json_encode([
        "status" => "success",
        "data"   => $data
    ],JSON_UNESCAPED_UNICODE);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        "status"  => "error",
        "message" => "No se pudo obtener el stock",
        "error"   => $e->getMessage()
    ]);
}
