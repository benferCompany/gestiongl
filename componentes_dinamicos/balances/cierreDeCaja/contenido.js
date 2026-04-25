import { FacturaVenta } from "../../../controladores/DTOS/Factura/venta/FacturaVenta.js";
import { CierreCajaApp } from "./vista/cierreCajaApp.js";
import { GananciasApp } from "./vista/GananciasApp.js";


export const getCierreDeCaja = async()=>{
    const contenido = document.getElementById("contenido");
    const cierre = new CierreCajaApp(contenido);
     
}