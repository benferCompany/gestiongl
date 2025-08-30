import { consultarProducto } from "../../../controladores/principales/producto/consulta.js";
import { enviarFormularioEditar } from "../../../controladores/principales/producto/editarControlador.js";
import { fondoOscuro } from "../../componentes/fondoOscuro.js";

export const editProd = async function(producto) {
    
    const form = document.createElement("form");
    form.innerHTML = `
    <style>
       spam {
            cursor: pointer;
            color:whitesmoke;
            margin-left: 7px;
       }
    </style>
        <spam>ID: ${producto.id_producto}</spam> <br><br>
        <label for="">Descripción</label><br>
        <input value="${producto.descripcion}" type="text" name="descripcion" autocomplete="off"  required><br><br>
        <label for="">Costo</label><br>
        <input autocomplete="off" value="${producto.costo}" type="number" name="costo" required><br><br>
        <label for="">PVP</label><br>
        <input value="${producto.pvp}" type="number" name="pvp"  required><br><br>
        <input autocomplete="off" style="display:none" value="${producto.id_producto}" type="text" name="id_producto"  required>
        <input type="submit" value="Cargar">

        
    `;
    form.addEventListener("submit", async function(e) {
        e.preventDefault();
        const formulario = new FormData(form); 
        console.log(await enviarFormularioEditar(formulario));
        consultarProducto(document.getElementById("tbodyProducto"))
        form.parentNode.remove();
    });

    form.addEventListener("keyup",(e)=>{
        console.log(e.code)
        if(e.code ==="Escape"){
            form.parentNode.remove();
        }

    })

    // Agrega el formulario al DOM
    document.body.appendChild(fondoOscuro(form))
    returnFocus(form)
}



const returnFocus = (form) => {
    const firstInput = form.querySelector("input"); // primer input
    if (firstInput) {
        firstInput.focus();
    }
};




