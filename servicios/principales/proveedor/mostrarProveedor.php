<?php
header("Content-Type: application/json; charset=UTF-8");

// Incluir conexión
include "../../conexion.php";  // ajustá la ruta según dónde esté tu archivo

try {
    // Traer máximo 10 proveedores
    $stmt = $pdo->prepare("SELECT id, razon_social, cuit, nombre_contacto, direccion, telefono 
                           FROM Proveedor 
                           ORDER BY id DESC 
                           LIMIT 10");
    $stmt->execute();

    $proveedores = $stmt->fetchAll(PDO::FETCH_ASSOC);

    if ($proveedores) {
        echo json_encode([
            "status"     => "success",
            "data"=> $proveedores
        ]);
    } else {
        echo json_encode([
            "status"  => "warning",
            "message" => "No se encontraron proveedores"
        ]);
    }
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        "status"  => "error",
        "message" => "No se pudieron obtener los proveedores",
        "error"   => $e->getMessage()
    ]);
}
