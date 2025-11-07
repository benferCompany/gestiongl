
import { contenido } from "../../../../componentes_dinamicos/formulario/contenido.js";
import { crearFormulario } from "../../../../componentes_dinamicos/formulario/controlador/crear.js";
import { eventoSubmit } from "../../../../componentes_dinamicos/formulario/controlador/editar.js";
import { URL } from "../../../../controladores/url/url.js"
const json = {
    content: [
        { header: "Id", name: "id", type: "number" },
        { header: "Nombre de contacto", name: "nombre_contacto", type: "text" },
        { header: "Dirección", name: "direccion", type: "text" },
        { header: "Razón Social", name: "razon_social", type: "text" },
        { header: "CUIT", name: "cuit", type: "text" },
        { header: "Teléfono", name: "telefono", type: "text" }
    ],

    data: {},

    URLS:
    {
        editar: URL + "/servicios/principales/proveedor/editarProveedor.php",
        crear: URL + "/servicios/principales/proveedor/crearProveedor.php",
        mostrar: URL + "/servicios/principales/proveedor/mostrarProveedor.php",
        eliminar: URL + "/servicios/principales/proveedor/eliminarProveedor.php",
        buscar: URL + "/servicios/principales/proveedor/buscarProveedor.php"
    },
    contenido: document.getElementById("contenido"),
    texto: "",
    eventos: {editar:eventoSubmit, crear:crearFormulario}


}



export const contenidoProveedor = () => {
    
   return contenido(json)

}


