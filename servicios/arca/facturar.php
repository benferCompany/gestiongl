<?php
require 'AfipWS.php';

$afip = new AfipWS(20353070585, false); // false = homologación

$proximo = $afip->obtenerProximoNumero(1, 11); // PV 1, Factura C

$factura = [
    'FeCabReq' => [
        'CantReg' => 1,
        'PtoVta'  => 1,
        'CbteTipo'=> 11 // FACTURA C
    ],
    'FeDetReq' => [
        'FECAEDetRequest' => [
            [
                'Concepto' => 1, // 1 = Productos, 2 = Servicios, 3 = Mixto

                // ================================
                // 1️⃣ Cliente Persona con DNI
                // ================================
                //'DocTipo'  => 96, // 96 = DNI
                //'DocNro'   => 40123456, // El número de DNI del cliente
                
                'DocTipo'  => 99, // 96 = DNI
                'DocNro'   => 0, // El número de DNI del cliente

                // ================================
                // 2️⃣ Cliente Persona con CUIT
                // ================================
                // 'DocTipo' => 80,       // 80 = CUIT
                // 'DocNro'  => 20304050607, // El CUIT del cliente

                'CbteDesde'=> $proximo,
                'CbteHasta'=> $proximo,
                'CbteFch'  => date('Ymd'),

                'ImpTotal'   => 121,//Total de la factura
                'ImpTotConc' => 0,
                'ImpNeto'    => 121, // 🔴 en Factura C es igual al total
                'ImpOpEx'    => 0,
                'ImpTrib'    => 0,
                'ImpIVA'     => 0,

                'MonId'    => 'PES',
                'MonCotiz' => 1,

                // 🔴 NUEVO CAMPO OBLIGATORIO
                'CondicionIVAReceptorId' => 5 // 5 = Consumidor Final
            ]
        ]
    ]
];

$resultado = $afip->solicitarCAE($factura);

print_r($resultado);