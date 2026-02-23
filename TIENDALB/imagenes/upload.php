<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");

$apiKey = "6d207e02198a847aa98d0a2a901485a5";

if (!isset($_FILES['image']) || $_FILES['image']['error'] !== 0) {
    http_response_code(400);
    echo json_encode(["error" => "No se recibió imagen válida"]);
    exit;
}

$imageTmp  = $_FILES['image']['tmp_name'];

$ch = curl_init("https://freeimage.host/api/1/upload");

curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, [
    "key"    => $apiKey,
    "source" => new CURLFile($imageTmp) // 👈 IMPORTANTE: usar "source"
]);

$response = curl_exec($ch);

if ($response === false) {
    http_response_code(500);
    echo json_encode(["error" => curl_error($ch)]);
    curl_close($ch);
    exit;
}

curl_close($ch);

echo $response;
