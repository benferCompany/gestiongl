import { factura } from "./vistas/facturas/facturas.js";

export const contenidoFactura= async(param)=>{
    
    document.getElementById("contenido").appendChild(await factura(param));
}



