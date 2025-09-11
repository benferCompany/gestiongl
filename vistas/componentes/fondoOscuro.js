

export const fondoOscuro = (contenido) => {

    const div = document.createElement("div");
    div.id = "fondoOscuro"
    div.style = `width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.5);
        position: fixed;
        top: 0;
        justify-content: center;
        align-items: center;
        text-align: center;
        position: fixed;
        display: flex;
    `

    div.appendChild(contenido);
    return div;
}