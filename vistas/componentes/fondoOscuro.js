

export const fondoOscuro = (contenido) => {

    const div = document.createElement("div");
    
    div.style = `width: 100%;
    height: 100%;background: rgba(0,0,0,0.5);
    position: fixed;
    top: 0;`

    div.appendChild(contenido);
    return div;
}