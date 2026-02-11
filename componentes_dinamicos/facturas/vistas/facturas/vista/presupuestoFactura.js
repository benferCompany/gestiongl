import { observarCambios } from "../../../../../controladores/hooks.js";
import { buttonAgregar } from "../../../../facturador/controlador/buttons.js";
import { changeInputs, handleSelect } from "../../../../facturador/controlador/eventos.js";
import { facturaCss } from "../../../../facturador/style/cssFactura.js";
import { jsSelectInputCliente } from "../../../../select/controlador/jsSelectInput.js";

export const factura = (param) => {
 
    /* ===============================
       LIMPIEZA DE FACTURA ANTERIOR
    ================================*/
    const old = document.getElementById("formularioFactura");
    if (old) {
        if (old._observer) old._observer.disconnect();
        old.remove();
    }

    const div = document.createElement("div");
    div.id = "formularioFactura";

    div.innerHTML = `
        ${facturaCss(param)}
        <div class="padre">
            <div class="form">
                <form>
                    ${param.inputs.map(i => `
                        <input 
                            selector="${i.selector ? "true" : ""}" 
                            url="${i.url}" 
                            type="${i.type}" 
                            name="${i.name}" 
                            placeholder="${i.placeholder}">
                    `).join("<br><br>")}

                    <div class="btn">
                        <button type="button" class="btn-agregar">Agregar Producto</button><br><br>
                    </div>

                    <div class="sbt">
                        <b>SubTotal:</b>
                        <span class="spanSubTotal">$0</span>
                    </div><br>

                    <div class="des">
                        <div>
                            <b>Descuento:</b>
                            <span>
                                <input name="descuento" class="inputDes" value="0" type="number">
                            </span>
                        </div>
                        <strong style="color:red;">- $0</strong>
                    </div><br>

                    <div class="resumen">
                        <b>Resumen</b>
                        <div>
                            <strong>TOTAL :</strong>
                            <span class="spanTotal">$0</span>
                        </div>
                    </div><br><br>

                    <button type="button" class="btn-f">Generar Factura</button>
                </form>
            </div>

            <div class="tablas">
                <table>
                    <colgroup>
                        <col style="width:10%">
                        <col style="width:40%">
                        <col style="width:10%">
                        <col style="width:10%">
                        <col style="width:10%">
                        <col style="width:10%">
                        <col style="width:10%">
                    </colgroup>
                    <thead>
                        <tr>
                            ${param.headers.map(h => `<th>${h.header}</th>`).join("")}
                            <th>Acción</th>
                        </tr>
                    </thead>
                    <tbody></tbody>
                </table><br>
            </div>
        </div>
    `;



    /* ===============================
       PRECARGA DESDE JSON
    ================================*/
    if (param.defaultData) {
        cargarFacturaPorDefecto(div, param);
        
    }
    /* ===============================
       OBSERVER (GUARDADO)
    ================================*/
    const observer = observarCambios(div.querySelector("table"), () => {
        changeInputs(div);
    });
    div._observer = observer;

    /* ===============================
       INPUTS SELECTOR
    ================================*/
    div.querySelectorAll('input[selector="true"]').forEach(input => {
        input.addEventListener("input", () => {
            jsSelectInputCliente(input, input.getAttribute("url"));
        });
    });

    /* ===============================
       BOTONES
    ================================*/
    const eventoAgregar = (e) => {
        e.preventDefault();
        param.contenidos.divFactura = div;
        buttonAgregar(param);
    };

    div.querySelectorAll("button").forEach((b, i) => {
        b.innerHTML = param.button[i].value;
        if (i === 0) {
            b.addEventListener("click", eventoAgregar);
        } else {
            b.addEventListener("click", param.button[i].evento);
        }
    });

    /* ===============================
       DESCUENTO / TOTALES
    ================================*/
    const recalcular = () => {
        const subtotal = parseFloat(
            div.querySelector(".spanSubTotal").innerText.replace("$", "")
        ) || 0;

        const descuento = parseFloat(
            div.querySelector(".inputDes").value
        ) || 0;

        const totalDescuento = subtotal * (descuento / 100);
        const total = subtotal - totalDescuento;

        div.querySelector(".des strong").innerText = `- $${totalDescuento.toFixed(2)}`;
        div.querySelector(".spanTotal").innerText = `$${total.toFixed(2)}`;
    };

    div.querySelector(".inputDes").addEventListener("change", recalcular);

    /* ===============================
       TECLADO (UN SOLO HANDLER)
    ================================*/
    if (window._facturaKeyHandler) {
        document.body.removeEventListener("keyup", window._facturaKeyHandler);
    }

    window._facturaKeyHandler = (e) => keyDownEvent(param, e);
    document.body.addEventListener("keyup", window._facturaKeyHandler);


    return div;
};

/* ===============================
   EVENTOS DE TECLADO
================================*/
const keyDownEvent = (param, e) => {

    const facturaActual = document.getElementById("formularioFactura");
    if (!facturaActual) return;

    if (e.key === "F2") {
        if (document.getElementById("fondoOscuro")) return;
        if (!facturaActual.querySelector(".btn-agregar")) return;

        param.contenidos.divFactura = facturaActual;
        buttonAgregar(param);
    }

    if (e.key === "F8") {
        param.button[1].evento(e, facturaActual);
    }
};

/* ===============================
   PRECARGA FACTURA / PRESUPUESTO
================================*/
const cargarFacturaPorDefecto = (div, param) => {
    if (!param.defaultData?.presupuesto) return;

    const data = param.defaultData.presupuesto;
    /* ===== CLIENTE ===== */
    const inputCliente = div.querySelector('input[name="cliente"]');
    if (inputCliente && data.cliente) {
        inputCliente.value = `${data.cliente.nombre} ${data.cliente.apellido}`;
        inputCliente.setAttribute("objeto",JSON.stringify(data.cliente))
    }

    /* ===== PRODUCTOS ===== */
    const tbody = div.querySelector("tbody");
    tbody.innerHTML = "";

    let subtotal = 0;
    data.detalles.forEach((prod,i) => {
      
        const totalProducto =
            (prod.pvp * prod.cantidad) -
            ((prod.pvp * prod.cantidad) * (prod.descuento / 100));

        subtotal += totalProducto;

        const tr = document.createElement("tr");
        tr.innerHTML = `

            
            <td>${prod.id_producto}</td>
            <td>${prod.descripcion}</td>
            <td>${prod.cantidad}</td>
            <td>${prod.costo}</td>
            <td>${prod.pvp}</td>
            
        `;
        tr.class="selected"
        tr.setAttribute("tabindex",i);
        const id_producto =prod.id_producto;
        const detalle_id = prod.id;
        prod.id = id_producto;
        prod.detalle_id = detalle_id;
        const obj = prod;
        tr.object = {obj,param}
        
        handleSelect(tbody, tr)


    });

    /* ===== TOTALES ===== */
   
    div.querySelector(".spanSubTotal").innerText =`$${subtotal.toFixed(2)}`;

    const inputDes = div.querySelector(".inputDes");
    inputDes.value = data.factura_descuento || 0;

    const descuento = parseFloat(inputDes.value) || 0;
    const totalDescuento = subtotal * (descuento / 100);
    const total = subtotal - totalDescuento;

    div.querySelector(".des strong").innerText = `- $${totalDescuento.toFixed(2)}`;
    div.querySelector(".spanTotal").innerText = `$${total.toFixed(2)}`;
};
