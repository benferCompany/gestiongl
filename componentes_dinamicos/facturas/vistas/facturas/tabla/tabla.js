
import { crearFacturaHTML } from "../../../../print/controlador/controlador.js";
import { buttonPagos } from "../../pagos.js";
import { paramPresupuesto } from "../controlador/jsonPresupuesto.js";
import { cssFacturas } from "./style/cssTable.js";

import { updateProduct } from "../../../../tools/tools.js";
import { factura } from "../vista/presupuestoFactura.js";

export const tablaFacturas = (param) => {
 const facturas = param.factura;
 const table = document.createElement("table");
    console.log(param);
    table.innerHTML=`
       ${cssFacturas(param)}
        <thead>
            <tr>
                <th>ID</th>
                <th>Fecha</th>
                <th>${param.select.value=="compra"?"Proveedor":"Cliente"}</th>
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
                let estado = {estado:"Sin Pagos", classEstado:"sin-pagos"};
                if (montoPagado >= factura.factura_total) {
                    estado = {estado:"Pagada", classEstado:"pagada"};
                } else if (montoPagado > 0) {
                    estado = {estado:"Parcial", classEstado:"parcial"};
                }  
                
                return `
                <tr>
                    <td>${factura.factura_id}</td>
                    <td>${factura.factura_fecha}</td>
                    <td>${param.select.value ==="compra"? factura.razon_social:factura.cliente?factura.cliente.nombre + " " + factura.cliente.apellido:"" }</td>
                    <td>${factura.factura_descuento}</td>
                    <td>${factura.factura_total}</td>
                    
                    ${param.selectValue !="presupuesto"?
                    `<td class="${estado.classEstado}">
                        ${estado.estado!="Sin Pagos"?
                                "<button class='button-estado' objeto='"
                                    +JSON.stringify(factura.pagos)+"'>"+estado.estado+"</button>":`<button>${estado.estado}</button>`}
                    </td>`:`

                    <td>

                            <button class="ver-detalles" objeto='${JSON.stringify(factura)}' data-id="${factura.id}" >Ver Detalles</button>
                    </td>`
                
                }

                    <td>
                        ${param.select.value =="presupuesto"?`<button style="background:#1fda66" class="button-presupuesto" objeto='${JSON.stringify(factura)}'>Facturar</button>`:`<button objeto='${JSON.stringify(factura)}' data-id="${factura.id}" class="ver-detalles">Ver Detalles</button>`}
                        
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
            
            crearFacturaHTML(updateObjeto);
        });
    });


    table.querySelectorAll('.button-presupuesto').forEach(async button=>button.addEventListener("click",async(e)=>{
        
        const objeto = JSON.parse(e.target.getAttribute("objeto"));
        const productsUpdate = await updateProduct(objeto.detalles,param.URLS.buscarById);
        
        
        if(productsUpdate) objeto.detalles =productsUpdate;
        paramPresupuesto.defaultData.presupuesto = objeto;
        
        const contenido = document.getElementById("contenido");
        contenido.innerHTML = ""
        contenido.append(factura(paramPresupuesto))
        

        
        
    }))
    return table;


}


