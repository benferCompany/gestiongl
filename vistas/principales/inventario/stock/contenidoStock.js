import { contenido } from "../../../../componentes_dinamicos/formulario/contenido.js";
import { crearFormulario } from "../../../../componentes_dinamicos/formulario/controlador/crear.js";
import { eventoSubmit } from "../../../../componentes_dinamicos/formulario/controlador/editar.js";
import { URL } from "../../../../controladores/url/url.js";

const json = {
    content: [
        { header: "Id", name: "id", type:"number" },
        { header: "Producto Id", name: "producto_id", type: "text", tipo:"select", accion:"buscarProducto", llaveMostrar:"descripcion"},
        { header: "Proveedor Id", name: "proveedor_id", type: "text", tipo:"select", accion:"buscarProveedor", llaveMostrar:"razon_social" },
        { header: "Razón Social", name: "razon_social", type: "text" },
        { header: "Id del producto", name: "id_producto", type: "number" },
        { header: "Descripción", name: "descripcion", type: "text"},
        { header: "Id del proveedor", name: "id_producto_proveedor", type: "number" },
        { header: "Stock", name: "stock", type: "number"},
        { header: "Stock Min", name: "stock_min",type: "number"},
        { header: "Stock Max", name: "stock_max" ,type: "number"}

    ],

    data: {},

    URLS:
    {
        editar: URL + "/servicios/principales/inventario/stock/editarStock.php",
        crear: URL + "/servicios/principales/inventario/stock/crearStock.php",
        mostrar: URL + "/servicios/principales/inventario/stock/listarStock.php",
        eliminar: URL + "/servicios/principales/inventario/stock/eliminarStock.php",
        buscar: URL + "/servicios/principales/inventario/stock/buscarStock.php",
        buscarProveedor: URL + "/servicios/principales/proveedor/buscarProveedor.php",
        buscarProducto: URL + "/servicios/principales/inventario/producto/buscar.php"
    },
    contenido: document.getElementById("contenido"),
    texto: "",
    eventos: { editar: eventoSubmit, crear: crearFormulario }


}

export const contenidoStock = () => {
    contenido(json)
}