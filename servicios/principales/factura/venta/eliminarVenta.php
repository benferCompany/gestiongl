<?php
$data = json_decode(file_get_contents("php://input"), true);

try {
    $pdo->beginTransaction();

    // Primero eliminar detalles
    $pdo->prepare("DELETE FROM DetalleVenta WHERE id_factura_venta=?")->execute([$data['id']]);

    // Luego eliminar factura
    $pdo->prepare("DELETE FROM FacturaVenta WHERE id=?")->execute([$data['id']]);

    $pdo->commit();
    echo json_encode(["status" => "success"]);

} catch (PDOException $e) {
    $pdo->rollBack();
    http_response_code(500);
    echo json_encode([
        "status" => "error",
        "message" => "No se pudo eliminar la factura de venta",
        "error" => $e->getMessage()
    ]);
}
