

export const subNavegador = (param) => {
    
    const subNavegador = document.getElementById("subNavegadores")
    const div = document.createElement("div");
    div.style="padding:1em";
    subNavegador.innerHTML=""
    param.botonesNombre.forEach(element => {
        div.append(element);
    });
    

    subNavegador.append(div)
}

