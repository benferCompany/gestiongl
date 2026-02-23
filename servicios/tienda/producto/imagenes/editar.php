<?php
include "../../../conexion.php";

$data = json_decode(file_get_contents("php://input"), true);

$sql = "UPDATE Imagen_Producto
        SET url = :url,
            orden = :orden
        WHERE id = :id";

$stmt = $pdo->prepare($sql);
$stmt->execute([
    ":id"    => $data["id"],
    ":url"   => $data["url"],
    ":orden" => $data["orden"]
]);

echo json_encode(["status" => "success"]);
