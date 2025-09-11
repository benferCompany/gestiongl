import { formulario } from "./vista/formulario.js";
import { table } from "./vista/tabla.js";




export const contenido = async (json) => {
    const div = document.createElement("div");
    
    div.style = `
        display: flex;
        flex-wrap: wrap;
    
    `
   
 
    console.log()
    
    div.append(formulario(json))
    div.append(await table(json))
    json.contenido.append(div);
     div.childNodes.forEach(e=>e.style="flex-basis:200; margin:1em;")
 
}