
import { cargarFacturas, cargarTabla } from "../tabla/controlador/controlador.js";

export const selectFacturas = async (param) => {


    // carga inicial
    await cargarFacturas(param);

    const select = document.createElement("select");
    select.innerHTML = `
        <style>
            #${param.div.id} select{
                width:50%;
                padding:1em;
                margin:1em;
                font-size:1em;
            }
        
        </style>
        <option value="Cliente">Facturas Ventas</option>
        <option value="Proveedor">Facturas Compras</option>
    `;

    select.addEventListener("change", async () => {
        cargarTabla(param);
    });

    return select;
};
