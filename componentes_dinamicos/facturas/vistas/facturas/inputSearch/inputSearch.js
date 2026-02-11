import {cargarTabla } from "../tabla/controlador/controlador.js";
import { buscar } from "./controlador.js";

export const inputSearch = (param)=>{
    const div =document.createElement("div");
    div.id="inputSearch";
    
    div.innerHTML=`
    
        <input type='search'placeholder='Buscar'/>
        
        `

    div.querySelector("input").addEventListener("input",async(e)=>{
        e.target.value = e.target.value.replace(/^\s+/, "");
        param.inputSearch = div.querySelector("input");
        if(e.target.value =="") {
            cargarTabla(param)
        };
        buscar(param);
        
    })
    return div; 
}


