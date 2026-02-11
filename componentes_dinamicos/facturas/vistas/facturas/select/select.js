
import { cargarFacturas, cargarTabla } from "../tabla/controlador/controlador.js";

export const selectFacturas = async (param) => {

    
    // carga inicial
    await cargarFacturas(param);
    

    const select = document.createElement("select");
    select.value = "presupuesto";
    select.innerHTML = `
        
        <option value="presupuesto">Presupuesto</option>
        <option value="venta">Facturas Ventas</option>
        <option value="compra">Facturas Compras</option>
    `;

    select.addEventListener("change", async () => {
        cargarTabla(param);
        param.inputSearch?param.inputSearch.value="":"";
    });

    return select;
};
