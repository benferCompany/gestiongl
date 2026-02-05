import { contenidoFacturador } from "../../../../componentes_dinamicos/facturador/contenido.js"
import {handleSelect } from "../../../../componentes_dinamicos/facturador/controlador/eventos.js";
import { tipoPago } from "../../../../componentes_dinamicos/facturador/vista/tipoPago.js";
import { URL } from "../../../../controladores/url/url.js";



const param = {
    inputs: [
        
        { type: "text", name: "proveedor", id: "", placeholder: "Proveedor", selector:true, url: URL + "servicios/principales/proveedor/buscarProveedor.php"},
        { type: "text", name: "id_factura_proveedor", id: "", placeholder: "Id Factura proveedor" }
    ],
    button: [
        {
            value: "Agreagar Producto (F2)", evento:(e)=>{e.preventDefault()}
        },
        {
            value: "Generar Factura (F8)", evento: async (e,div) => {
                tipoPago(e,div,URL + "servicios/principales/factura/compra/crearCompra.php","compra");    
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
            header: "Costo",
            name: "costo",
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
    backgroundColor: "rgb(12, 12, 12)"
}
export const contenidoCompra = ()=>{
    contenidoFacturador(param);
}