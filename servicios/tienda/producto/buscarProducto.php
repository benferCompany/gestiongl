<?php
header("Content-Type: application/json; charset=UTF-8");

include "../../conexion.php";

// Recibir búsqueda
$data = json_decode(file_get_contents("php://input"), true);
if (!$data) {
    $data = $_POST;
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

    $pdo->exec("SET SESSION group_concat_max_len = 1000000");

    // Separar palabras
    $palabras = preg_split('/\s+/', strtolower($busqueda));

    $condiciones = [];
    $parametros = [];

    foreach ($palabras as $i => $palabra) {
        $condiciones[] = "(LOWER(CONCAT_WS(' ', p.id, p.id_producto, p.descripcion, p.costo, p.pvp)) LIKE :p$i)";
        $parametros[":p$i"] = "%" . $palabra . "%";
    }

    $sql = "
        SELECT 
            p.id,
            p.id_producto,
            p.descripcion,
            p.costo,
            p.pvp,

            -- Categorías
            (
                SELECT CONCAT(
                    '[',
                    IFNULL(
                        GROUP_CONCAT(
                            JSON_OBJECT(
                                'id', c.id,
                                'nombre', c.nombre,
                                'id_categoria_padre', c.id_categoria_padre
                            ) SEPARATOR ','
                        ),
                        ''
                    ),
                    ']'
                )
                FROM Categoria_Producto cp
                INNER JOIN Categoria c ON c.id = cp.id_categoria
                WHERE cp.id_producto = p.id
            ) AS categorias,

            -- Imágenes
            (
                SELECT CONCAT(
                    '[',
                    IFNULL(
                        GROUP_CONCAT(
                            JSON_OBJECT(
                                'id', i.id,
                                'url', i.url,
                                'orden', i.orden
                            )
                            ORDER BY i.orden SEPARATOR ','
                        ),
                        ''
                    ),
                    ']'
                )
                FROM Imagen_Producto i
                WHERE i.id_producto = p.id
            ) AS imagenes

        FROM Producto p

        WHERE " . implode(" AND ", $condiciones) . "

        AND EXISTS (
            SELECT 1 
            FROM Imagen_Producto i 
            WHERE i.id_producto = p.id
        )

        ORDER BY p.id DESC
        LIMIT 10
    ";

    $stmt = $pdo->prepare($sql);
    $stmt->execute($parametros);
    $data = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Convertir JSON string a array real
    foreach ($data as &$row) {
        $row['categorias'] = json_decode($row['categorias'], true) ?? [];
        $row['imagenes']   = json_decode($row['imagenes'], true) ?? [];
    }

    echo json_encode([
        "status" => "success",
        "data"   => $data
    ], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);

} catch (PDOException $e) {

    http_response_code(500);
    echo json_encode([
        "status"  => "error",
        "message" => "Error en la búsqueda",
        "error"   => $e->getMessage()
    ]);
}
?>
