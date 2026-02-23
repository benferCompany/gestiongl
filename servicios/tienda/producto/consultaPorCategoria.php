<?php
header("Content-Type: application/json; charset=UTF-8");
include "../../conexion.php";

try {

    // 🔹 LEER BODY JSON
    $input = json_decode(file_get_contents("php://input"), true);

    if (!isset($input['id_categoria'])) {
        http_response_code(400);
        echo json_encode([
            "status" => "error",
            "message" => "Falta el parámetro id_categoria"
        ]);
        exit;
    }

    $idCategoria = (int) $input['id_categoria'];

    $pdo->exec("SET SESSION group_concat_max_len = 1000000");

    $sql = "
        SELECT DISTINCT
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
                FROM Categoria_Producto cp2
                INNER JOIN Categoria c ON c.id = cp2.id_categoria
                WHERE cp2.id_producto = p.id
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
        INNER JOIN Categoria_Producto cp ON cp.id_producto = p.id
        WHERE cp.id_categoria = :id_categoria
        AND EXISTS (
            SELECT 1
            FROM Imagen_Producto i
            WHERE i.id_producto = p.id
        )
        ORDER BY p.id DESC
    ";

    $stmt = $pdo->prepare($sql);
    $stmt->bindParam(":id_categoria", $idCategoria, PDO::PARAM_INT);
    $stmt->execute();

    $data = $stmt->fetchAll(PDO::FETCH_ASSOC);

    foreach ($data as &$row) {
        $row['categorias'] = json_decode($row['categorias'], true) ?? [];
        $row['imagenes']   = json_decode($row['imagenes'], true) ?? [];
    }

    echo json_encode([
        "status" => "success",
        "categoria_id" => $idCategoria,
        "total" => count($data),
        "data" => $data
    ], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        "status" => "error",
        "message" => "Error al obtener productos por categoría",
        "error" => $e->getMessage()
    ]);
}
