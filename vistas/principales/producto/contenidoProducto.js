import { URL } from "../../../controladores/url/url.js"
import { contenido } from "../../../componentes_dinamicos/formulario/contenido.js";
import { crearFormulario } from "../../../componentes_dinamicos/formulario/controlador/crear.js";
import { eventoSubmit } from "../../../componentes_dinamicos/formulario/controlador/editar.js";
const json = {
    content: [
        { header: "Id", name: "id" },
        { header: "Id de Producto", name: "id_producto" },
        { header: "Descripción", name: "descripcion" },
        { header: "Costo", name: "costo" },
        { header: "PVP", name: "pvp" }

    ],

    data: {},

    URLS:
    {
        editar: URL + "/servicios/principales/producto/editar.php",
        crear: URL + "/servicios/principales/producto/crear.php",
        mostrar: URL + "/servicios/principales/producto/consulta.php",
        eliminar: URL + "/servicios/principales/producto/eliminar.php",
        buscar: URL + "/servicios/principales/producto/buscar.php"
    },
    contenido: document.getElementById("contenido"),
    texto: "",
    eventos: { editar: eventoSubmit, crear: crearFormulario }


}


export const contenidoProducto = () => {

    contenido(json);
}