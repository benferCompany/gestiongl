import { crear } from "../../../vistas/principales/producto/crear.js";
import { getButtonByText } from "../../hooks.js";



export const navControlador = (nav) => {
    const contenido = document.getElementById("contenido")
    nav.addEventListener("click", (e) => {
        const formCrearProd = document.getElementById("formCrearProd");

        console.log(e.target)

        if (e.target === getButtonByText(nav, "Producto") && !formCrearProd) {
            contenido.innerHTML = ""
            contenido.appendChild(crear())
       
        }
    })
}   