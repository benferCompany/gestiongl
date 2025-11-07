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
        $condiciones[] = "(LOWER(CONCAT_WS(' ', fc.id, prov.razon_social, fc.total, fc.descuento, fc.fecha)) LIKE :p$i)";
        $parametros[":p$i"] = "%" . $palabra . "%";
    }

    $sql = "
        SELECT 
            fc.id AS factura_id,
            fc.id_proveedor,
            prov.razon_social,
            fc.descuento AS factura_descuento,
            fc.total AS factura_total,
            fc.fecha AS factura_fecha,
            
            -- Detalles en subconsulta
            (SELECT JSON_ARRAYAGG(
                        JSON_OBJECT(
                            'id', dc.id,
                            'id_producto', dc.id_producto,
                            'descripcion', dc.descripcion,
                            'costo', dc.costo,
                            'cantidad', dc.cantidad,
                            'descuento', dc.descuento
                        )
                   )
             FROM DetalleCompra dc
             WHERE dc.id_factura_compra = fc.id
            ) AS detalles,

            -- Pagos en subconsulta
            (SELECT JSON_ARRAYAGG(
                        JSON_OBJECT(
                            'id', pp.id,
                            'fecha', pp.fecha,
                            'tipo_pago', pp.tipo_pago,
                            'monto', pp.monto
                        )
                   )
             FROM Pagos_Proveedor pp
             WHERE pp.id_factura_compra = fc.id
            ) AS pagos

        FROM FacturaCompra fc
        INNER JOIN Proveedor prov ON fc.id_proveedor = prov.id
        WHERE " . implode(" AND ", $condiciones) . "
        ORDER BY fc.id DESC
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
