import { formularioSelectCss } from "../../../vistas/styles/formulario.js";




export const select = async (parametros) => {
    const param = {
        URL: "",
        div: null,
        ul: null,
        body: "",
        llaveDescripcion: "",
        valueId: "id",
    }

    param.llaveDescripcion = parametros.llaveDescripcion;
    param.llaveMostrar = parametros.llaveMostrar;
    param.URL = parametros.URLBuscar;
    const div = document.createElement("div");
    div.className = "divSelect";
    const input = document.createElement("input");
    input.autocomplete = "off";

    const ul = document.createElement("ul");

    param.div = div;
    param.ul = ul;
    param.input = input;
    input.addEventListener("keyup", (e) => { eventoKeyUp(e, param) });

    param.div.append(param.input)
    param.div.append(param.ul);
    const style = document.createElement("style");
    style.innerHTML = formularioSelectCss();
    param.div.append(style)
    parametros.contentSelect.replaceWith(param.div);


};


const consultaSelect = async (param) => {
    try {
        const response = await fetch(param.URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: param.body
        })

        const responseJson = await response.json();
        if (responseJson.status == "success") {
            return responseJson;
        } else {
            console.error(responseJson.message);
            return [];
        }
    } catch (error) {
        console.error(error);
    }
}


function debounce(fn, delay) {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => fn(...args), delay);
    };
}


const eventoKeyUp = debounce(async (e, param) => {
   
    if (!e.target.value.trim()) {
        param.ul.innerHTML = "";
        return;
    }

    param.body = JSON.stringify({ search: e.target.value })


    param.ul.innerHTML = "cargando...";
    const response = await consultaSelect(param);
    const li = document.createElement("li");
    if (response.status === "success") {
        param.ul.innerHTML = "";
        response.data.forEach(element => {
            li.style.cursor = "pointer";
            li.value = element.id;
            li.innerHTML = element[param.llaveMostrar];
            li.addEventListener("click", (e) => {
                const inputSelect = param.input;
                inputSelect.value = element[param.llaveMostrar];
                
                inputSelect.id = element[param.valueId];
                param.ul.innerHTML = "";

            })
            param.ul.append(li);
        });
    }
}, 300)