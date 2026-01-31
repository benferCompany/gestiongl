import { advertencias } from "../../../vistas/componentes/advertencias.js";
import { trAJson } from "../../tools/tools.js";
import { obtenerTbody } from "./tablaControlador.js";

export const eliminarData = (e, json) => {
    const tr = e.closest("tr");
    const data = trAJson(tr, json)
    console.log(data);
    data.forEach(element => {
        if (element.name == "id") {
            const param = {
                mensaje: 
                    json.mensajes.eliminar? 
                        json.mensajes.eliminar:"Estas seguro que quieres eliminar el proveedor",
                
                        action: (e) => { eliminarSQL({ id: element.value }, json) },
                id: element.value

            }
            json.contenido.append(advertencias(param))

        }
    });

}


const eliminarSQL = async (id, json) => {
    try {
      
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
            table.querySelector("tbody").replaceWith(tbody)
            console.info("El producto se elimino con éxito")
        } else {
            console.error(responseJson.message);
        }
    } catch (error) {
        console.error(error);
    }
}