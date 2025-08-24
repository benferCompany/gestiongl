import { consultarProducto } from "./principales/producto/consulta.js";
import { submitCrearProd } from "./principales/producto/crear.js";
window.addEventListener('load', async() => {
    console.log('¡Toda la página se ha cargado!');
    const formCrearProd = document.getElementById("formCrearProd");
    formCrearProd.childNodes

    formCrearProd.addEventListener("submit", async (e) => {
        e.preventDefault();
        console.log(await submitCrearProd(formCrearProd));

    })

    console.log(await consultarProducto())
});
