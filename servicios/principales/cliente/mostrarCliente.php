<?php
// Encabezado JSON
header("Content-Type: application/json; charset=UTF-8");

// Incluir la conexión
include "../../conexion.php";

try {
    // Consulta SQL con LIMIT
    $sql = "SELECT id, nombre, apellido, direccion, cuit, telefono 
            FROM Cliente 
            LIMIT 10";

    // Preparar y ejecutar
    $stmt = $pdo->prepare($sql);
    $stmt->execute();

    // Obtener resultados
    $clientes = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Retornar como JSON
    echo json_encode([
        "status" => "success",
        "count" => count($clientes),
        "data" => $clientes
    ], JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);

} catch (PDOException $e) {
    echo json_encode([
        "status" => "error",
        "message" => $e->getMessage()
    ]);
}
