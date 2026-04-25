import { FondoOscuro } from "../../../vistas/componentes/fondoOscuro.js";
import { crearPagos } from "../vista/opcionesDePagos.js";

export const getOpcionesDePagos = (div,objeto)=>{

    
    const coeficienteDebito = 5
    const data = {
    total: objeto.total,
    Tarjetas: [
        { id: 1, descripcion: "Visa", coeficientes: { 1: 5, 3: 30 } },
        { id: 2, descripcion: "Mastercard", coeficientes: { 1: 5, 3: 30} },
        { id: 2, descripcion: "Naranja", coeficientes: { 1: 5, 3: 20} },
        { id: 2, descripcion: "Tuya", coeficientes: { 1: 5, 3: 20} }
    ]
};

    const button = div.querySelector("#btnMasPagos");
    button.addEventListener("click",(e)=>{
        
        const fondoOscuro = new FondoOscuro(crearPagos(data,objeto,div, coeficienteDebito ));
        document.body.append(fondoOscuro.div);
    })

}


export function crearPagoDB(pago) {
    return {
        fecha: new Date().toISOString().split('T')[0],  // fecha actual en formato YYYY-MM-DD
        id_tipo_pago: pago.id_tipo_pago,                // ya viene del JSON de crearPagos
        monto: pago.monto,
        monto_final: pago.monto_final || pago.monto     // si no tiene recargo, toma el monto normal
    };
}


export const crearTablaPagos = (json,div)=>{
    console.log(json);
    console.log(div.querySelector(".contenido-pagos"));
    const contenidoPagos = div.querySelector(".contenido-pagos");
    contenidoPagos.innerHTML = "";
    const table = document.createElement("table");
    const strong = document.createElement("strong");
    strong.innerHTML = `
        <p>Recarglo por tarjeta credito: ${(json.total- json.totalMontoFinal).toFixed(2)} </p>       
        <p>Monto Final: ${json.totalMontoFinal.toFixed(2)}</p>
            
    ` 
    table.innerHTML = `
            <thead>
                <tr>
                    <th>Descripción</th>
                    <th>Monto</th>
                </tr>
            </thead>
            <tbody>
                ${json.pagos.map(p=>`<tr><td>${p.descripcion}</td><td>${p.monto_final??p.monto}</td></tr>`).join("")}
            </tbody>`
    div.querySelector(".totalAPagar").innerHTML =`Total a pagar: $${json.totalMontoFinal}`
    contenidoPagos.append(table,strong);
    
}


