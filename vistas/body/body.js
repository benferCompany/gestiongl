import { consultarProducto } from "../../controladores/principales/producto/consulta.js";
import { crear } from "../principales/producto/crear.js";
import { nav } from "./nav/nav.js";


const bodyNav =document.getElementById("nav");
bodyNav.append(nav())
//body.appendChild(crear());