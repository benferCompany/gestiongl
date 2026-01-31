import { consulta } from "../../../controladores/hooks.js";
import { fondoOscuro } from "../../../vistas/componentes/fondoOscuro.js";
import { loading } from "../../../vistas/componentes/loading.js";
import { trAJson } from "../../tools/tools.js";
import { formulario } from "../vista/formulario.js";
import { obtenerTbody } from "./tablaControlador.js";

export const editar = (e, json) => {
    json.content = trAJson(e.closest("tr"), json)
    const form = formulario(json);

    json.contenido.append(fondoOscuro(form))



}


export const eventoSubmit = async (e) => {
    loading(true);
    e.preventDefault();
    const json = e.target.objeto;
    const datos = new FormData(e.target);
    const inputsSelect = e.target.querySelectorAll("input[data-tipo='select']");
    inputsSelect.forEach(i => {
        const valor = i.value.split(" ")[0];
        datos.set(i.name, valor);
    });
    const url = json.URLS.editar;
    

    try {
        const response = await fetch(url, {
            method: "POST",
            body: datos
        })
        const jsonResponse = await response.json();
        if (jsonResponse.status == "success") {
           
            const contenido = document.getElementById("contenido")
            json.contenido = contenido;
            json.data = await consulta(json.URLS.mostrar)
            const tbody = await obtenerTbody(json)
            const table = contenido.querySelector("table");
            table.querySelector("tbody").replaceWith(tbody)

        } else {
            console.error(jsonResponse.message);
        }

        const fondoOscuro = document.getElementById("fondoOscuro");
        if (fondoOscuro) {
            fondoOscuro.remove();
        }


        loading(false)

    } catch (error) {
        console.error(error);
    }
}





