import { enviarFormularioEditar } from "../../../controladores/principales/producto/editarControlador.js";

export const editProd = async function(producto) {
    const form = document.createElement("form");
    form.innerHTML = `

        <label for="">id Producto</label><br>
        <input value="${producto.id_producto}" type="text" name="id_producto"  required><br><br>
        <label for="">Descripción</label><br>
        <input value="${producto.descripcion}" type="text" name="descripcion"  required><br><br>
        <label for="">Costo</label><br>
        <input value="${producto.costo}" type="number" name="costo" required><br><br>
        <label for="">PVP</label><br>
        <input value="${producto.pvp}" type="number" name="pvp"  required><br><br>
        <input type="submit" value="Cargar">
    `;

    form.addEventListener("submit", async function(e) {
        e.preventDefault();
        const formulario = new FormData(form); 
        console.log(await enviarFormularioEditar(formulario));
    });

    // Agrega el formulario al DOM
    document.body.appendChild(form);

}









