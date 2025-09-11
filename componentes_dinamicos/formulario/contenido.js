import { formulario } from "./vista/formulario.js";
import { table } from "./vista/tabla.js";




export const contenido = async (json) => {
    const div = document.createElement("div");
    Object.assign(div.style, {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", 
        alignItems: "center",
        justifyContent: "space-around",
});

    div.append(formulario(json))
    div.append(await table(json))
    json.contenido.append(div);
}