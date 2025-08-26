import { consulta } from "../../hooks.js"
import { URL } from "../../url/url.js";

export const consultarProducto = async (tbodyProducto) => {
    let htmlString = ""
    const productos = await consulta(URL+"/servicios/principales/producto/consulta.php")
    productos.data.forEach(element => {

        htmlString += `  
                <tr>
                    <td>${element.id_producto}</td>
                        <td>${element.descripcion}</td>
                        <td>${element.costo}</td>
                        <td>${element.pvp}</td>
                        <td>
                            <button class="btnEditar"><i class="fas fa-pencil-alt"></i>
                            </button>
                            <button class="btnEliminar" ><i class="fas fa-trash"></i>
                            </button>
                    </td>
                </tr>
        `

    });

    tbodyProducto.innerHTML = htmlString

}