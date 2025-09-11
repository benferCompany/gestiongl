import { contenido } from "../../../../componentes_dinamicos/formulario/contenido.js";
import { crearFormulario } from "../../../../componentes_dinamicos/formulario/controlador/crear.js";
import { eventoSubmit } from "../../../../componentes_dinamicos/formulario/controlador/editar.js";
import { URL } from "../../../../controladores/url/url.js";

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
        editar: URL + "/servicios/principales/inventario/producto/editar.php",
        crear: URL + "/servicios/principales/inventario/producto/crear.php",
        mostrar: URL + "/servicios/principales/inventario/producto/consulta.php",
        eliminar: URL + "/servicios/principales/inventario/producto/eliminar.php",
        buscar: URL + "/servicios/principales/inventario/producto/buscar.php"
    },
    contenido: document.getElementById("contenido"),
    texto: "",
    eventos: { editar: eventoSubmit, crear: crearFormulario }


}


export const contenidoProducto = () => {

    contenido(json);
}