
import { debounce } from "../../../../tools/tools.js";
import { tablaFacturas } from "../tabla/tabla.js";

export const buscar=debounce(async(param)=>{
    
    param.body = {search:param.div.querySelector("#inputSearch input").value}
    if(!param.body.search){
       
        return;
    };
    let select = param.selectValue =="compra"? "buscarCompra":param.selectValue=="presupuesto"?"buscarPresupuesto":"buscarVenta";
    param.URL = param.URLS[select];
   
    const factura=  await buscarPorTexto(param)
    if(factura.status ==="success"){

        param.factura = factura.data;
        
        cargarTablaPorBusqueda(param);
    }else return;
   
    },300);



const buscarPorTexto = async (param) => {
   
    try {
        const response = await fetch(param.URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(param.body)
        });

        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }

        const json = await response.json();
        console.log(json)
        return json;

    } catch (e) {
        console.error(e);
    }
};




export const cargarTablaPorBusqueda=async(param)=>{
    const table = param.div.querySelector("table");
    if (!table) return;
    
    const th = table.querySelector("th:nth-child(3)");
    if (th) th.textContent = param.select.value;
    table.replaceWith(tablaFacturas(param));

}


