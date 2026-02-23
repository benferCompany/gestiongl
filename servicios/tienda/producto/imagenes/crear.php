<?php
include "../../../conexion.php";

$data = json_decode(file_get_contents("php://input"), true);

$sql = "INSERT INTO Imagen (nombre, objeto, orden)
        VALUES (:nombre, :objeto, :orden)";

$stmt = $pdo->prepare($sql);
$stmt->execute([
    ":nombre" => $data["nombre"],
    ":objeto" => $data["objeto"],
    ":orden"  => $data["orden"] ?? 0
]);

echo json_encode(["status" => "success"]);
