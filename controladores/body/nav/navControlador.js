
import { subNavegador } from "../../../vistas/body/nav/subnav/subNav.js";
import { contenidoCliente } from "../../../vistas/principales/Personas/Cliente/contenidoCliente.js";
import { contenidoProveedor } from "../../../vistas/principales/Personas/Proveedor/contenidoProveedor.js";
import { contenidoProducto } from "../../../vistas/principales/producto/contenidoProducto.js";
import { eventoButton, getButtonByText } from "../../hooks.js";



export const navControlador = (nav) => {
    const contenido = document.getElementById("contenido")

    nav.addEventListener("click", (e) => {

        if (e.target == getButtonByText(nav, "INVENTARIO")) {
            const parametro = {
                evento: () => {
                    contenido.innerHTML = ""
                   contenidoProducto();
                },
                nombre: "Producto"
            }

            const param = {
                botonesNombre: [eventoButton(parametro)]

            }

            subNavegador(param)

        }
        if (e.target == getButtonByText(nav, "PERSONAS")) {

            const cliente = {
                evento: () => {
                    contenido.innerHTML = ""
                    contenidoCliente();
                },
                nombre: "Cliente"
            }

            const proveedor = {
                evento: () => {
                    contenido.innerHTML = ""


                    contenidoProveedor(contenido);
                },
                nombre: "Proveedor"
            }

            const param = {
                botonesNombre: [eventoButton(cliente), eventoButton(proveedor)]

            }

            subNavegador(param)


        }
    })
}   