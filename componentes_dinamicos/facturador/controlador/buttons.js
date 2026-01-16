import { select } from "../../select/select.js"
import {fondoOscuro} from "../../../vistas/componentes/fondoOscuro.js";
export const buttonAgregar = (param)=>{    
    const contenido =document.getElementById("contenido");
    contenido.append(fondoOscuro(select(param)))    
    contenido.querySelector("#select").querySelector("input").focus()    
        
}    