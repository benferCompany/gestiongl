<?php
$data = json_decode(file_get_contents("php://input"), true);

try {
    $stmt = $pdo->prepare("UPDATE Pagos_Proveedor SET id_factura_compra=?, fecha=?, tipo_pago=?, monto=? WHERE id=?");
    $stmt->execute([
        $data['id_factura_compra'],
        $data['fecha'],
        $data['tipo_pago'],
        $data['monto'],
        $data['id']
    ]);

    echo json_encode(["status" => "success"]);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        "status" => "error",
        "message" => "No se pudo actualizar el pago",
        "error" => $e->getMessage()
    ]);
}
