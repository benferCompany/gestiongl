import { inputSearch } from "./inputSearch/inputSearch.js";
import { selectFacturas } from "./select/select.js";
import { tablaFacturas } from "./tabla/tabla.js";

export const factura = async (param) => {
    const div = document.createElement("div");
    div.id="facturas-contenido";
    param.idFactura = div.id;
    param.div = div;
    //Obtener el select de facturas
    const select = await selectFacturas(param);
    div.appendChild(select);
    param.select = select;

    //Obtener el input de facturas
    const input = inputSearch(param);
    div.appendChild(input);
    
    //Obtener la tabla de facturas
    const table = tablaFacturas(param);
    div.appendChild(table);

    return div;
}