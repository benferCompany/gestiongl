import { editProd } from "../../../vistas/principales/producto/editar.js";
import { URL } from "../../url/url.js";
export const editarProducto = (parametro) => {
    const array = parametro.parentNode.parentNode.children;
    const producto = {
        id_producto: array[0].innerText,
        descripcion: array[1].innerText,
        costo: array[2].innerText,
        pvp: array[3].innerText
    }


    //aca ejecuta el codigo que abre el formulario para editar  y se le pasa por parametro(producto)
    editProd(producto);

}


export const enviarFormularioEditar = async (formulario) => {
    const response = await fetch(URL + "/servicios/principales/producto/editar.php", {
        method: "POST",
        body: formulario
    })

    const responseJson = await response.json();

    return responseJson;
}