import { factura } from "./vista/factura.js"

export const contenidoFacturador = (param) => {
    const contenido = document.getElementById("contenido");
    
    
    contenido.append(factura(param));

}