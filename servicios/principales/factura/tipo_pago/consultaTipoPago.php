<?php
header("Content-Type: application/json; charset=UTF-8");
include "../../../conexion.php";

try {
    $sql = "
        SELECT 
            tp.id,
            tp.descripcion
        FROM Tipo_Pago tp
        ORDER BY tp.descripcion ASC
    ";

    $stmt = $pdo->prepare($sql);
    $stmt->execute();
    $data = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode([
        "status" => "success",
        "data" => $data
    ]);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        "status" => "error",
        "message" => "No se pudieron obtener los tipos de pago",
        "error" => $e->getMessage()
    ]);
}
