<?php
header("Content-Type: application/json; charset=UTF-8");
include "../../../conexion.php";

$data = json_decode(file_get_contents("php://input"), true);

try {
    $pdo->beginTransaction();

    // 1. Insertar factura
    $stmt = $pdo->prepare("INSERT INTO FacturaCompra (id_proveedor, descuento, total) VALUES (?, ?, ?)");
    $stmt->execute([$data['id_proveedor'], $data['descuento'], $data['total']]);
    $facturaId = $pdo->lastInsertId();

    // 2. Insertar detalles
    $stmtDetalle = $pdo->prepare("INSERT INTO DetalleCompra (id_factura_compra, id_producto, descripcion, costo, cantidad, descuento) VALUES (?, ?, ?, ?, ?, ?)");
    foreach ($data['detalles'] as $detalle) {
        $stmtDetalle->execute([
            $facturaId,
            $detalle['id_producto'],
            $detalle['descripcion'],
            $detalle['costo'],
            $detalle['cantidad'],
            $detalle['descuento']
        ]);
    }

    // 3. Insertar pagos (opcional)
    if (!empty($data['pagos'])) {
        $stmtPago = $pdo->prepare("INSERT INTO Pagos_Proveedor (id_factura_compra, fecha, tipo_pago, monto) VALUES (?, ?, ?, ?)");
        foreach ($data['pagos'] as $pago) {
            $stmtPago->execute([
                $facturaId,
                $pago['fecha'],
                $pago['tipo_pago'],
                $pago['monto']
            ]);
        }
    }

    $pdo->commit();

    echo json_encode(["status" => "success", "id_factura" => $facturaId]);

} catch (PDOException $e) {
    $pdo->rollBack();
    http_response_code(500);
    echo json_encode([
        "status" => "error",
        "message" => "No se pudo crear la factura",
        "error" => $e->getMessage()
    ]);
}
