<?php
header("Content-Type: application/json; charset=UTF-8");
include "../../../conexion.php";

// Recibir búsqueda
$data = json_decode(file_get_contents("php://input"), true);
if (!$data) $data = $_POST;

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
    $palabras = preg_split('/\s+/', strtolower($busqueda));
    $condiciones = [];
    $parametros = [];

    foreach ($palabras as $i => $palabra) {
        $condiciones[] = "(LOWER(CONCAT_WS(' ', pp.id, pp.fecha, pp.tipo_pago, pp.monto, fc.id, prov.razon_social)) LIKE :p$i)";
        $parametros[":p$i"] = "%" . $palabra . "%";
    }

    $sql = "
        SELECT 
            pp.id AS pago_id,
            pp.id_factura_compra,
            pp.fecha,
            pp.tipo_pago,
            pp.monto,
            fc.total AS factura_total,
            fc.descuento AS factura_descuento,
            prov.razon_social
        FROM Pagos_Proveedor pp
        INNER JOIN FacturaCompra fc ON pp.id_factura_compra = fc.id
        INNER JOIN Proveedor prov ON fc.id_proveedor = prov.id
        WHERE " . implode(" AND ", $condiciones) . "
        ORDER BY pp.fecha DESC
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
