<?php
header("Content-Type: application/json; charset=UTF-8");

// Incluir conexión
include "../../../conexion.php";  // ajustá la ruta según tu proyecto

// Recibir búsqueda
$data = json_decode(file_get_contents("php://input"), true);
if (!$data) {
    $data = $_POST; // fallback si no es JSON
}

$busqueda = $data['search'] ?? '';

if (trim($busqueda) === '') {
    http_response_code(400);
    echo json_encode([
        "status" => "error",
        "message" => "Debe ingresar un término de búsqueda"
    ]);
    exit;
}

try {
    // Normalizar búsqueda
    $palabras = preg_split('/\s+/', strtolower($busqueda));

    // Construir condiciones dinámicamente (todas las palabras deben estar en algún campo)
    $condiciones = [];
    $parametros = [];

    foreach ($palabras as $i => $palabra) {
        $condiciones[] = "(LOWER(CONCAT_WS(' ', id, id_producto, id_producto_proveedor, stock, stock_min, stock_max)) LIKE :p$i)";
        $parametros[":p$i"] = "%" . $palabra . "%";
    }

    $sql = "
        SELECT id, id_producto, id_producto_proveedor, stock, stock_min, stock_max
        FROM Stock
        WHERE " . implode(" AND ", $condiciones) . "
        LIMIT 10
    ";

    $stmt = $pdo->prepare($sql);
    $stmt->execute($parametros);
    $resultados = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode([
        "status" => "success",
        "data" => $resultados
    ]);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        "status" => "error",
        "message" => "Error en la búsqueda",
        "error" => $e->getMessage()
    ]);
}
