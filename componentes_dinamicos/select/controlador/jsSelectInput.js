import { fondoOscuro } from "../../../vistas/componentes/fondoOscuro.js";
import { debounce, trToJson } from "../../tools/tools.js";


export const jsSelectInputCliente = (inputParam,urlServicio) => {

     const div = document.createElement("div");
     div.id = "cont";
     div.innerHTML = `
     <style>
     /* Variables CSS - Modo Oscuro Profesional */
:root {
    /* Negros y grises */
    --color-bg-main: #0a0c0e;           /* Fondo principal - negro profundo */
    --color-bg-surface: #14181c;         /* Superficies - negro ligeramente más claro */
    --color-bg-elevated: #1e2329;        /* Elementos elevados - gris muy oscuro */
    --color-bg-hover: #2a313c;            /* Hover - gris oscuro */
    --color-bg-header: #1a1f24;           /* Cabecera - gris muy oscuro */
    
    /* Textos */
    --color-text-primary: #e8edf2;        /* Texto principal - casi blanco */
    --color-text-secondary: #9aa7b9;       /* Texto secundario - gris claro */
    --color-text-muted: #5f6c80;           /* Texto deshabilitado - gris medio */
    
    /* Acentos de color para dar vida (sutiles) */
    --color-primary: #f97316;              /* Naranja para acentos */
    --color-primary-hover: #fb923c;         /* Naranja más claro para hover */
    --color-primary-glow: rgba(249, 115, 22, 0.15); /* Brillo naranja */
    
    --color-secondary: #0ea5e9;             /* Celeste para acentos */
    --color-secondary-glow: rgba(14, 165, 233, 0.1); /* Brillo celeste */
    
    /* Bordes y divisiones */
    --color-border: #2a313c;                /* Bordes sutiles */
    --color-border-strong: #3a4452;          /* Bordes más marcados */
    
    /* Sombras */
    --shadow-sm: 0 2px 4px 0 rgba(0, 0, 0, 0.5);
    --shadow-md: 0 4px 12px 0 rgba(0, 0, 0, 0.6);
    --shadow-lg: 0 8px 24px -4px rgba(0, 0, 0, 0.8);
    
    --border-radius: 0.75rem;
    --transition-base: all 0.2s ease-in-out;
}

#cont {
    padding: 2rem;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
    background: linear-gradient(135deg, var(--color-bg-main) 0%, var(--color-bg-surface) 100%);
    height: 70vh;
    color: var(--color-text-primary);
}

/* Estilos para el input */
#cont input {
    border: 1px solid var(--color-border);
    height: 48px;
    padding: 0 1.2rem;
    border-radius: var(--border-radius);
    cursor: pointer;
    margin-bottom: 2em;
    width: 100%;
    max-width: 380px;
    font-size: 1rem;
    transition: var(--transition-base);
    outline: none;
    background-color: var(--color-bg-elevated);
    color: var(--color-text-primary);
    box-shadow: var(--shadow-sm);
}

#cont input:hover {
    border-color: var(--color-primary);
    background-color: var(--color-bg-hover);
    box-shadow: 0 0 0 3px var(--color-primary-glow);
}

#cont input:focus {
    border-color: var(--color-primary);
    background-color: var(--color-bg-hover);
    box-shadow: 0 0 0 4px var(--color-primary-glow);
}

#cont input::placeholder {
    color: var(--color-text-muted);
}

/* Estilos generales de la tabla */
#cont table {
    width: 100%;
    border-collapse: separate;
    border-spacing: 0;
    color: var(--color-text-primary);
    background-color: var(--color-bg-surface);
    border-radius: var(--border-radius);
    overflow: hidden;
    box-shadow: var(--shadow-lg);
    border: 1px solid var(--color-border);
    backdrop-filter: blur(10px);
}

/* Cabecera de la tabla */
#cont thead {
    background: linear-gradient(180deg, var(--color-bg-header) 0%, var(--color-bg-elevated) 100%);
    border-bottom: 2px solid var(--color-primary);
}

#cont th {
    text-align: left;
    padding: 1.4rem 1.2rem;
    font-weight: 600;
    font-size: 0.9rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--color-text-primary);
    border-bottom: 1px solid var(--color-border-strong);
    background-color: transparent;
}

/* Celdas de la tabla */
#cont td {
    padding: 1.2rem;
    border-bottom: 1px solid var(--color-border);
    color: var(--color-text-secondary);
    transition: var(--transition-base);
}

/* Filas del cuerpo de la tabla */
#cont tbody tr {
    cursor: pointer;
    transition: var(--transition-base);
}

/* Hover con efecto glow */
#cont tbody tr:hover {
    background-color: var(--color-bg-hover);
    border-left: 4px solid var(--color-primary);
    transform: translateX(4px);
    box-shadow: 
        inset 0 0 0 1px var(--color-primary-glow),
        0 4px 12px rgba(0, 0, 0, 0.4);
}

#cont tbody tr:hover td {
    color: var(--color-text-primary);
}

/* Zebra striping sutil en modo oscuro */
#cont tbody tr:nth-child(odd) {
    background-color: var(--color-bg-surface);
}

#cont tbody tr:nth-child(even) {
    background-color: rgba(30, 35, 41, 0.8); /* color-bg-elevated con opacidad */
}

#cont tbody tr:nth-child(even):hover {
    background-color: var(--color-bg-hover);
}

/* Estado focus para accesibilidad */
#cont tbody tr:focus-visible {
    outline: 2px solid var(--color-secondary);
    outline-offset: -2px;
    background-color: var(--color-bg-hover) !important;
    box-shadow: 0 0 0 3px var(--color-secondary-glow);
}

/* Estado activo/selected con gradiente oscuro */
#cont tbody tr.active {
    background: linear-gradient(
        90deg,
        rgba(249, 115, 22, 0.15) 0%,
        rgba(14, 165, 233, 0.1) 50%,
        transparent 100%
    );
    border-left: 4px solid var(--color-primary);
    box-shadow: inset 0 1px 0 0 rgba(255, 255, 255, 0.05);
    position: relative;
}

#cont tbody tr.active td {
    color: var(--color-text-primary);
    font-weight: 500;
}

#cont tbody tr.active::after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 100px;
    height: 100%;
    background: linear-gradient(90deg, transparent, var(--color-primary-glow));
    pointer-events: none;
    opacity: 0.3;
}

/* Última fila sin borde */
#cont tbody tr:last-child td {
    border-bottom: none;
}

/* Efecto al hacer clic */
#cont tbody tr:active {
    transform: scale(0.998);
    background-color: var(--color-bg-hover);
    box-shadow: inset 0 0 0 2px var(--color-primary);
}

/* Scrollbar personalizado para modo oscuro */
::-webkit-scrollbar {
    width: 10px;
    height: 10px;
}

::-webkit-scrollbar-track {
    background: var(--color-bg-main);
    border-radius: 5px;
}

::-webkit-scrollbar-thumb {
    background: var(--color-bg-hover);
    border-radius: 5px;
    border: 2px solid var(--color-bg-main);
}

::-webkit-scrollbar-thumb:hover {
    background: var(--color-primary);
}

/* Responsive */
@media (max-width: 768px) {
    #cont {
        padding: 1rem;
    }
    
    #cont table {
        display: block;
        overflow-x: auto;
        white-space: nowrap;
        border-radius: calc(var(--border-radius) / 2);
    }
    
    #cont th,
    #cont td {
        padding: 1rem;
    }
    
    #cont input {
        max-width: 100%;
    }
}

/* Animación de entrada para las filas */
@keyframes fadeInRow {
    from {
        opacity: 0;
        transform: translateY(10px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

#cont tbody tr {
    animation: fadeInRow 0.3s ease forwards;
}

/* Efecto de brillo en los bordes */
#cont table::before {
    content: '';
    position: absolute;
    top: -1px;
    left: -1px;
    right: -1px;
    bottom: -1px;
    border-radius: var(--border-radius);
    padding: 1px;
    background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    opacity: 0.1;
    pointer-events: none;
}
     </style>
         <input  type="text" placeholder="Buscar..."> 
         <hr><br>
         
         <table tabindex="0">
             <thead>
                
             </thead>
             <tbody>
                 
             </tbody>
         </table>
     `;
    const input = div.querySelector("input");
    input.value = inputParam.value;
    
    
     debouncedGetContent(div,urlServicio,inputParam);

     
     keyDownInput(div,urlServicio,inputParam);
    
     
     keyDownContenido(div,inputParam)

     if(document.getElementById("contenidoInput")) document.getElementById("contenidoInput").remove();
        const contenidoInput = document.createElement("div");
        contenidoInput.id = "contenidoInput";
        
        
        
        contenidoInput.appendChild(fondoOscuro(div));
        document.body.appendChild(contenidoInput);
        div.querySelector("input").focus();
    
 }    

 
