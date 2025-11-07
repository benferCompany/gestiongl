<?php
header("Content-Type: application/json; charset=UTF-8");
include "../../../conexion.php";

$data = json_decode(file_get_contents("php://input"), true);

try {
    $pdo->beginTransaction();

    // 1. Insertar factura de venta
    $stmt = $pdo->prepare("INSERT INTO FacturaVenta (id_cliente, descuento, total) VALUES (?, ?, ?)");
    $stmt->execute([$data['id_cliente'], $data['descuento'], $data['total']]);
    $facturaId = $pdo->lastInsertId();

    // 2. Insertar detalles de venta
    $stmtDetalle = $pdo->prepare("INSERT INTO DetalleVenta (id_factura_venta, id_producto, descripcion, cantidad, pvp, descuento) VALUES (?, ?, ?, ?, ?, ?)");
    foreach ($data['detalles'] as $detalle) {
        $stmtDetalle->execute([
            $facturaId,
            $detalle['id_producto'],
            $detalle['descripcion'],
            $detalle['cantidad'],
            $detalle['pvp'],
            $detalle['descuento']
        ]);
    }

    $pdo->commit();

    echo json_encode(["status" => "success", "id_factura" => $facturaId]);

} catch (PDOException $e) {
    $pdo->rollBack();
    http_response_code(500);
    echo json_encode([
        "status" => "error",
        "message" => "No se pudo crear la factura de venta",
        "error" => $e->getMessage()
    ]);
}
