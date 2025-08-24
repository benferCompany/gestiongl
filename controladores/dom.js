import { consultarProducto } from "./principales/producto/consulta.js"
import { submitCrearProd } from "./principales/producto/crear.js";


window.addEventListener("DOMContentLoaded",async()=>{
       
    const formCrearProd = document.getElementById("formCrearProd");
    formCrearProd.addEventListener("submit",async(e)=>{
        e.preventDefault()
        submitCrearProd(formCrearProd)
        consultarProducto()
    });
    
    await consultarProducto()
        
})





