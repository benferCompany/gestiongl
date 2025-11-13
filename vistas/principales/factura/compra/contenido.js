import { contenidoFacturador } from "../../../../componentes_dinamicos/facturador/contenido.js"
import { handleSelect } from "../../../../componentes_dinamicos/facturador/controlador/eventos.js";
import { URL } from "../../../../controladores/url/url.js";


const param = {
    inputs: [
        { type: "text", name: "", id: "", placeholder: "Tipo de factura" },
        { type: "text", name: "", id: "", placeholder: "Cliente" },
        { type: "text", name: "", id: "", placeholder: "Tipo de pago" }
    ],
    button: [
        {
            value: "Agreagar Producto", evento:(e)=>{e.preventDefault()}
        },
        {
            value: "Generar Factura", evento: (e) => {
                e.preventDefault()
                console.log(e.target);
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
    body :{}
}
export const contenidoCompra = ()=>{
    contenidoFacturador(param);
}