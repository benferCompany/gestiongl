import { loading } from "../../../vistas/componentes/loading.js";
import { obtenerTbody } from "./tablaControlador.js";

export const buscarDatosPorTexto = (e) => {
    e.preventDefault();
   
    consultaPorTexto(e.target, e)
}



const consultaPorTexto = async (form, e) => {
    try {
        const objet = e.target.object;
        loading(true)
       
         let url = verificarSearch(form)?objet.URLS.buscar:objet.URLS.mostrar;
        const formulario = new FormData(form);
        const response = await fetch(url, {
            method: "POST",
            body: formulario
        })
        const responseJson = await response.json();
        if (responseJson.status == "success") {
            const table =objet.contenido.querySelector("table");
            objet.data = responseJson;
            const tbody = await obtenerTbody(objet);
            table.querySelector("tbody").replaceWith(tbody)
            loading(false);
            return responseJson;
        } else {
            console.error(responseJson.message)
        }

    } catch (error) {
        console.error(error);
    }
}




function verificarSearch(formulario) {
    const input = formulario.querySelector('input[name="search"]');
    
    if (input && input.value.trim() !== "") {
        console.log("El input tiene valor:", input.value);
        return true;
    } else {
        console.log("El input está vacío");
        return false;
    }
}