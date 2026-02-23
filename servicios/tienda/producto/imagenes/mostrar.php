<?php
include "../../../conexion.php";

$id_producto = $_GET["id_producto"];

$sql = "SELECT i.id, i.nombre, i.objeto, i.orden
        FROM Imagen i
        INNER JOIN Producto_Imagen pi 
            ON i.id = pi.id_imagen
        WHERE pi.id_producto = :id_producto
        ORDER BY i.orden";

$stmt = $pdo->prepare($sql);
$stmt->execute([":id_producto" => $id_producto]);

echo json_encode([
    "status" => "success",
    "data" => $stmt->fetchAll(PDO::FETCH_ASSOC)
]);
