<?php

define("CUIT", 20353070585);
define("CERT_PATH", __DIR__ . "/certs/certificado.crt");
define("KEY_PATH", __DIR__ . "/certs/privada.key");

/* 🔹 HOMOLOGACIÓN */
define("WSAA_URL", "https://wsaahomo.afip.gov.ar/ws/services/LoginCms?wsdl");
define("WSFE_URL", "https://wswhomo.afip.gov.ar/wsfev1/service.asmx?WSDL");

/* 🔹 PRODUCCIÓN (cuando funcione todo)
define("WSAA_URL", "https://wsaa.afip.gov.ar/ws/services/LoginCms?wsdl");
define("WSFE_URL", "https://servicios1.afip.gov.ar/wsfev1/service.asmx?WSDL");
*/