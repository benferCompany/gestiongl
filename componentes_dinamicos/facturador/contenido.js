import { factura } from "./vista/factura.js"

export const contenidoFacturador = (param) => {
    document.getElementById("contenido").append(factura(param));

}