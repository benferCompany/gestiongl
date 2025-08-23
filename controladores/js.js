import { nav } from "../vistas/body/nav/nav.js";
import { formularioCrear } from "./principales/producto/crear.js";

//partes del DOM
const contenido = document.getElementById("contenido");
const header = document.getElementById("header");
///////////////////////////////////////////////////


contenido.innerHTML = formularioCrear();
header.innerHTML = nav();