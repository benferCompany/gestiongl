<?php
$data = json_decode(file_get_contents("php://input"), true);

try {
    $pdo->beginTransaction();

    // Primero eliminar detalles y pagos
    $pdo->prepare("DELETE FROM DetalleCompra WHERE id_factura_compra=?")->execute([$data['id']]);
    $pdo->prepare("DELETE FROM Pagos_Proveedor WHERE id_factura_compra=?")->execute([$data['id']]);

    // Luego eliminar factura
    $pdo->prepare("DELETE FROM FacturaCompra WHERE id=?")->execute([$data['id']]);

    $pdo->commit();
    echo json_encode(["status" => "success"]);

} catch (PDOException $e) {
    $pdo->rollBack();
    http_response_code(500);
    echo json_encode([
        "status" => "error",
        "message" => "No se pudo eliminar la factura",
        "error" => $e->getMessage()
    ]);
}
