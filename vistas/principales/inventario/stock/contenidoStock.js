import { contenido } from "../../../../componentes_dinamicos/formulario/contenido.js";
import { crearFormulario } from "../../../../componentes_dinamicos/formulario/controlador/crear.js";
import { eventoSubmit } from "../../../../componentes_dinamicos/formulario/controlador/editar.js";
import { URL } from "../../../../controladores/url/url.js";

const json = {
    content: [
        { header: "Id", name: "id" },
        { header: "Producto Id", name: "producto_id" },
        { header: "Proveedor Id", name: "proveedor_id" },
        { header: "Razón Social", name: "razon_social" },
        { header: "Id del producto", name: "id_producto" },
        { header: "Descripción", name: "descripcion" },
        { header: "Id del proveedor", name: "id_producto_proveedor" },
        { header: "Stock", name: "stock" },
        { header: "Stock Min", name: "stock_min" },
        { header: "Stock Max", name: "stock_max" }

    ],

    data: {},

    URLS:
    {
        editar: URL + "/servicios/principales/inventario/stock/editarStock.php",
        crear: URL + "/servicios/principales/inventario/stock/crearStock.php",
        mostrar: URL + "/servicios/principales/inventario/stock/listarStock.php",
        eliminar: URL + "/servicios/principales/inventario/stock/eliminarStock.php",
        buscar: URL + "/servicios/principales/inventario/stock/buscarStock.php"
    },
    contenido: document.getElementById("contenido"),
    texto: "",
    eventos: { editar: eventoSubmit, crear: crearFormulario }


}

export const contenidoStock = () => {
     contenido(json)
}