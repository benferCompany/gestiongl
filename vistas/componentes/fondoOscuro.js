import { observarCambios } from "../../controladores/hooks.js";





export const fondoOscuro = (contenido) => {
    const div = document.createElement("div");
     observarCambios(document.body,avisarCambio)

    contenido.classList.add("webkitScroll")
    div.id = "fondoOscuro"
    div.style = `width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.5);
        position: fixed;
        top: 0;
        justify-content: center;
        align-items: center;
        text-align: center;
        position: fixed;
        display: flex;
        overflow: auto;
    `
    div.appendChild(contenido);
    const style = document.createElement("style");

    style.innerHTML = `
    
        .webkitScroll{
         overflow:auto;
        }
    `
    contenido.style.scrollbarColor = "grey black";

    contenido.append(style);


    div.addEventListener("click", (e)=>{
        if(e.target.id =="fondoOscuro")
            e.target.remove()
    })

    return div;
}





export const fondoOscuroSinEsc = (contenido) => {
    const div = document.createElement("div");
     observarCambios(document.body,avisarCambio)

    contenido.classList.add("webkitScroll")
    div.id = "fondoOscuroSinEsc"
    div.style = `width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.5);
        position: fixed;
        top: 0;
        justify-content: center;
        align-items: center;
        text-align: center;
        position: fixed;
        display: flex;
        overflow: auto;
    `
    div.appendChild(contenido);
    const style = document.createElement("style");

    style.innerHTML = `
    
        .webkitScroll{
         overflow:auto;
        }
    `
    contenido.style.scrollbarColor = "grey black";

    contenido.append(style);


    return div;
}




function avisarCambio(mutation) {
        
    const body = document.body;
    if(body.querySelector("#fondoOscuro")){
        body.style.overflow ="hidden";
    }else{
        body.style.overflow ="auto";
    }
}