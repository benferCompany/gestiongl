import { select } from "../componentes_dinamicos/formulario/vista/select.js";
import {table } from "../componentes_dinamicos/formulario/vista/tabla.js";
import { navControlador } from "./body/nav/navControlador.js";
import { consulta } from "./hooks.js";


window.addEventListener("DOMContentLoaded", async () => {
    navControlador(document.querySelector("nav"))
})
