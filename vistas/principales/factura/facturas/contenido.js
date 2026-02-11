import { contenidoFactura } from "../../../../componentes_dinamicos/facturas/contenido.js";
import { URL } from "../../../../controladores/url/url.js";
const param = {
    URLS:

     {
        venta: URL+ "/servicios/principales/factura/venta/consultarVenta.php",
        compra: URL+ "/servicios/principales/factura/compra/consultarCompra.php",
        buscarCompra: URL+ "/servicios/principales/factura/compra/buscarCompra.php",
        buscarVenta: URL+ "/servicios/principales/factura/venta/buscarVenta.php",
        buscarPresupuesto:URL+ "/servicios/principales/factura/presupuesto/buscarPresupuesto.php", 
        presupuesto: URL+ "/servicios/principales/factura/presupuesto/getPresupuesto.php",
        tipo_factura : URL +"/servicios/principales/factura/tipo_factura/consultaTipoFactura.php",
        cliente : URL + "/servicios/principales/cliente/buscarCliente.php",
        buscarProducto: URL+"/servicios/principales/inventario/producto/buscar.php",
        buscarById: URL+"/servicios/principales/inventario/producto/buscarById.php",
        
        
     }   
    ,
    
};
export const getFacturas = ()=>{



    contenidoFactura(param);
    
};