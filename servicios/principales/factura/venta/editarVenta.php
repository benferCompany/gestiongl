<?php
$data = json_decode(file_get_contents("php://input"), true);

try {
    $pdo->beginTransaction();

    // Actualizar datos de la factura
    $stmt = $pdo->prepare("UPDATE FacturaVenta SET id_cliente=?, descuento=?, total=? WHERE id=?");
    $stmt->execute([$data['id_cliente'], $data['descuento'], $data['total'], $data['id']]);

    // Actualizar o insertar detalles
    $stmtDetalleUpdate = $pdo->prepare("UPDATE DetalleVenta SET id_producto=?, descripcion=?, cantidad=?, pvp=?, descuento=? WHERE id=?");
    $stmtDetalleInsert = $pdo->prepare("INSERT INTO DetalleVenta (id_factura_venta, id_producto, descripcion, cantidad, pvp, descuento) VALUES (?, ?, ?, ?, ?, ?)");

    foreach ($data['detalles'] as $detalle) {
        if (!empty($detalle['id'])) {
            $stmtDetalleUpdate->execute([
                $detalle['id_producto'],
                $detalle['descripcion'],
                $detalle['cantidad'],
                $detalle['pvp'],
                $detalle['descuento'],
                $detalle['id']
            ]);
        } else {
            $stmtDetalleInsert->execute([
                $data['id'],
                $detalle['id_producto'],
                $detalle['descripcion'],
                $detalle['cantidad'],
                $detalle['pvp'],
                $detalle['descuento']
            ]);
        }
    }

    $pdo->commit();
    echo json_encode(["status" => "success"]);

} catch (PDOException $e) {
    $pdo->rollBack();
    http_response_code(500);
    echo json_encode([
        "status" => "error",
        "message" => "No se pudo actualizar la factura de venta",
        "error" => $e->getMessage()
    ]);
}
