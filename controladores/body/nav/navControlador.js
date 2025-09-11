
import { subNavegador } from "../../../vistas/body/nav/subnav/subNav.js";
import { contenidoCliente } from "../../../vistas/principales/Personas/Cliente/contenidoCliente.js";
import { contenidoProveedor } from "../../../vistas/principales/Personas/Proveedor/contenidoProveedor.js";
import { contenidoProducto } from "../../../vistas/principales/inventario/producto/contenidoProducto.js";
import { contenidoStock } from "../../../vistas/principales/inventario/stock/contenidoStock.js";
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

            const stock = {
                evento: () => {
                    contenido.innerHTML = ""
                   contenidoStock();
                },
                nombre: "Stock"
            }

            const param = {
                botonesNombre: [eventoButton(parametro), eventoButton(stock)]

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