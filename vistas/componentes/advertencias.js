import {fondoOscuro} from "../../vistas/componentes/fondoOscuro.js";
export const advertencias = ()=>{
    const div = document.createElement("div");
    div.classList.add("advertencias");
    div.innerHTML=`
    <style>
    .advertencias{
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.82);
        justify-content: center;
        align-items: center;
        text-align: center;
        position: fixed;
        top: 0;
        display: flex;
        }
    .div-alert{
        padding: 1rem;
        width: 490px;
        height: 130px;
        background: rgba(255, 0, 0, 0.22);
        border-radius: 10px;
        border: 4px solid red;
        box-shadow: 0 0 8px rgba(255, 0, 0, 0.7);
        animation: parpadeo-borde 1s infinite;
        }
        
    @keyframes parpadeo-borde {
      0%   { border-color: red; }
      50%  { border-color: transparent; }
      100% { border-color: red; }
    }
    h1 {
        color:white;
        text-align: center;
        font-size: 20px; 
        font-family: Arial, Helvetica, Thomas, sans-serif;
        }
    #btnEliminar,#btnCancelar {
        width: 100px;
        height: 35px; 
        aling-items: center;
        background-color: rgba(0, 0, 0, 0.53);
        font-family: Arial, Helvetica, Thomas, sans-serif;
        }
    #btnEliminar:hover,#btnCancelar:hover {
        background-color: rgba(255, 0, 0, 0.53);
        color: white;
        cursor: pointer;
        }
    #btnCancelar:hover{
    background-color: rgba(0, 145, 255, 0.53);
    }
    </style>
    <div class="div-alert"><h1>⚠️¿Estas seguro de eliminar este producto?⚠️</h1>
        <div style="display: flex;justify-content: space-around; margin-top: 2rem;">
            <button id="btnCancelar">Cancelar</button>
            <button id="btnEliminar">Eliminar</button>
        </div>
    </div>
    `;

    return fondoOscuro(div);
    
}