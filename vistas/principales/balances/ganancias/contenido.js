import { GananciasApp } from "../../../../componentes_dinamicos/balances/cierreDeCaja/vista/GananciasApp.js"

export const contenidoGanancia = ()=>{
    const contenido = document.getElementById("contenido");
    const ganancia = new GananciasApp(contenido);

}