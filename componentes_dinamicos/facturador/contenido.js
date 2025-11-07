import { factura } from "./vista/factura.js"

export const contenidoFacturador = () => {
    document.getElementById("contenido").append(factura());

}