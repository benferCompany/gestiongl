<?php
// Configuración de conexión
/*
$host = "mysql-gestionbl-benjidfer-2116.g.aivencloud.com"; // si esta del local es localhost//
$port = 26932; // si estas de local es 3306
$dbname = "defaultdb";
$username = "lauty";
$password = "root";
*/

$host = "localhost";
$port = 3306; 
$dbname = "gestionbl";
$username = "root";
$password = "" ;



try {
    // Crear conexión con PDO
    $pdo = new PDO("mysql:host=$host;port=$port;dbname=$dbname;charset=utf8", $username, $password);


    // Configurar para que PDO lance excepciones si hay errores
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

} catch (PDOException $e) {
    // Si hay error en la conexión, salir y devolver JSON
    header("Content-Type: application/json; charset=UTF-8");
    echo json_encode([
        "status" => "error",
        "message" => "Error de conexión: " . $e->getMessage()
    ]);
    exit;
}
