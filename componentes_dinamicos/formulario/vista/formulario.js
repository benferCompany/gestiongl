import { formularioCss } from "../../../vistas/styles/formulario.js";
import { jsSelectInputCliente } from "../../select/controlador/jsSelectInput.js";


export const formulario = (parametros) => {
    const formulario = document.createElement("form");
    formulario.className = "formulario";
    formulario.objeto = parametros;
    formulario.id = "formularioId";
    let content = parametros.content
    let evento = parametros.eventos.editar;
    const booleanForm = parametros.content.some(obj => "value" in obj);
    console.log(booleanForm)
    if (booleanForm) {

    } else {
        evento = parametros.eventos.crear;
        content = parametros.content.filter(item => item.name !== "id");
    }

    formulario.innerHTML = `
    
    
    ${formularioCss(".formulario")}
        
        ${content.map(e => {
        
        return `
            <label>${e.header}</label>
            <input data-llave="${e.llaveMostrar}" data-tipo="${e.tipo}" data-accion="${e.accion}" required type="${e.type}" value="${e.value ? e.value : ""}" name="${e.name}"/>`


    }).join('<br><br>')}

                <br><br>
                <input type="submit" value="Enviar"><br><br>
            
            `;

    formulario.addEventListener("submit", evento);


    const inputs = formulario.querySelectorAll("input");

    inputs.forEach(async i => {
        if (i.getAttribute("data-tipo") ==="select") {
            console.log(i.getAttribute("data-accion"))
            parametros.llaveDescripcion = i.name
            parametros.contentSelect = i
            parametros.llaveMostrar = i.dataset.llave;
            parametros.URLBuscar = await parametros.URLS[i.getAttribute("data-accion")]
            i.addEventListener("input",() => {
                    console.log(i);          
                    jsSelectInputCliente(i, parametros.URLS[i.getAttribute("data-accion")]);
                })
        }
    })
    formulario.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
        }
    });
    
    return formulario;
}


