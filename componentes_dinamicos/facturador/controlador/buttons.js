import { select } from "../../select/select.js"
import {fondoOscuro} from "../../../vistas/componentes/fondoOscuro.js";
export const buttonAgregar = (param)=>{
    
    document.getElementById("contenido").append(fondoOscuro(select(param)))
    
}