const debouncedGetContent = debounce((contenido,url,inputParam) => {
            
             contenido.querySelector("tbody").innerHTML = "";
             getContent(contenido,url,inputParam);
         }, 300);


const keyDownInput = (contenido,url,inputParam)=>{
        
        const input = contenido.querySelector("input");    
    
         input.addEventListener("input",(e)=>{
             
     
         debouncedGetContent(contenido,url,inputParam);
     });
    }
    
    

 const getContent = async (contenido,url,inputParam)=>{
         
        const input = contenido.querySelector("input");
        const thead = contenido.querySelector("thead");
        const texto = input.value;
         
       
         if(!texto || texto.length < 3) return
         const response = await fetch(url, {
             method: "POST",
             headers: {
                 "Content-Type": "application/json"
             },
             body: JSON.stringify({ search: texto })
             });
         const responseJson = await response.json();
         if(responseJson.data.length <=0) return
         const keys = Object.keys(responseJson.data[0])
         
         responseJson.data.forEach((element,i) => {
             const tr = document.createElement("tr");
             tr.addEventListener("click", (e)=>{
                 eventoClick(e.target.closest("tr"), contenido,inputParam);
             });
             const trhead = document.createElement("tr");    
             const theadBoolean = thead.childElementCount < 1
             keys.forEach(k =>{
                 if(theadBoolean){
                   
                     const th = document.createElement("th");
                     th.innerHTML = k
                     trhead.append(th);
                 }
                 const td = document.createElement("td");
                 td.innerHTML = element[k];
                 tr.tabIndex = 0;
                 tr.append(td);
             })
             if(theadBoolean){
             
                 thead.append(trhead)
             }
             contenido.querySelector("tbody").append(tr)
         
         })
    
     }
    


      const eventoClick =(e,div,inputParam)=>{
         
          if(!e) return;
         
         
         const json = trToJson(e, div.querySelector("thead"));
         inputParam.value = inputParam.value = Object.values(json).join(" ");
         inputParam.setAttribute("objeto", JSON.stringify(json));
         inputParam.select();
         
         document.getElementById("contenidoInput").remove();
    
     }



     const keyDownContenido = (contenido, inputParam)=>{
         let index = 0;
         
         contenido.addEventListener('keydown', (e) => {
             const rows = contenido.querySelectorAll('tbody tr');
             try{
    
                 if (e.key === "ArrowDown") {
                 index = Math.min(index, rows.length - 1);
                 rows[index].focus();
                 index++
                 
                 }
         
                 if (e.key === 'ArrowUp') {
                     index--
                     index = Math.max(index, 0);
                     rows[index-1].focus();
                 }
                 if(e.key === "Enter"){
                     const selectedRow = contenido.querySelectorAll('tbody tr')[index -1];
                    
                     eventoClick(selectedRow, contenido,inputParam);
                 }
             }catch(e){
                 contenido.querySelector("input").select();
             }
    
     
     });
     }