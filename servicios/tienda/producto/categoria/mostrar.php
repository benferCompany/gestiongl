<?php
include "../../../conexion.php";

$sql = "SELECT id, nombre, id_categoria_padre FROM Categoria ORDER BY nombre";
$stmt = $pdo->query($sql);

echo json_encode([
    "status" => "success",
    "data" => $stmt->fetchAll(PDO::FETCH_ASSOC)
]);
