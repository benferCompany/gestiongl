import { contenido } from "../../../../componentes_dinamicos/formulario/contenido.js";
import { crearFormulario } from "../../../../componentes_dinamicos/formulario/controlador/crear.js";
import { eventoSubmit } from "../../../../componentes_dinamicos/formulario/controlador/editar.js";
import { URL } from "../../../../controladores/url/url.js";


const json = {
    content: [
        { header: "Id", name: "id", type: "number" },
        { header: "Nombre", name: "nombre", type: "text" },
        { header: "Apellido", name: "apellido", type: "text" },
        { header: "CUIT", name: "cuit", type: "text" },
        { header: "Dirección", name: "direccion", type: "text" },
        { header: "Teléfono", name: "telefono", type: "text" }
    ],

    data: {},

    URLS:
    {
        editar: URL + "/servicios/principales/cliente/editarCliente.php",
        crear: URL + "/servicios/principales/cliente/crearCliente.php",
        mostrar: URL + "/servicios/principales/cliente/mostrarCliente.php",
        eliminar: URL + "/servicios/principales/cliente/eliminarCliente.php",
        buscar: URL + "/servicios/principales/cliente/buscarCliente.php"
    },
    contenido: document.getElementById("contenido"),
    texto: "",
    eventos: {editar:eventoSubmit, crear:crearFormulario}


}

export const contenidoCliente = () => {
    const div = document.createElement("div");
    contenido(json)
    return div;
}