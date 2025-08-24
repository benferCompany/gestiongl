<?php
// Encabezado JSON
header("Content-Type: application/json; charset=UTF-8");

// Incluir la conexión
include "../../conexion.php";

try {
    // Consulta SQL con LIMIT
    $sql = "SELECT * FROM producto LIMIT 10";

    // Preparar y ejecutar
    $stmt = $pdo->prepare($sql);
    $stmt->execute();

    // Obtener resultados
    $productos = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Retornar como JSON
    echo json_encode([
        "status" => "success",
        "count" => count($productos),
        "data" => $productos
    ], JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);

} catch (PDOException $e) {
    echo json_encode([
        "status" => "error",
        "message" => $e->getMessage()
    ]);
}
