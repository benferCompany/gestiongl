import { consultaSelect } from "./controlador/consultaSelect.js";
import { debounce } from "../tools/tools.js";

export const select = (param) => {
    const div = document.createElement("div");
    div.className = "select";
    div.id = "select";
    div.addEventListener("keydown",(e)=>{if(e.key==="Escape") div.parentNode.remove()})
    div.innerHTML = `
        <style>
            #select {
                width: 50%;
                height: 250px;
                border-radius: 5px;
                background: white;
                display: flex;
                flex-direction: column;
                overflow: hidden;
                border: 1px solid #ccc;
            }
            #select input {
                all: unset;
                width: 100%;
                background: lightgrey;
                height: 2em;
                color: black;
                font-size: 20px;
                padding: 0.3em;
                box-sizing: border-box;
            }
            #select table {
                width: auto;
                border-collapse: collapse;
                cursor: pointer;
                display: none; /* Oculto inicialmente */
                flex: 1;
            }
            #select thead {
                background: #333;
                color: white;
                position: sticky;
                top: 0;
            }
            #select th, td {
                width:5%;
                padding: 0.4em 0.6em;
                border-bottom: 1px solid #ccc;
                text-align: left;
            }
            #select tbody tr.selected {
                background: red !important;
                color: white;
            }
            #select tbody tr:hover {
                background: lightcoral;
            }
            #select .div-span {
                background: red;
                width: 100%;
                display: flex;
                justify-content: end;
                cursor: pointer;
            }
            #select .div-span span {
                padding: 0.5em;
                margin-right: 0.5em;
                color: white;
            }
        </style>

        <div class="div-span"><span>X</span></div>
        <input type="text" placeholder="Buscar..." />
        <table>
            <thead></thead>
            <tbody></tbody>
        </table>
    `;
    const divSpan = div.querySelector(".div-span span");
    divSpan.addEventListener("click",()=>{
        div.parentNode.remove();
    })
    const table = div.querySelector("table");
    const thead = table.querySelector("thead");
    const tbody = table.querySelector("tbody");
    const input = div.querySelector("input");
    input.addEventListener(
        "input",
        debounce(async (e) => {
            tbody.innerHTML = "";
            thead.innerHTML = "";
            table.style.display = "none";

            const valor = e.target.value.trim().toLowerCase();
            if (!valor || valor.length < 3) return;

            try {
                param.body = { search: valor };
                const response = await consultaSelect(param);

                if (!response || response.length === 0) {
                    tbody.innerHTML = "";
                    table.style.display = "none";
                    return;
                }

                // ✅ Mostrar la tabla
                table.style.display = "table";

                // ✅ Crear encabezado dinámico
                const keys = Object.keys(response[0]);
                const headRow = document.createElement("tr");
                keys.forEach((key) => {
                    const th = document.createElement("th");
                    th.textContent = key.toUpperCase();
                    if(key=="descripcion"){
                            th.style="width:80%"
                        }
                    headRow.appendChild(th);
                });
                thead.appendChild(headRow);

                // ✅ Crear filas del cuerpo
                response.forEach((obj) => {
                    const tr = document.createElement("tr");
                    tr.object = {obj, param};
                    tr.setAttribute("tabindex", "0");

                    keys.forEach((key) => {
                        const td = document.createElement("td");
                        td.textContent = obj[key];
                        if(key=="descripcion"){
                            td.style="width:80%"
                        }
                        tr.appendChild(td);
                    });

                    tbody.appendChild(tr);
                });

                param.contenidos.divSelect = div;
                selection(param);
            } catch (err) {
                console.error(err);
                tbody.innerHTML = "";
            }
        }, 300)
    );

    return div;
};

const selection = (param) => {
    const divSelect = param.contenidos.divSelect;
    const table = divSelect.querySelector("table");
    const tbody = table.querySelector("tbody");
    const filas = Array.from(tbody.querySelectorAll("tr"));
    const input = divSelect.querySelector("input");
    const contenedor = param.contenidos.divFactura.querySelector("tbody");

    let count = -1;

    filas.forEach((tr) => {
        tr.addEventListener("click", () =>
            param.eventos.handleSelect(contenedor, tr)
        );
        tr.addEventListener("keydown", (e) => {
            //if (e.key === "Enter") param.eventos.handleSelect(contenedor, tr);
        });
    });

    /** ✅ Función que marca la fila seleccionada */
    const marcarFila = (index) => {
        filas.forEach((tr) => tr.classList.remove("selected"));
        if (index >= 0 && index < filas.length) {
            const current = filas[index];
            current.classList.add("selected");
            current.focus();
            current.scrollIntoView({ block: "nearest" });
        }
    };

    /** ✅ Escuchar flechas desde el input o la tabla */
    const manejarTeclas = (e) => {
        if (!["ArrowDown", "ArrowUp", "Enter"].includes(e.key)) {
            
            input.focus()
            return

        };


        e.preventDefault();


        
        if (filas.length === 0) return;

        if (e.key === "ArrowDown") {
            count = (count + 1) % filas.length;
        } else if (e.key === "ArrowUp") {
            count = (count - 1 + filas.length) % filas.length;
        } else if (e.key === "Enter" && count >= 0) {
            const fila = filas[count];
            param.eventos.handleSelect(contenedor, fila);
            return;
        }
        marcarFila(count);
    };

    // ✅ Escuchar teclas tanto desde el input como desde el tbody
    input.addEventListener("keydown", manejarTeclas);
    tbody.addEventListener("keydown", manejarTeclas);
};
