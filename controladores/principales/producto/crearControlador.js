import { fadeInFadeOut } from "../../hooks.js";
import { URL } from "../../url/url.js";

export const submitCrearProd = async (form) => {
    let mensaje = "";
    const formulario = new FormData(form);
    console.log(form.elements["descripcion"].value);
    
    if (form.elements["id_producto"].value == "" || form.elements["descripcion"].value == "" || form.elements["costo"].value == "" || form.elements["pvp"].value == "") {
        console.log("es")
        mensaje = {mensaje: "Debes llenar todo los campos", color:"red"}
    } else {

        try {
            const response = await fetch(URL+"/servicios/principales/producto/crear.php", {
                method: "POST",
                body: formulario
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            mensaje = {mensaje: "Se creó exitosamente", color:"blue"}
        
        } catch (error) {
            console.error("Error en la consulta:", error);
            return null; // o lanzar el error si preferís
        }
    }
    const mensajeCrearProducto = document.getElementById("mensaje-crear-producto");

    mensajeCrearProducto.innerHTML = `
    <style>
        .h1 {
            width: 220px;
            height: 100px;
            background-color: ${mensaje.color};  
            opacity: 0;   
            transition: opacity 0.5s ease;
            text-align: center;
            color: whitesmoke;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            border-radius: 10px;
        }   

        .visible {
            opacity: 1;
        }
    </style>

    <h1 class="h1" id="mensaje">${mensaje.mensaje}</h1>
`;

    // Para activar la transición
    const h1 = mensajeCrearProducto.querySelector('#mensaje');
    fadeInFadeOut(h1,10,2000)

}


