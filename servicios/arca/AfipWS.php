<?php

class AfipWS {

    private $cert;
    private $key;
    private $taFile;
    private $wsaa_url;
    private $wsfe_url;
    private $cuit;

    public function __construct($cuit, $produccion = false) {

        $this->cert = __DIR__ . "/certificado.crt";
        $this->key  = __DIR__ . "/privada.key";
        $this->taFile = __DIR__ . "/ta.xml";
        $this->cuit = $cuit;

        if ($produccion) {
            $this->wsaa_url = "https://wsaa.afip.gov.ar/ws/services/LoginCms?WSDL";
            $this->wsfe_url = "https://servicios1.afip.gov.ar/wsfev1/service.asmx?WSDL";
        } else {
            $this->wsaa_url = "https://wsaahomo.afip.gov.ar/ws/services/LoginCms?WSDL";
            $this->wsfe_url = "https://wswhomo.afip.gov.ar/wsfev1/service.asmx?WSDL";
        }
    }

    /* =========================
       1️⃣ GENERAR TRA
    ========================== */
    private function crearTRA($service) {

    $uniqueId = time();
    $generationTime = date('c', time() - 120);
    $expirationTime = date('c', time() + 600); // 10 minutos (como recomienda AFIP)

    return '<?xml version="1.0" encoding="UTF-8"?>'
    .'<loginTicketRequest version="1.0">'
    .'<header>'
    .'<uniqueId>'.$uniqueId.'</uniqueId>'
    .'<generationTime>'.$generationTime.'</generationTime>'
    .'<expirationTime>'.$expirationTime.'</expirationTime>'
    .'</header>'
    .'<service>'.$service.'</service>'
    .'</loginTicketRequest>';
}

    /* =========================
       2️⃣ FIRMAR CMS
    ========================== */
  private function firmarTRA($tra) {

    $tmpTRA = tempnam(sys_get_temp_dir(), 'tra');
    $tmpCMS = tempnam(sys_get_temp_dir(), 'cms');

    file_put_contents($tmpTRA, $tra);

    $cmd = "openssl smime -sign "
        . "-in $tmpTRA "
        . "-signer {$this->cert} "
        . "-inkey {$this->key} "
        . "-out $tmpCMS "
        . "-outform DER "
        . "-nodetach 2>&1";

    exec($cmd, $output, $return_var);

    if ($return_var !== 0) {
        unlink($tmpTRA);
        unlink($tmpCMS);
        throw new Exception("Error OpenSSL: " . implode("\n", $output));
    }

    $cmsData = file_get_contents($tmpCMS);

    if (!$cmsData) {
        throw new Exception("No se generó el archivo CMS.");
    }

    unlink($tmpTRA);
    unlink($tmpCMS);

    return base64_encode($cmsData);
}

    /* =========================
       3️⃣ OBTENER TA (con cache)
    ========================== */
 private function obtenerTA() {

    date_default_timezone_set('America/Argentina/Buenos_Aires');

    // 1️⃣ Si ya existe ta.xml, intentamos usarlo
    if (file_exists($this->taFile)) {
        $xml = @simplexml_load_file($this->taFile);
        if ($xml && isset($xml->header->expirationTime)) {
            $expira = strtotime((string)$xml->header->expirationTime);
            // Si no venció, lo reutilizamos (margen de 5 min)
            if ($expira > (time() + 300)) {
                return [
                    'token' => (string)$xml->credentials->token,
                    'sign'  => (string)$xml->credentials->sign
                ];
            }
        }
    }

    // 2️⃣ Si no existe o venció → generar nuevo TA
    $tra = $this->crearTRA("wsfe");
    $cms = $this->firmarTRA($tra);

    $client = new SoapClient($this->wsaa_url, [
        'trace' => 1,
        'exceptions' => 1
    ]);

    try {
        $response = $client->loginCms(['in0' => $cms]);

        $taContent = $response->loginCmsReturn ?? null;

        if (!$taContent) {
            throw new Exception("No se recibió contenido de TA desde AFIP");
        }

        // Guardar TA en disco
        $result = @file_put_contents($this->taFile, $taContent);
        if ($result === false) {
            throw new Exception("No se pudo guardar el archivo TA en: " . $this->taFile);
        }

        $xml = simplexml_load_string($taContent);

        return [
            'token' => (string)$xml->credentials->token,
            'sign'  => (string)$xml->credentials->sign
        ];

    } catch (SoapFault $e) {

        // 3️⃣ Si AFIP dice que ya hay TA vigente
        if (strpos($e->getMessage(), 'ya posee un TA valido') !== false) {

            // Intentamos leer TA desde disco si existe
            if (file_exists($this->taFile)) {
                $xml = simplexml_load_file($this->taFile);
                return [
                    'token' => (string)$xml->credentials->token,
                    'sign'  => (string)$xml->credentials->sign
                ];
            }

            // No hay archivo en disco → avisamos al usuario que espere
            throw new Exception(
                "Ya existe un TA vigente en AFIP y no hay ta.xml en disco. " .
                "Esperar 5 minutos para poder generar uno nuevo."
            );
        }

        throw $e;
    }
}
    /* =========================
       4️⃣ SOLICITAR CAE
    ========================== */
    public function solicitarCAE($factura) {

    try {

        $ta = $this->obtenerTA();

        $client = new SoapClient($this->wsfe_url, [
            'trace' => 1,
            'exceptions' => 1
        ]);

        $params = [
            'Auth' => [
                'Token' => $ta['token'],
                'Sign'  => $ta['sign'],
                'Cuit'  => $this->cuit
            ],
            'FeCAEReq' => $factura
        ];

        $result = $client->FECAESolicitar($params);
        $res = $result->FECAESolicitarResult;

        $detalle = $res->FeDetResp->FECAEDetResponse;

        // ✅ Si fue aprobada
        if ($detalle->Resultado == "A") {
            return [
                'cae' => $detalle->CAE,
                'vencimiento' => $detalle->CAEFchVto
            ];
        }

        // ❌ Si fue rechazada
        return [
            'resultado' => $detalle->Resultado,
            'observaciones' => $detalle->Observaciones ?? null,
            'errores' => $res->Errors ?? null
        ];

    } catch (Exception $e) {
        return ['error' => $e->getMessage()];
    }
}

public function obtenerProximoNumero($ptoVta, $cbteTipo) {

    $ta = $this->obtenerTA();

    $client = new SoapClient($this->wsfe_url, [
        'trace' => 1,
        'exceptions' => 1
    ]);

    $params = [
        'Auth' => [
            'Token' => $ta['token'],
            'Sign'  => $ta['sign'],
            'Cuit'  => $this->cuit
        ],
        'PtoVta' => $ptoVta,
        'CbteTipo' => $cbteTipo
    ];

    $result = $client->FECompUltimoAutorizado($params);

    $ultimo = $result->FECompUltimoAutorizadoResult->CbteNro;

    return $ultimo + 1;
}
}