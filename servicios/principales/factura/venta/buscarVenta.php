<?php
header("Content-Type: application/json; charset=UTF-8");
include "../../../conexion.php";

try {

    // 🔹 Evita cortes en JSON largos
    $pdo->exec("SET SESSION group_concat_max_len = 1000000");

    // 🔹 Leer JSON o POST
    $data = json_decode(file_get_contents("php://input"), true);
    if (!$data) {
        $data = $_POST;
    }

    $busqueda = trim($data['search'] ?? '');

    if ($busqueda === '') {
        http_response_code(400);
        echo json_encode([
            "status"  => "error",
            "message" => "Debe ingresar un término de búsqueda"
        ]);
        exit;
    }

    // 🔹 Separar palabras
    $palabras = preg_split('/\s+/', strtolower($busqueda));

    $condiciones = [];
    $params = [];

    foreach ($palabras as $i => $palabra) {
        $condiciones[] = "
            LOWER(CONCAT_WS(' ',
                CAST(fv.id AS CHAR),
                cli.nombre,
                cli.apellido,
                CAST(fv.total AS CHAR),
                CAST(fv.descuento AS CHAR),
                fv.fecha
            )) LIKE :p$i
        ";
        $params[":p$i"] = "%$palabra%";
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
            fv.id_tipo_factura,

            -- Detalles de factura
            (
                SELECT CONCAT(
                    '[',
                    IFNULL(
                        GROUP_CONCAT(
                            JSON_OBJECT(
                                'id', dv.id,
                                'id_producto', dv.id_producto,
                                'descripcion', dv.descripcion,
                                'cantidad', dv.cantidad,
                                'pvp', dv.pvp,
                                'descuento', dv.descuento
                            )
                        ),
                        ''
                    ),
                    ']'
                )
                FROM DetalleVenta dv
                WHERE dv.id_factura_venta = fv.id
            ) AS detalles,

            -- Pagos de cliente
            (
                SELECT CONCAT(
                    '[',
                    IFNULL(
                        GROUP_CONCAT(
                            JSON_OBJECT(
                                'id', pc.id,
                                'fecha', pc.fecha,
                                'tipo_pago', JSON_OBJECT(
                                    'id', tp.id,
                                    'nombre', tp.descripcion
                                ),
                                'monto', pc.monto
                            )
                        ),
                        ''
                    ),
                    ']'
                )
                FROM Pagos_Cliente pc
                INNER JOIN Tipo_Pago tp ON tp.id = pc.id_tipo_pago
                WHERE pc.id_factura_venta = fv.id
            ) AS pagos

        FROM FacturaVenta fv
        INNER JOIN Cliente cli ON fv.id_cliente = cli.id
        WHERE " . implode(" AND ", $condiciones) . "
        ORDER BY fv.id DESC
        LIMIT 20
    ";

    $stmt = $pdo->prepare($sql);
    $stmt->execute($params);
    $data = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // 🔹 Convertir strings JSON a arrays reales
    foreach ($data as &$row) {
        $row['detalles'] = json_decode($row['detalles'], true) ?? [];
        $row['pagos']    = json_decode($row['pagos'], true) ?? [];
    }

    echo json_encode([
        "status" => "success",
        "data"   => $data
    ], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        "status"  => "error",
        "message" => "No se pudo realizar la búsqueda",
        "error"   => $e->getMessage()
    ]);
}
?>
