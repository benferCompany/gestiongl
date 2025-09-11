import { editar } from "./editar.js";
import { eliminarData } from "./eliminar.js";

export const obtenerTbody = async (json) => {
    const tbody = document.createElement("tbody");
    if (json.data.data) {

        json.data.data.forEach(e => {
            let tr = document.createElement("tr");
            json.content.forEach(content => {
                tr.innerHTML += `<td>${e[content.name]}</td>`;
            });
            const td = document.createElement("td");
            td.innerHTML = `<button class="btnEditar"><i class="fas fa-pencil-alt"></i></button>
                        <button class="btnEliminar"><i class="fas fa-trash"></i></button>`
            td.classList.add("td-btn");
            tr.appendChild(td);
            tbody.appendChild(tr);
        });
        const botones = tbody.querySelectorAll("button");
        botones.forEach(b => {
            b.addEventListener("click", (e) => { eventoBotones(e, json) });
        })
    }

    return tbody;

}


const consulta = async (URL) => {
    try {

        const response = await fetch(URL);
        const json = await response.json();


        if (json.status == "success") {

            return json;
        } else {
            console.error(json.message);
        }


    } catch (error) {
        console.error(error);
    }
}


export const eventoBotones = (e, json) => {
    const button = e.target.closest("button");
    if (button.className == "btnEliminar") {
        eliminarData(button, json);
    } else if (button.className == "btnEditar") {
        editar(button, json)
    }


}