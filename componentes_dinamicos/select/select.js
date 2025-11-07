import { consultaSelect } from "./controlador/consultaSelect.js";
import { debounce } from "../tools/tools.js";



export const select = (param) => {
    const div = document.createElement("div");
    div.className = "select"
    div.id = "select"
    div.innerHTML = `
            <style>
                .select{
                    width: 50%;
                    height: 200px;
                    border-radius: 5px;
                    background: white;
                }
                .select input{
                    all:unset;
                    width: 100%;
                    background: lightgrey;
                    height: 2em;
                    color: black;
                    font-size: 20px;
                }
                .select ul{
                    all:unset;
                    cursor: pointer;
                }
                 li.selected {
                    background: red;
                } 
                #select .div-span{
                    background:red;
                    width:100%;
                    display:flex;
                    justify-content:end;
                    cursor:pointer;
                }      
                #select .div-span span{
                padding: 0.5em;
                margin-right: 0.5em;
                color: white;
                }
            </style>
            <div class="div-span">
                <span>X</span>
            </div>
            <input type="text" />

            <ul>
                
            </ul>
    `
    div.addEventListener("focusout",()=>{
        div.parentNode.remove();
    })
    const ul = div.querySelector("ul");
    ul.style.display = "none";
    div.querySelector("input").addEventListener("input", debounce(async (e) => {
        ul.innerHTML = ""
        ul.style.display = "none";
        const valor = e.target.value.trim().toLowerCase();
        // Si no hay valor o menos de 3 caracteres, limpiamos y detenemos
        if (!valor || valor.length < 3) {
            ul.innerHTML = "";
            return;
        }

        try {
            param.body = { search: valor };
            const response = await consultaSelect(param);

            // Si no hay resultados, limpiar la lista
            if (!response || response.length === 0) {
                ul.style.display = "none";

                ul.innerHTML = "";
                return;
            }
            ul.style.display = "block";

            // Mostrar resultados
            response.forEach(i => {
                const li = document.createElement("li")
                li.innerHTML =i[param.llave] 
                li.object = i;
                ul.append(li);


            });
            param.contenidos.divSelect = div
            
            selection(param)
        } catch (err) {
            console.error(err);
            ul.innerHTML = "";
        }

    }, 300));

    return div;
}



const selection = (param) => {
    const ul = param.contenidos.divSelect.querySelector("ul");
    const lis = ul.querySelectorAll("li");
    let count = -1;
    const contenedor = param.contenidos.divFactura.querySelector("tbody");
    // aseguramos que los <li> puedan recibir foco
    lis.forEach(li => {
        li.setAttribute("tabindex", "0")
        li.addEventListener("click", () => param.eventos.handleSelect(contenedor, li));
        li.addEventListener("keydown", (e) => {
            if (e.key === "Enter") param.eventos.handleSelect(contenedor, li);
        });
    });

    ul.parentNode.addEventListener("keyup", (e) => {
        // limpiar selección anterior
        lis.forEach(li => li.classList.remove("selected"));
        if (e.key === "ArrowDown") {
            count = (count + 1) % lis.length;
        } else if (e.key === "ArrowUp") {
            count = (count - 1 + lis.length) % lis.length;
        } else {
            return;
        }

        // aplicar clase y foco
        const current = lis[count];
        current.classList.add("selected");
        current.focus(); // 👈 ahora obtiene el foco real
        current.scrollIntoView({ block: "nearest" });
    });
};


