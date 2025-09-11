import { fondoOscuro } from "../../vistas/componentes/fondoOscuro.js";
export const advertencias = (param) => {
    const div = document.createElement("div");
    div.style = ` 
        padding: 1rem;
        width: 490px;
        height: 130px;
        background: rgba(100, 12, 12, 0.84);
        border-radius: 10px;
        border: 4px solid red;
        box-shadow: 0 0 8px rgba(255, 0, 0, 0.7);
        animation: parpadeo-borde 1s infinite;`
    div.classList.add("advertencias");
    div.innerHTML = `
    <style>
  
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
    <div class="div-alert"><h1>⚠️${param.mensaje}⚠️</h1>
        <div style="display: flex;justify-content: space-around; margin-top: 2rem;">
            <button id="btnCancelar">Cancelar</button>
            <button id="btnEliminar">Eliminar</button>
        </div>
    </div>
    `;

    const btnCancelar = div.querySelector("#btnCancelar");
    const btnEliminar = div.querySelector("#btnEliminar");

    btnCancelar.addEventListener("click", async () => {
        div.parentNode.remove();
    });
    btnEliminar.addEventListener("click", async function (e) {


        param.action(param.id); // primero ejecuta la acción
        div.parentNode.remove()

    })
    return fondoOscuro(div);

}


