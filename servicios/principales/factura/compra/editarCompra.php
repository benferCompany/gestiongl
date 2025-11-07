<?php
$data = json_decode(file_get_contents("php://input"), true);

try {
    $pdo->beginTransaction();

    // Actualizar datos de factura
    $stmt = $pdo->prepare("UPDATE FacturaCompra SET id_proveedor = ?, descuento = ?, total = ? WHERE id = ?");
    $stmt->execute([$data['id_proveedor'], $data['descuento'], $data['total'], $data['id']]);

    // Actualizar o insertar detalles
    $stmtDetalleUpdate = $pdo->prepare("UPDATE DetalleCompra SET id_producto=?, descripcion=?, costo=?, cantidad=?, descuento=? WHERE id=?");
    $stmtDetalleInsert = $pdo->prepare("INSERT INTO DetalleCompra (id_factura_compra, id_producto, descripcion, costo, cantidad, descuento) VALUES (?, ?, ?, ?, ?, ?)");

    foreach ($data['detalles'] as $detalle) {
        if (!empty($detalle['id'])) {
            $stmtDetalleUpdate->execute([
                $detalle['id_producto'],
                $detalle['descripcion'],
                $detalle['costo'],
                $detalle['cantidad'],
                $detalle['descuento'],
                $detalle['id']
            ]);
        } else {
            $stmtDetalleInsert->execute([
                $data['id'],
                $detalle['id_producto'],
                $detalle['descripcion'],
                $detalle['costo'],
                $detalle['cantidad'],
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
        "message" => "No se pudo actualizar la factura",
        "error" => $e->getMessage()
    ]);
}
