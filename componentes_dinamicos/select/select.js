import { consultaSelect } from "./controlador/consultaSelect.js";
import { debounce } from "../tools/tools.js";

export const select = (param) => {
    const div = document.createElement("div");
    div.className = "select";
    div.id = "select";

    div.addEventListener("keydown", (e) => {
        if (e.key === "Escape") div.parentNode.remove();
    });

    div.innerHTML = `
    <style>
/* Variables CSS consistentes con el modo oscuro */
:root {
    --color-bg-main: #0a0c0e;
    --color-bg-surface: #14181c;
    --color-bg-elevated: #1e2329;
    --color-bg-hover: #2a313c;
    --color-bg-header: #1a1f24;
    
    --color-text-primary: #e8edf2;
    --color-text-secondary: #9aa7b9;
    --color-text-muted: #5f6c80;
    
    --color-primary: #f97316;
    --color-primary-hover: #fb923c;
    --color-primary-glow: rgba(249, 115, 22, 0.15);
    
    --color-secondary: #0ea5e9;
    --color-secondary-glow: rgba(14, 165, 233, 0.1);
    
    --color-border: #2a313c;
    --color-border-strong: #3a4452;
    
    --shadow-sm: 0 2px 4px 0 rgba(0, 0, 0, 0.5);
    --shadow-md: 0 4px 12px 0 rgba(0, 0, 0, 0.6);
    --shadow-lg: 0 8px 24px -4px rgba(0, 0, 0, 0.8);
    
    --border-radius: 0.75rem;
    --transition-base: all 0.2s ease-in-out;
}

#select {
    max-width: 100%;
    height: 450px; /* Aumentado para mejor usabilidad */
    border-radius: var(--border-radius);
    background: var(--color-bg-surface);
    display: flex;
    flex-direction: column;
    border: 1px solid var(--color-border);
    overflow: hidden;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
    box-shadow: var(--shadow-lg);
    backdrop-filter: blur(10px);
    position: relative;
}

/* Header fijo (X + input) */
#select .padre-span {
    background: var(--color-bg-header);
    display: flex;
    flex-direction: column;
    z-index: 20;
    border-bottom: 2px solid var(--color-primary);
}

/* Botón cerrar */
#select .div-span {
    background: linear-gradient(135deg, var(--color-primary) 0%, #dc2626 100%);
    width: 100%;
    display: flex;
    justify-content: flex-end;
    cursor: pointer;
    transition: var(--transition-base);
}

#select .div-span:hover {
    background: linear-gradient(135deg, #dc2626 0%, var(--color-primary-hover) 100%);
    box-shadow: 0 -2px 10px var(--color-primary-glow);
}

#select .div-span span {
    padding: 0.75em 1.2em;
    color: white;
    font-weight: 600;
    font-size: 0.95rem;
    letter-spacing: 0.5px;
    text-transform: uppercase;
    transition: var(--transition-base);
}

#select .div-span:hover span {
    transform: scale(1.05);
}

/* Input */
#select input {
    all: unset;
    width: 100%;
    background: var(--color-bg-elevated);
    height: 3em;
    font-size: 1rem;
    padding: 0.6em 1.2em;
    box-sizing: border-box;
    color: var(--color-text-primary);
    border-bottom: 1px solid var(--color-border);
    transition: var(--transition-base);
}

#select input:focus {
    background: var(--color-bg-hover);
    box-shadow: inset 0 -2px 0 var(--color-primary);
}

#select input::placeholder {
    color: var(--color-text-muted);
}

/* Contenedor scrolleable */
#select .table-container {
    flex: 1;
    overflow-y: auto;
    background: var(--color-bg-surface);
}

/* Personalización del scrollbar */
#select .table-container::-webkit-scrollbar {
    width: 8px;
}

#select .table-container::-webkit-scrollbar-track {
    background: var(--color-bg-main);
}

#select .table-container::-webkit-scrollbar-thumb {
    background: var(--color-bg-hover);
    border-radius: 4px;
    border: 2px solid var(--color-bg-surface);
}

#select .table-container::-webkit-scrollbar-thumb:hover {
    background: var(--color-primary);
}

/* Tabla */
#select table {
    width: 100%;
    border-collapse: collapse;
    color: var(--color-text-secondary);
}

/* Thead sticky */
#select thead {
    background: linear-gradient(180deg, var(--color-bg-header) 0%, var(--color-bg-elevated) 100%);
    color: var(--color-text-primary);
    position: sticky;
    top: 0;
    z-index: 10;
    border-bottom: 2px solid var(--color-primary);
}

#select th {
    padding: 1em 1.2em;
    font-weight: 600;
    font-size: 0.9rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--color-text-primary);
    border-bottom: 1px solid var(--color-border-strong);
}

#select td {
    padding: 0.8em 1.2em;
    border-bottom: 1px solid var(--color-border);
    color: var(--color-text-secondary);
    transition: var(--transition-base);
}

/* Hover con efecto naranja */
#select tbody tr {
    transition: var(--transition-base);
    cursor: pointer;
}

#select tbody tr:hover {
    background: var(--color-bg-hover);
    border-left: 3px solid var(--color-primary);
    transform: translateX(2px);
    box-shadow: inset 0 0 0 1px var(--color-primary-glow);
}

#select tbody tr:hover td {
    color: var(--color-text-primary);
}

/* Zebra striping sutil */
#select tbody tr:nth-child(even) {
    background-color: rgba(30, 35, 41, 0.6); /* color-bg-elevated con opacidad */
}

#select tbody tr:nth-child(even):hover {
    background-color: var(--color-bg-hover);
}

/* Estado selected */
#select tbody tr.selected {
    background: linear-gradient(
        90deg,
        rgba(249, 115, 22, 0.2) 0%,
        rgba(14, 165, 233, 0.15) 50%,
        transparent 100%
    ) !important;
    border-left: 4px solid var(--color-primary);
    position: relative;
}

#select tbody tr.selected td {
    color: var(--color-text-primary);
    font-weight: 500;
}

#select tbody tr.selected::after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 50px;
    height: 100%;
    background: linear-gradient(90deg, transparent, var(--color-primary-glow));
    pointer-events: none;
}

/* Focus para accesibilidad */
#select tbody tr:focus-visible {
    outline: 2px solid var(--color-secondary);
    outline-offset: -2px;
    background-color: var(--color-bg-hover) !important;
}

/* Animación de entrada para las filas */
@keyframes slideIn {
    from {
        opacity: 0;
        transform: translateX(-10px);
    }
    to {
        opacity: 1;
        transform: translateX(0);
    }
}

#select tbody tr {
    animation: slideIn 0.2s ease forwards;
}

/* Responsive */
@media (max-width: 768px) {
    #select {
        width: 90%;
        height: 400px;
    }
    
    #select th,
    #select td {
        padding: 0.6em 1em;
    }
}

/* Efecto de brillo en el borde superior */
#select::before {
    content: '';
    position: absolute;
    top: -1px;
    left: -1px;
    right: -1px;
    height: 2px;
    background: linear-gradient(90deg, var(--color-primary), var(--color-secondary));
    border-radius: var(--border-radius) var(--border-radius) 0 0;
    opacity: 0.5;
    pointer-events: none;
}


    </style>

    <div id="select">
        <div class="padre-span">
            <div class="div-span"><span>X</span></div>
            <input type="text" placeholder="Buscar..." />
        </div>

        <div class="table-container">
            <table>
                <thead></thead>
                <tbody></tbody>
            </table>
        </div>
    </div>
    `;

    const cerrar = div.querySelector(".div-span span");
    cerrar.addEventListener("click", () => div.parentNode.remove());

    const table = div.querySelector("table");
    const thead = table.querySelector("thead");
    const tbody = table.querySelector("tbody");
    const input = div.querySelector("input");

    /* 🔒 bandera para no duplicar eventos */
    let selectionInit = false;

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

                if (!response || response.length === 0) return;

                table.style.display = "table";

                const keys = Object.keys(response[0]);

                const headRow = document.createElement("tr");
                keys.forEach((key) => {
                    const th = document.createElement("th");
                    th.textContent = key.toUpperCase();
                    if (key === "descripcion") th.style.width = "80%";
                    headRow.appendChild(th);
                });
                thead.appendChild(headRow);

                response.forEach((obj) => {
                    const tr = document.createElement("tr");
                    tr.object = { obj, param };
                    tr.tabIndex = 0;

                    keys.forEach((key) => {
                        const td = document.createElement("td");
                        td.textContent = obj[key];
                        if (key === "descripcion") td.style.width = "80%";
                        tr.appendChild(td);
                    });

                    tbody.appendChild(tr);
                });

                param.contenidos.divSelect = div;

                if (!selectionInit) {
                    selection(param);
                    selectionInit = true;
                }
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
    const input = divSelect.querySelector("input");
    const contenedor = param.contenidos.divFactura.querySelector("tbody");

    let count = -1;

    const marcarFila = (filas, index) => {
        filas.forEach((tr) => tr.classList.remove("selected"));
        if (index >= 0 && index < filas.length) {
            const current = filas[index];
            current.classList.add("selected");
            current.focus();
            current.scrollIntoView({ block: "nearest" });
        }
    };

    const manejarTeclas = (e) => {
        if (e.repeat) return;

        const filas = Array.from(tbody.querySelectorAll("tr"));
        if (filas.length === 0) return;

        if (!["ArrowDown", "ArrowUp", "Enter"].includes(e.key)) return;

        e.preventDefault();

        if (e.key === "ArrowDown") {
            count = (count + 1) % filas.length;
        } else if (e.key === "ArrowUp") {
            count = (count - 1 + filas.length) % filas.length;
        } else if (e.key === "Enter" && count >= 0) {
            param.eventos.handleSelect(contenedor, filas[count]);
            
            return;
        }

        marcarFila(filas, count);
    };

    input.addEventListener("keydown", manejarTeclas);
    tbody.addEventListener("keydown", manejarTeclas);

    tbody.addEventListener("click", (e) => {
        const tr = e.target.closest("tr");
        if (tr) param.eventos.handleSelect(contenedor, tr);
    });
};
