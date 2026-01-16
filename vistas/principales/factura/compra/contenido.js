import { contenidoFacturador } from "../../../../componentes_dinamicos/facturador/contenido.js"
import { handleSelect } from "../../../../componentes_dinamicos/facturador/controlador/eventos.js";
import { formToJSON, tablaAJSON } from "../../../../componentes_dinamicos/tools/tools.js";
import { URL } from "../../../../controladores/url/url.js";
import { mostrarAlerta } from "../../../componentes/alertas.js";


const param = {
    inputs: [
        
        { type: "text", name: "cliente", id: "", placeholder: "Cliente", selector:true, url: URL + "servicios/principales/cliente/buscarCliente.php"},
        { type: "text", name: "id_factura_proveedor", id: "", placeholder: "Id Factura proveedor" }
    ],
    button: [
        {
            value: "Agreagar Producto (F2)", evento:(e)=>{e.preventDefault()}
        },
        {
            value: "Generar Factura", evento: (e,div) => {
                if(e instanceof PointerEvent){
                    e.preventDefault()
                    div = e.target.closest(".form").parentNode;
                    
                }
                const datosFactura = div.querySelectorAll(".spanSubTotal,.spanTotal")
                const formJson = formToJSON(div.querySelector("form"));
                const jsonTable = tablaAJSON(div.querySelector("table"))
                formJson.subTotal = datosFactura[0].innerText.replace("$","");
                formJson.total = datosFactura[1].innerText.replace("$","");
                formJson.productos = jsonTable
                
                if(formJson.productos.length==0){
                     const param = {
                        color: "whitesmoke",
                        background: "rgba(211, 27, 27, 1)",
                        mensaje:"Necesita agregar algún producto."
                    }
                    mostrarAlerta(param)
                    return;
                };
                
                console.log( formJson)
                
                
                
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