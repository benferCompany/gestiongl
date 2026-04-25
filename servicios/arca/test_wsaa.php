<?php
require_once "wsaa.php";

try {
    $auth = obtenerTA();

    echo "<pre>";
    print_r($auth);
    echo "</pre>";

} catch (Exception $e) {
    echo "ERROR: " . $e->getMessage();
}