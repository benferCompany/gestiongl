import { contenido } from "../../../../componentes_dinamicos/formulario/contenido.js";
import { crearFormulario } from "../../../../componentes_dinamicos/formulario/controlador/crear.js";
import { eventoSubmit } from "../../../../componentes_dinamicos/formulario/controlador/editar.js";
import { URL } from "../../../../controladores/url/url.js";


const json = {
    content: [
        { header: "Id", name: "id" },
        { header: "Nombre", name: "nombre" },
        { header: "Apellido", name: "apellido" },
        { header: "CUIT", name: "cuit" },
        { header: "Dirección", name: "direccion" },
        { header: "Teléfono", name: "telefono" }
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