import { eliminarDatosPorId } from "../../hooks.js";
import { URL } from "../../url/url.js";
import { consultarProducto } from "./consulta.js";

export const eliminarProducto=async(parametro)=>{
    const idProducto =parametro.parentNode.parentNode.children[0].innerText 
    console.log(idProducto);

    console.log(await eliminarDatosPorId(URL+"/servicios/principales/producto/eliminar.php",idProducto))
    consultarProducto(document.getElementById("tbodyProducto"))

}
