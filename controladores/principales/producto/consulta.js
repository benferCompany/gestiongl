import { consulta } from "../../hooks.js"

export const consultarProducto = async () => {
    let htmlString = ""
    const productos = await consulta("http://localhost/servicios/principales/producto/consulta.php")
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

    const tbodyProducto = document.getElementById("tbodyProducto");
    tbodyProducto.innerHTML = htmlString

}