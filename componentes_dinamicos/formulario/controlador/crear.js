import { mostrarAlerta } from "../../../vistas/componentes/alertas.js";
import { loading } from "../../../vistas/componentes/loading.js";
import { obtenerTbody } from "./tablaControlador.js";

export const crearFormulario = (e) => {
    e.preventDefault();
    crear(e);
}


export const crear = async (e) => {
    const param = {
        color: "whitesmoke",
        background: "rgba(211, 27, 27, 1)",
        mensaje: "El id ya esta en uso, porfavor use otro."
    }

    try {

        loading(true);
        const formulario = new FormData(e.target);
        const objeto = e.target.objeto;
        const response = await fetch(objeto.URLS.crear, {
            method: "POST",
            body: formulario
        });
        const responseJson = await response.json();

        if (responseJson.status == "success") {

            
            const table = objeto.contenido.querySelector("table");
            objeto.data.data.push(responseJson.data);
            const tbody = await obtenerTbody(objeto);
            table.querySelector("tbody").replaceWith(tbody)
            
            param.background = "green";
            param.mensaje ="Se creó con éxito";
            mostrarAlerta(param)

        } else {
            const error = "SQLSTATE[23000]: Integrity constraint violation: 1062 Duplicate entry '123' for key 'id_producto'";
            if (error == responseJson.error) {

                
                mostrarAlerta(param)
                console.error("Ese cógido ya esta en uso, por favor use otro.");
            }else{
                param.mensaje = responseJson.message;
                mostrarAlerta(param)
            }
            

        }
        loading(false);
    } catch (error) {
        console.error(error);
        loading(false);
    }
}