
import { formBuscarPorPalabraCss, tablaCss } from "../../../vistas/styles/formulario.js";
import { consulta } from "../../../controladores/hooks.js";
import { loading } from "../../../vistas/componentes/loading.js";
import { buscarDatosPorTexto } from "../controlador/buscar.js";

import { obtenerTbody } from "../controlador/tablaControlador.js";
import { formBuscarPorTexto } from "./buscarPorTexto.js";




export const table = async (json) => {
  loading(true)

  json.data = await consulta(json.URLS.mostrar);


  const divTable = crearTabla(json);
  if (divTable.querySelector("table").querySelector("tbody")) {
    divTable.querySelector("table").querySelector("tbody").remove();
  }
  console.log(json)
  divTable.querySelector("table").append(await obtenerTbody(json))
  loading(false)

  return divTable




}

const crearTabla = (json) => {
  const div = document.createElement("div");
  const tabla = document.createElement("table");
  tabla.id = "idTabla"
  const thead = document.createElement("thead");
  const trHead = document.createElement("tr");

  tabla.innerHTML += tablaCss();
  // Crear encabezados en el orden de content
  json.content.forEach(e => {
    trHead.innerHTML += `<th>${e.header}</th>`;
  });
  const th = document.createElement("th");
  th.innerHTML = "Acción";
  trHead.appendChild(th)

  // Crear filas en el orden de content


  thead.appendChild(trHead);
  tabla.appendChild(thead);
  const formularioBuscar = formBuscarPorTexto({ stylos: formBuscarPorPalabraCss, evento: buscarDatosPorTexto });
  formularioBuscar.object = json;

  div.append(formularioBuscar)
  div.append(tabla)
  return div;
}
