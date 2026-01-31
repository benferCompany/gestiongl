import { contenidoFactura } from "../../../../componentes_dinamicos/facturas/contenido.js";
import { URL } from "../../../../controladores/url/url.js";
const param = {
    URLS:

     {
        venta: URL+ "/servicios/principales/factura/venta/consultarVenta.php",
        compra: URL+ "/servicios/principales/factura/compra/consultarCompra.php",
        buscarCompra: URL+ "/servicios/principales/factura/compra/buscarCompra.php",
        buscarVenta: URL+ "/servicios/principales/factura/venta/buscarVenta.php"
     }   
    ,
    
};
export const getFacturas = ()=>{



    contenidoFactura(param);
    
};