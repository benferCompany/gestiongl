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
                        "<button class='button-estado' objeto="
                            +JSON.stringify(factura.pagos)+">"+estado+"</button>":estado}</td>
                    <td>
                        <button data-id="${factura.id}" class="ver-detalles">Ver Detalles</button>
                    </td>
                </tr>
             `}).join('')}  
            
        </tbody>
    `;
    table.querySelectorAll(".button-estado").forEach(button => {
        button.addEventListener("click",buttonPagos);
    });

    return table;

}