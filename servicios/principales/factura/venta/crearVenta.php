<?php
header("Content-Type: application/json; charset=UTF-8");
include "../../../conexion.php";

$data = json_decode(file_get_contents("php://input"), true);

try {
    $pdo->beginTransaction();

    /* =========================
       1. INSERTAR FACTURA VENTA
       ========================= */
    $stmt = $pdo->prepare("
        INSERT INTO FacturaVenta (id_cliente, descuento, total, id_tipo_factura, fecha)
        VALUES (?, ?, ?, ?, ?)
    ");
    $stmt->execute([
        $data['id_cliente'],
        $data['descuento'],
        $data['total'],
        $data['id_tipo_factura'],
        $data['fecha']
    ]);

    $facturaId = $pdo->lastInsertId();

    /* =========================
       2. INSERTAR DETALLES
       ========================= */
    $stmtDetalle = $pdo->prepare("
        INSERT INTO DetalleVenta
        (id_factura_venta, id_producto, descripcion, cantidad, pvp, descuento)
        VALUES (?, ?, ?, ?, ?, ?)
    ");

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

    /* =========================
       3. PAGOS (OPCIONAL)
       ========================= */
    if (!empty($data['pagos'])) {
        $stmtPago = $pdo->prepare("
            INSERT INTO Pagos_Cliente
            (id_factura_venta, fecha, id_tipo_pago, monto)
            VALUES (?, ?, ?, ?)
        ");

        foreach ($data['pagos'] as $pago) {
            $stmtPago->execute([
                $facturaId,
                $pago['fecha'],
                $pago['id_tipo_pago'],
                $pago['monto']
            ]);
        }
    }

    $pdo->commit();

    /* =========================
       OBTENER FACTURA COMPLETA
       ========================= */

    // Factura
    $stmtFactura = $pdo->prepare("
        SELECT *
        FROM FacturaVenta
        WHERE id = ?
    ");
    $stmtFactura->execute([$facturaId]);
    $factura = $stmtFactura->fetch(PDO::FETCH_ASSOC);

    // Detalles
    $stmtDetalles = $pdo->prepare("
        SELECT *
        FROM DetalleVenta
        WHERE id_factura_venta = ?
    ");
    $stmtDetalles->execute([$facturaId]);
    $factura['detalles'] = $stmtDetalles->fetchAll(PDO::FETCH_ASSOC);

    // Pagos
    $stmtPagos = $pdo->prepare("
        SELECT *
        FROM Pagos_Cliente
        WHERE id_factura_venta = ?
    ");
    $stmtPagos->execute([$facturaId]);
    $factura['pagos'] = $stmtPagos->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode([
        "status" => "success",
        "factura" => $factura
    ]);

} catch (PDOException $e) {
    $pdo->rollBack();
    http_response_code(500);
    echo json_encode([
        "status" => "error",
        "message" => "No se pudo crear la factura de venta",
        "error" => $e->getMessage()
    ]);
}
