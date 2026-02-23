<?php
include "../../../conexion.php";

$data = json_decode(file_get_contents("php://input"), true);

$sql = "UPDATE Categoria
        SET nombre = :nombre,
            id_categoria_padre = :padre
        WHERE id = :id";

$stmt = $pdo->prepare($sql);
$stmt->execute([
    ":id"     => $data["id"],
    ":nombre" => $data["nombre"],
    ":padre"  => $data["id_categoria_padre"] ?? null
]);

echo json_encode(["status" => "success"]);
