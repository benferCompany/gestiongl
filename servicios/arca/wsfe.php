<?php
require_once "config.php";
require_once "wsaa.php";

function facturar($docTipo, $docNro, $importe)
{
    $auth = obtenerTA();

    $client = new SoapClient(WSFE_URL);

    // Obtener último comprobante
    $ultimo = $client->FECompUltimoAutorizado([
        'Auth' => [
            'Token' => $auth['token'],
            'Sign'  => $auth['sign'],
            'Cuit'  => CUIT
        ],
        'PtoVta' => 1,
        'CbteTipo' => 11
    ]);

    $numero = $ultimo->FECompUltimoAutorizadoResult->CbteNro + 1;

    $params = [
        'Auth' => [
            'Token' => $auth['token'],
            'Sign'  => $auth['sign'],
            'Cuit'  => CUIT
        ],
        'FeCAEReq' => [
            'FeCabReq' => [
                'CantReg' => 1,
                'PtoVta' => 1,
                'CbteTipo' => 11 // Factura C
            ],
            'FeDetReq' => [
                'FECAEDetRequest' => [
                    [
                        'Concepto' => 1,
                        'DocTipo' => $docTipo,
                        'DocNro' => $docNro,
                        'CbteDesde' => $numero,
                        'CbteHasta' => $numero,
                        'CbteFch' => date('Ymd'),
                        'ImpTotal' => $importe,
                        'ImpTotConc' => 0,
                        'ImpNeto' => $importe,
                        'ImpOpEx' => 0,
                        'ImpIVA' => 0,
                        'ImpTrib' => 0,
                        'MonId' => 'PES',
                        'MonCotiz' => 1
                    ]
                ]
            ]
        ]
    ];

    return $client->FECAESolicitar($params);
}