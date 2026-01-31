import { contenidoFacturador } from "../../../../componentes_dinamicos/facturador/contenido.js"
import { generarFactura, handleSelect } from "../../../../componentes_dinamicos/facturador/controlador/eventos.js";
import { URL } from "../../../../controladores/url/url.js";



const param = {
    inputs: [
        
        { type: "text", name: "cliente", id: "", placeholder: "Cliente", selector:true, url: URL + "servicios/principales/cliente/buscarCliente.php"},
        { type: "text", name: "id_factura_venta", id: "", placeholder: "Id Factura cliente" }
    ],
    button: [
        {
            value: "Agreagar Producto (F2)", evento:(e)=>{e.preventDefault()}
        },
        {
            value: "Generar Factura (F8)", evento: async (e,div) => {
               generarFactura(e,div,URL + "servicios/principales/factura/venta/crearVenta.php","venta");
            }
        }
    ],

    headers: [
        {
            header: "ID",
            name: "id",
            type: "number"
        },
        {
            header: "Descripción",
            name: "descripcion",
            type: "text"
        },
        {
            header: "Cantidad",
            name: "cantidad",
            type: "number"
        },
        {
            header: "PVP",
            name: "pvp",
            type: "number"
        },
        {
            header: "Descuento",
            name: "descuento",
            type: "number"
        },
        {
            header: "Total",
            name: "total",
            type: "number"
        }

    ],
    contenidos:{divFactura:null},

    url: URL + "/servicios/principales/inventario/producto/buscar.php",
    eventos: {handleSelect: handleSelect},
    llave: "descripcion",
    body :{},
    backgroundColor: "rgb(14, 48, 5)"
}
export const contenidoVenta = ()=>{
    contenidoFacturador(param);
}