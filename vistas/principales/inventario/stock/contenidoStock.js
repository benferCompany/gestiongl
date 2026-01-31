import { contenido } from "../../../../componentes_dinamicos/formulario/contenido.js";
import { crearFormulario } from "../../../../componentes_dinamicos/formulario/controlador/crear.js";
import { eventoSubmit } from "../../../../componentes_dinamicos/formulario/controlador/editar.js";
import { URL } from "../../../../controladores/url/url.js";

const json = {
    content: [
        { header: "Id", name: "id", type:"number" },
        { header: "Producto Id", name: "producto_id", type: "text", tipo:"select", accion:"buscarProducto", llaveMostrar:"descripcion"},
        { header: "Proveedor Id", name: "proveedor_id", type: "text", tipo:"select", accion:"buscarProveedor", llaveMostrar:"razon_social" },
        { header: "Id producto proveedor", name: "id_producto_proveedor", type: "text",tipo:"" },
        { header: "Stock", name: "stock", type: "number", tipo:""},
        { header: "Stock Min", name: "stock_min",type: "number", tipo:""},
        { header: "Stock Max", name: "stock_max" ,type: "number", tipo:""}

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
    eventos: { editar: eventoSubmit, crear: (e)=>{
        
        e.preventDefault();
        const formData = Object.fromEntries(new FormData(e.target));

        const objeto = {
            ...formData,
            producto_id: formData.producto_id.split(" ")[0],
            proveedor_id: formData.proveedor_id.split(" ")[0]
        };
        e.target.objeto.jsonFormulario = objeto;
        

        crearFormulario(e);
    } },
    mensajes: {
        eliminar: "¿Estas seguro que quieres eliminar el stock del producto?"
    }


}

export const contenidoStock = () => {
    contenido(json)
}