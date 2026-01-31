import { buscar } from "./controlador.js";

export const inputSearch = (param)=>{
    const div =document.createElement("div");
    div.id="inputSearch";
    
    div.innerHTML=`
        <style>
            
            #inputSearch input{
                width:50%;
                padding:1em;
                margin: 0 1em 0em 1em;
                font-size:1em;
            }
        </style>
        <input type='search'placeholder='Buscar'/>
        
        `

    div.querySelector("input").addEventListener("input",()=>{
        buscar(param);
        
    })
    return div;
}