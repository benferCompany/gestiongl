import { fondoOscuro } from "../../vistas/componentes/fondoOscuro.js";

export const advertencias = (param) => {
    const div = document.createElement("div");
    div.style = `
        padding: 2rem;
        width: 480px;
        background: linear-gradient(145deg, #1f1a1a 0%, #2d1e1e 100%);
        border-radius: 20px;
        border: 1px solid rgba(255, 80, 80, 0.3);
        box-shadow: 0 25px 50px -12px rgba(255, 0, 0, 0.5);
        animation: fadeIn 0.3s ease;
    `;
    div.classList.add("advertencias");
    div.innerHTML = `
    <style>
        @keyframes fadeIn {
            from {
                opacity: 0;
                transform: scale(0.95);
            }
            to {
                opacity: 1;
                transform: scale(1);
            }
        }
        
        h1 {
            color: #ffb3b3;
            text-align: center;
            font-size: 1.3rem;
            font-weight: 500;
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            margin: 0 0 2rem 0;
            letter-spacing: 0.3px;
            text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }
        
        .button-group {
            display: flex;
            justify-content: center;
            gap: 1.2rem;
            margin-top: 1.8rem;
        }
        
        #btnEliminar, #btnCancelar {
            width: 120px;
            height: 44px;
            border: none;
            border-radius: 12px;
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            font-size: 0.95rem;
            font-weight: 500;
            letter-spacing: 0.3px;
            cursor: pointer;
            transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
            box-shadow: 0 4px 6px -2px rgba(0, 0, 0, 0.3);
        }
        
        #btnEliminar {
            background: linear-gradient(145deg, #b91c1c, #991b1b);
            color: #ffffff;
            border: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        #btnCancelar {
            background: linear-gradient(145deg, #374151, #1f2937);
            color: #f3f4f6;
            border: 1px solid rgba(255, 255, 255, 0.05);
        }
        
        #btnEliminar:hover {
            background: linear-gradient(145deg, #991b1b, #7f1d1d);
            transform: translateY(-2px);
            box-shadow: 0 10px 15px -3px rgba(185, 28, 28, 0.3);
        }
        
        #btnCancelar:hover {
            background: linear-gradient(145deg, #1f2937, #111827);
            transform: translateY(-2px);
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.4);
        }
        
        #btnEliminar:active, #btnCancelar:active {
            transform: translateY(1px);
            box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.3);
        }
    </style>
    
    <div class="div-alert">
        <h1>⚠️ ${param.mensaje} ⚠️</h1>
        <div class="button-group">
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
        param.action(param.id);
        div.parentNode.remove();
    });

    return fondoOscuro(div);
};