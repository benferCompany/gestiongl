<?php
header("Content-Type: application/json; charset=UTF-8");
include "../../../conexion.php";

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

    // Construir condiciones dinámicas
    $condiciones = [];
    $parametros = [];

    foreach ($palabras as $i => $palabra) {
        $condiciones[] = "(LOWER(CONCAT_WS(' ', fv.id, cli.nombre, cli.apellido, fv.total, fv.descuento, fv.fecha)) LIKE :p$i)";
        $parametros[":p$i"] = "%" . $palabra . "%";
    }

    $sql = "
        SELECT 
            fv.id AS factura_id,
            fv.id_cliente,
            cli.nombre,
            cli.apellido,
            fv.descuento AS factura_descuento,
            fv.total AS factura_total,
            fv.fecha AS factura_fecha,

            -- Detalles en subconsulta
            (SELECT JSON_ARRAYAGG(
                        JSON_OBJECT(
                            'id', dv.id,
                            'id_producto', dv.id_producto,
                            'descripcion', dv.descripcion,
                            'cantidad', dv.cantidad,
                            'pvp', dv.pvp,
                            'descuento', dv.descuento
                        )
                   )
             FROM DetalleVenta dv
             WHERE dv.id_factura_venta = fv.id
            ) AS detalles

        FROM FacturaVenta fv
        INNER JOIN Cliente cli ON fv.id_cliente = cli.id
        WHERE " . implode(" AND ", $condiciones) . "
        ORDER BY fv.id DESC
        LIMIT 20
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
