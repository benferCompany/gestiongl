import { getFacturas } from "../../../../controlador/controlador.js";
import { tablaFacturas } from "../tabla.js";

export const cargarTabla=async(param)=>{
    const table = param.div.querySelector("table");
    if (!table) return;

    const th = table.querySelector("th:nth-child(3)");
    if (th) th.textContent = param.select.value;

    await cargarFacturas(param);

    table.replaceWith(tablaFacturas(param));

}



export const cargarFacturas = async (param) => {
        param.selectValue = param.select? param.select.value:"Cliente"
        const { data } = await getFacturas(param);
        param.factura = data;
        return data;
};