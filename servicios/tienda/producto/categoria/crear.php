<?php
include "../../../conexion.php";

$data = json_decode(file_get_contents("php://input"), true);

$sql = "INSERT INTO Categoria (nombre, id_categoria_padre)
        VALUES (:nombre, :padre)";

$stmt = $pdo->prepare($sql);
$stmt->execute([
    ":nombre" => $data["nombre"],
    ":padre"  => $data["id_categoria_padre"] ?? null
]);

echo json_encode(["status" => "success"]);
