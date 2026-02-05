import { crearFacturaHTML } from "../../../../print/controlador/controlador.js";
import { buttonPagos } from "../../pagos.js";
import { cssFacturas } from "./style/cssTable.js";

export const tablaFacturas = (param) => {
 const facturas = param.factura;
 const table = document.createElement("table");
    table.innerHTML=`
       ${cssFacturas(param)}
        <thead>
            <tr>
                <th>ID</th>
                <th>Fecha</th>
                <th>${param.select.value}</th>
                <th>descuento</th>
                <th>Total</th>
                <th>Estado</th>
                <th>Acciones</th>
            </tr>
        </thead>
        <tbody>
             ${facturas.map(factura =>{
                let montoPagado = 0;
                factura.pagos.forEach(pago => {
                    pago.total = factura.factura_total;
                    montoPagado += pago.monto;
                });
                let estado = "Sin Pagos";
                if (montoPagado >= factura.factura_total) {
                    estado = "Pagada";
                } else if (montoPagado > 0) {
                    estado = "Parcial";
                }   
                return `
                <tr>
                    <td>${factura.factura_id}</td>
                    <td>${factura.factura_fecha}</td>
                    <td>${factura.nombre?factura.nombre+" "+factura.apellido:factura.razon_social}</td>
                    <td>${factura.factura_descuento}</td>
                    <td>${factura.factura_total}</td>
                    <td>${estado!="Sin Pagos"?
                        "<button class='button-estado' objeto='"
                            +JSON.stringify(factura.pagos)+"'>"+estado+"</button>":estado}</td>
                    <td>
                        <button objeto='${JSON.stringify(factura)}' data-id="${factura.id}" class="ver-detalles">Ver Detalles</button>
                    </td>
                </tr>
             `}).join('')}  
            
        </tbody>
    `;
    table.querySelectorAll(".button-estado").forEach(button => {
        button.addEventListener("click",buttonPagos);
    });
    table.querySelectorAll(".ver-detalles").forEach(button => {
        button.addEventListener("click", (e)=>{
            const objeto = JSON.parse(e.target.getAttribute("objeto"));
            const productos = objeto.detalles.map(prod => {
                const precioBase = prod.costo ?? prod.pvp; // Si prod.costo es null o undefined, usar prod.pvp
                const descuento = prod.descuento ?? 0;    // Si no hay descuento, asumimos 0
                return {
                    ...prod,
                    total: (precioBase * prod.cantidad) - descuento
                };
            });

            const updateObjeto = {...objeto, productos: productos,
                 total: (parseFloat(objeto.factura_total) - parseFloat(objeto.factura_descuento)).toFixed(2),
                 subTotal: objeto.factura_total,
                 descuento: objeto.factura_descuento,
                 fecha: objeto.factura_fecha,
                 id_factura_cliente: objeto.factura_id
                };
            console.log(param);
            crearFacturaHTML(updateObjeto);
        });
    });

    return table;

}