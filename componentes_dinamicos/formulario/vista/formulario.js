import { formularioCss } from "../../../vistas/styles/formulario.js";


export const formulario = (parametros) => {
    const formulario = document.createElement("form");
    formulario.className = "formulario";
    formulario.objeto = parametros;
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
   
        ${content.map(e => `<label>${e.header}</label> 
            <input required type="${e.type}" value="${e.value ? e.value : ""}" name="${e.name}"/>`).join('<br><br>')}  
        <br><br>
        <input type="submit" value="Enviar"><br><br>
    
    `;

    formulario.addEventListener("submit", evento);

    return formulario;
}


