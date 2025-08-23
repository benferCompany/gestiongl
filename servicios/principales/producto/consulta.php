<?php
// Configuración de conexión
$host = "localhost";
$dbname = "gestionbl";
$username = "root";
$password = "";

// Encabezado para que el navegador sepa que es JSON
header("Content-Type: application/json; charset=UTF-8");

try {
    // Crear conexión con PDO
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password);

    // Configurar para que PDO lance excepciones si hay errores
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Consulta SQL con LIMIT
    $sql = "SELECT * FROM producto LIMIT 10";

    // Preparar y ejecutar
    $stmt = $pdo->prepare($sql);
    $stmt->execute();

    // Obtener resultados como array asociativo
    $productos = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Retornar como JSON
    echo json_encode([
        "status" => "success",
        "count" => count($productos),
        "data" => $productos
    ], JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);

} catch (PDOException $e) {
    // Respuesta de error en JSON
    echo json_encode([
        "status" => "error",
        "message" => $e->getMessage()
    ]);
}
