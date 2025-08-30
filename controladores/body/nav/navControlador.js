
import { subNavegador } from "../../../vistas/body/nav/subnav/subNav.js";
import { crear } from "../../../vistas/principales/producto/crear.js";
import { eventoButton, getButtonByText } from "../../hooks.js";
import { crearCliente } from "../../../vistas/principales/Personas/Cliente/crearClient.js";
import { tablaClient } from "../../../vistas/principales/Personas/Cliente/mostrarClient.js";



export const navControlador = (nav) => {
    const contenido = document.getElementById("contenido")

    nav.addEventListener("click", (e) => {

        if (e.target == getButtonByText(nav, "INVENTARIO")) {
            const parametro = {
                evento: () => {
                    contenido.innerHTML = ""
                    contenido.append(crear())
                },
                nombre: "Producto"
            }

            const param = {
                botonesNombre: [eventoButton(parametro)]

            }

            subNavegador(param)

        }
        if (e.target == getButtonByText(nav, "PERSONAS")) {

            const parametro = {
                evento: () => {
                    contenido.innerHTML = ""
                    contenido.append(crearCliente())
                    contenido.append(tablaClient())
                },
                nombre: "Cliente"
            }

            const param = {
                botonesNombre: [eventoButton(parametro)]

            }

            subNavegador(param)


        }
    })
}   