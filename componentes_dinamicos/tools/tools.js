export const trAJson = (tr, json) => {
    const tds = tr.querySelectorAll("td:not(.td-btn)");
    return json.content.map((col, i) => ({
        header: col.header,
        name: col.name,
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

    const objeto = {
      id: celdas[0].textContent.trim(),
      descripcion: celdas[1].textContent.trim(),
      cantidad: Number(celdas[2].querySelector("input")?.value || 0),
      costo: Number(celdas[3].querySelector("input")?.value || 0),
      descuento: Number(celdas[4].querySelector("input")?.value || 0),
      total: Number(celdas[5].querySelector("input")?.value || 0)
    };

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