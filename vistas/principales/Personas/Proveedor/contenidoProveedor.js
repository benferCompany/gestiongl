
import { contenido } from "../../../../componentes_dinamicos/formulario/contenido.js";
import { crearFormulario } from "../../../../componentes_dinamicos/formulario/controlador/crear.js";
import { eventoSubmit } from "../../../../componentes_dinamicos/formulario/controlador/editar.js";
import { URL } from "../../../../controladores/url/url.js"
const json = {
    content: [
        { header: "Id", name: "id" },
        { header: "Nombre de contacto", name: "nombre_contacto" },
        { header: "Dirección", name: "direccion" },
        { header: "Razón Social", name: "razon_social" },
        { header: "CUIT", name: "cuit" },
        { header: "Teléfono", name: "telefono" }
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


