import { advertencias } from "../../../vistas/componentes/advertencias.js";
import { eliminarDatosPorId } from "../../hooks.js";
import { URL } from "../../url/url.js";
import { consultarProducto } from "./consulta.js";

export const eliminarProducto = async (parametro) => {
    const idProducto = parametro.parentNode.parentNode.children[0].innerText
    const param = {
        id: idProducto,
        action: eliminar,
        mensaje: "¿Estas seguro de eliminar este producto?"
    }

    document.body.appendChild(advertencias(param));
}

const eliminar = async (idProducto) => {
    console.log(await eliminarDatosPorId(URL + "/servicios/principales/producto/eliminar.php", idProducto))
    consultarProducto(document.getElementById("tbodyProducto"))
}
