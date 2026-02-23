<?php
include "../../../conexion.php";

$data = json_decode(file_get_contents("php://input"), true);

$sql = "DELETE FROM Imagen_Producto WHERE id = :id";
$stmt = $pdo->prepare($sql);
$stmt->execute([":id" => $data["id"]]);

echo json_encode(["status" => "success"]);
