import { mostrarAlerta } from "../../vistas/componentes/alertas.js";

export const trAJson = (tr, json) => {
    const tds = tr.querySelectorAll("td:not(.td-btn)");
    return json.content.map((col, i) => ({
        header: col.header,
        name: col.name,
        tipo: col.tipo || "",
        accion: col.accion || "",
        llaveMostrar: col.llaveMostrar || "",
        value: tds[i]?.innerText.trim() || "",
        type: (col.name === "pvp" || col.name === "costo") ? "number" : "text"
    }));


}




export function debounce(fn, delay) {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => fn(...args), delay);
    };
}

export function tablaAJSON(tabla) {
  const filas = tabla.querySelectorAll("tbody tr");
  const data = [];

  filas.forEach(fila => {
    const celdas = fila.querySelectorAll("td");
    const objeto = {};

    celdas.forEach(td => {
      const key = td.dataset.key;
      if (!key) return;

      const inputEl = td.querySelector("input");
      const input = inputEl ? inputEl.value : td.innerText;
      console.log(input);
      objeto[key] = input;
    });

    data.push(objeto);
  });

  return data;
}


export function formToJSON(form) {
  if (!form) return false;

  const data = new FormData(form);
  const json = {};

  data.forEach((value, key) => {
    json[key] = value;
  });

  return json;
}


export function trToJson(trElement, theadElement) {
  const headers = Array.from(theadElement.querySelectorAll("th"))
    .map(th => th.textContent.trim());

  const cells = Array.from(trElement.querySelectorAll("td"))
    .map(td => td.textContent.trim());

  const result = {};

  headers.forEach((header, index) => {
    result[header] = cells[index] ?? null;
  });

  return result;
}



export function formularioCompleto(form) {

  const paramMessage = {
        color: "whitesmoke",
        background: "rgba(211, 27, 27, 1)",
        mensaje:""
                    }

  const boolean = Object.values(form).every(
        value => value !== null && value !== undefined && value !== ""
    );  
  
  if (!boolean) {
    paramMessage.mensaje = "Debe completar todos los campos del formulario.";
    mostrarAlerta(paramMessage);
  }

  return !boolean;

}


