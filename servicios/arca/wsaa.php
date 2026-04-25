<?php
require_once "config.php";

function obtenerTA()
{
    $service = "wsfe";
    $uniqueId = time();
    $generationTime = date('c', time() - 60);
    $expirationTime = date('c', time() + 600);

    $xml = <<<XML
<loginTicketRequest version="1.0">
    <header>
        <uniqueId>$uniqueId</uniqueId>
        <generationTime>$generationTime</generationTime>
        <expirationTime>$expirationTime</expirationTime>
    </header>
    <service>$service</service>
</loginTicketRequest>
XML;

    file_put_contents("loginTicketRequest.xml", $xml);

    // 🔐 Firmar correctamente en DER
    $cmd = "openssl cms -sign " .
        "-in loginTicketRequest.xml " .
        "-signer " . CERT_PATH . " " .
        "-inkey " . KEY_PATH . " " .
        "-out loginTicketRequest.cms " .
        "-outform DER " .
        "-nodetach -binary 2>&1";

    exec($cmd, $output, $resultCode);

    if ($resultCode !== 0) {
        die("Error firmando CMS:\n" . implode("\n", $output));
    }

    $cms = file_get_contents("loginTicketRequest.cms");
    $cms = base64_encode($cms);

    $client = new SoapClient(WSAA_URL);

    $response = $client->loginCms(['in0' => $cms]);

    file_put_contents("TA.xml", $response->loginCmsReturn);

    $ta = simplexml_load_string($response->loginCmsReturn);

    return [
        "token" => (string)$ta->credentials->token,
        "sign"  => (string)$ta->credentials->sign
    ];
}