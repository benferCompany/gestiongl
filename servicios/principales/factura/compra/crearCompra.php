<?php
header("Content-Type: application/json; charset=UTF-8");
include "../../../conexion.php";

$data = json_decode(file_get_contents("php://input"), true);

try {
    $pdo->beginTransaction();

    // 1. Insertar factura
    $stmt = $pdo->prepare("
        INSERT INTO FacturaCompra (id_proveedor, descuento, total, id_tipo_factura)
        VALUES (?, ?, ?, ?)
    ");
    $stmt->execute([
        $data['id_proveedor'],
        $data['descuento'],
        $data['total'],
        $data['id_tipo_factura'],
    ]);

    $facturaId = $pdo->lastInsertId();

    // 2. Insertar detalles
    $stmtDetalle = $pdo->prepare("
        INSERT INTO DetalleCompra
        (id_factura_compra, id_producto, descripcion, costo, cantidad, descuento)
        VALUES (?, ?, ?, ?, ?, ?)
    ");

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
        $stmtPago = $pdo->prepare("
            INSERT INTO Pagos_Proveedor
            (id_factura_compra, fecha, id_tipo_pago, monto)
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
        FROM FacturaCompra
        WHERE id = ?
    ");
    $stmtFactura->execute([$facturaId]);
    $factura = $stmtFactura->fetch(PDO::FETCH_ASSOC);

    // Detalles
    $stmtDetalles = $pdo->prepare("
        SELECT *
        FROM DetalleCompra
        WHERE id_factura_compra = ?
    ");
    $stmtDetalles->execute([$facturaId]);
    $factura['detalles'] = $stmtDetalles->fetchAll(PDO::FETCH_ASSOC);

    // Pagos
    $stmtPagos = $pdo->prepare("
        SELECT *
        FROM Pagos_Proveedor
        WHERE id_factura_compra = ?
    ");
    $stmtPagos->execute([$facturaId]);
    $factura['pagos'] = $stmtPagos->fetchAll(PDO::FETCH_ASSOC);

    
    
    // tipo_factura
    $stmtPagos = $pdo->prepare("
        SELECT *
        FROM Tipo_Factura
        WHERE id= ?
    ");
    $stmtPagos->execute([$data['id_tipo_factura']]);
    $factura['tipo_factura'] = $stmtPagos->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode([
        "status" => "success",
        "factura" => $factura
    ]);

} catch (PDOException $e) {
    $pdo->rollBack();
    http_response_code(500);
    echo json_encode([
        "status" => "error",
        "message" => "No se pudo crear la factura",
        "error" => $e->getMessage()
    ]);
}
