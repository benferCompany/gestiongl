import { advertencias } from "../../../vistas/componentes/advertencias.js";
import { trAJson } from "../../tools/tools.js";
import { obtenerTbody } from "./tablaControlador.js";

export const eliminarData = (e, json) => {
    console.log(json)
    console.log(e.closest("tr"));
    const tr = e.closest("tr");

    const data = trAJson(tr, json)
    data.forEach(element => {
        if (element.name == "id") {
            const param = {
                mensaje: "Estas seguro que quieres eliminar el proveedor",
                action: (e) => { eliminarSQL({ id: element.value }, json) },
                id: element.value

            }
            json.contenido.append(advertencias(param))

        }
    });

}


const eliminarSQL = async (id, json) => {
    try {
        console.log(json)

        const response = await fetch(json.URLS.eliminar, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(id)
        })

        const responseJson = await response.json();

        if (responseJson.status == "success") {

            const table = json.contenido.querySelector("table");
            json.data.data = json.data.data.filter(dt => dt.id != id.id);
            const tbody = await obtenerTbody(json);
            console.log(tbody)
            table.querySelector("tbody").replaceWith(tbody)
            console.log("El producto se elimino con éxito")
        } else {
            console.log(responseJson.message);
        }
    } catch (error) {
        console.error(error);
    }
}