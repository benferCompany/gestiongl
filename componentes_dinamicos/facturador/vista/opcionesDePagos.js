import { mostrarAlerta } from "../../../vistas/componentes/alertas.js";
import { crearTablaPagos } from "../controlador/tipoFactura.js";
import { cssOpcionesDePago } from "../style/cssOpcionesDePagos.js";

export const crearPagos = (data = { total: 100, Tarjetas: [] }, objeto, div, coeficienteDebito = 5) => {

    const container = document.createElement("div");
    container.className = "pagos-container";

    const pagos = [];

    /* ================= TOTAL ================= */

    const totalDiv = document.createElement("div");
    totalDiv.className = "pagos-total";
    totalDiv.textContent = `Total: $${data.total} | Restante: $${data.total}`;
    container.appendChild(totalDiv);

    /* ================= LISTA SCROLL ================= */

    const listaPagos = document.createElement("div");
    listaPagos.className = "pagos-lista";
    container.appendChild(listaPagos);

    /* ================= BOTON AGREGAR ================= */

    const agregarBtn = document.createElement("button");
    agregarBtn.textContent = "Agregar medio de pago";
    agregarBtn.className = "pagos-btn pagos-btn-primary";
    container.appendChild(agregarBtn);

    const tipoPagoDB = {
        efectivo: { id: 1, descripcion: "Efectivo" },
        transferencia: { id: 2, descripcion: "Transferencia" },
        credito: { id: 3, descripcion: "Tarjeta de Credito" },
        debito: { id: 4, descripcion: "Tarjeta de Debito" }
    };

    function validarPagos() {
        // Verificar si hay pagos de tarjeta de crédito sin completar
        for (let i = 0; i < pagos.length; i++) {
            const pago = pagos[i];
            if (!pago) continue;
            
            if (pago.tipo === "credito") {
                // Si es crédito, debe tener tarjeta seleccionada y cuotas seleccionadas
                if (!pago.nombreTarjeta || pago.nombreTarjeta === "" || !pago.cuotas || pago.cuotas === 0) {
                    return false;
                }
            }
        }
        return true;
    }

    function mostrarError(message) {
        // Eliminar error anterior si existe
      mostrarAlerta({
            color: "#1e293b",
            background: "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)",
            mensaje:message
        })
    }

    function actualizarTotal() {
        let asignado = pagos.reduce((acc, p) => p ? acc + (p.monto || 0) : acc, 0);
        totalDiv.textContent = `Total: $${data.total} | Restante: $${(data.total - asignado).toFixed(2)}`;

        pagos.forEach((p, idx) => {
            if (!p) return;

            const divPago = listaPagos.querySelector(`[data-index='${idx}']`);
            if (!divPago) return;

            // Actualizar monto con recargo para crédito
            if (p.tipo === "credito") {
                const totalTarjetaSpan = divPago.querySelector(".montoRealTarjeta");
                const coef = p.coeficiente || 0;
                totalTarjetaSpan.textContent =
                    `Monto con recargo: $${(p.monto * (1 + coef / 100)).toFixed(2)}`;
            }
            
            // Actualizar monto con recargo para débito
            if (p.tipo === "debito") {
                const totalDebitoSpan = divPago.querySelector(".montoRealDebito");
                if (totalDebitoSpan) {
                    totalDebitoSpan.textContent =
                        `Monto con recargo (${coeficienteDebito}%): $${(p.monto * (1 + coeficienteDebito / 100)).toFixed(2)}`;
                }
            }
        });
    }

    function generarJSON() {
        const result = { total: data.total, pagos: [] };

        pagos.forEach(p => {
            if (!p) return;

            const tipo = tipoPagoDB[p.tipo];
            if (!tipo) return;

            const pagoDB = {
                id_tipo_pago: tipo.id,
                descripcion: tipo.descripcion,
                monto: p.monto
            };

            if (p.tipo === "credito") {
                pagoDB.tarjeta = p.nombreTarjeta;
                pagoDB.cuotas = p.cuotas;
                pagoDB.coeficiente = p.coeficiente;
                pagoDB.monto_final =
                    +(p.monto * (1 + p.coeficiente / 100)).toFixed(2);
            }

            if (p.tipo === "debito") {
                pagoDB.coeficiente = coeficienteDebito;
                pagoDB.monto_final =
                    +(p.monto * (1 + coeficienteDebito / 100)).toFixed(2);
            }

            result.pagos.push(pagoDB);
        });

        return result;
    }

    function agregarPago() {

        const index = pagos.length;
        pagos.push({ tipo: "", monto: 0, cuotas: 0, coeficiente: 0, nombreTarjeta: "" });

        const divPago = document.createElement("div");
        divPago.className = "pago-item";
        divPago.dataset.index = index;

        divPago.innerHTML = `
            <style>${cssOpcionesDePago()}</style>
            <select class="medioPago">
                <option value="">Seleccionar medio de pago</option>
                <option value="efectivo">Efectivo</option>
                <option value="transferencia">Transferencia</option>
                <option value="debito">Tarjeta de débito</option>
                <option value="credito">Tarjeta de crédito</option>
            </select>

            <input type="number" class="montoPago" placeholder="Monto a pagar" min="0"/>

            <div class="debitoOpciones debito-opciones" style="display: none;">
                <div class="montoRealDebito monto-real">
                    Monto con recargo (${coeficienteDebito}%): $0
                </div>
            </div>

            <div class="creditoOpciones credito-opciones" style="display: none;">
                <select class="nombreTarjeta">
                    <option value="">Seleccionar tarjeta</option>
                    ${data.Tarjetas.map(t =>
                        `<option value="${t.id}">${t.descripcion}</option>`
                    ).join("")}
                </select>

                <select class="cuotas">
                    <option value="">Seleccionar cantidad de cuotas</option>
                </select>

                <div class="montoRealTarjeta monto-real">
                    Monto con recargo: $0
                </div>
            </div>

            <button class="quitarPago pagos-btn pagos-btn-danger">
                Quitar
            </button>
        `;

        const selectMedio = divPago.querySelector(".medioPago");
        const montoInput = divPago.querySelector(".montoPago");
        const debitoDiv = divPago.querySelector(".debitoOpciones");
        const creditoDiv = divPago.querySelector(".creditoOpciones");
        const tarjetaSelect = divPago.querySelector(".nombreTarjeta");
        const cuotasSelect = divPago.querySelector(".cuotas");
        const quitarBtn = divPago.querySelector(".quitarPago");

        // Inicialmente ocultar opciones
        debitoDiv.style.display = "none";
        creditoDiv.style.display = "none";

        selectMedio.addEventListener("change", () => {
            pagos[index].tipo = selectMedio.value;
            
            // Ocultar todas las opciones primero
            debitoDiv.style.display = "none";
            creditoDiv.style.display = "none";
            
            if (selectMedio.value === "credito") {
                creditoDiv.style.display = "block";
                // Resetear valores de tarjeta y cuotas
                pagos[index].nombreTarjeta = "";
                pagos[index].cuotas = 0;
                pagos[index].coeficiente = 0;
            } else if (selectMedio.value === "debito") {
                debitoDiv.style.display = "block";
                pagos[index].coeficiente = coeficienteDebito;
                // Actualizar el monto con recargo para débito
                actualizarTotal();
            } else {
                // Limpiar valores de crédito y débito
                pagos[index].nombreTarjeta = "";
                pagos[index].cuotas = 0;
                pagos[index].coeficiente = 0;
            }
            actualizarTotal();
        });

        montoInput.addEventListener("input", () => {
            pagos[index].monto = parseFloat(montoInput.value) || 0;
            actualizarTotal();
        });

        tarjetaSelect.addEventListener("change", () => {
            const tarjetaId = parseInt(tarjetaSelect.value);
            const tarjeta = data.Tarjetas.find(t => t.id === tarjetaId);

            pagos[index].nombreTarjeta = tarjeta?.descripcion || "";
            
            // Limpiar y llenar select de cuotas
            cuotasSelect.innerHTML =
                `<option value="">Seleccionar cantidad de cuotas</option>`;

            if (tarjeta) {
                Object.keys(tarjeta.coeficientes).forEach(c => {
                    cuotasSelect.innerHTML +=
                        `<option value="${c}">${c} cuotas (${tarjeta.coeficientes[c]}%)</option>`;
                });
            }

            pagos[index].coeficiente = 0;
            pagos[index].cuotas = 0;
            actualizarTotal();
        });

        cuotasSelect.addEventListener("change", () => {
            const tarjetaId = parseInt(tarjetaSelect.value);
            const tarjeta = data.Tarjetas.find(t => t.id === tarjetaId);
            const cuotas = parseInt(cuotasSelect.value) || 0;

            pagos[index].cuotas = cuotas;
            pagos[index].coeficiente =
                tarjeta && cuotas ? (tarjeta.coeficientes[cuotas] || 0) : 0;

            actualizarTotal();
        });

        quitarBtn.addEventListener("click", () => {
            divPago.remove();
            pagos[index] = null;
            actualizarTotal();
        });

        listaPagos.appendChild(divPago);
    }

    agregarBtn.addEventListener("click", agregarPago);
    agregarPago();

    const jsonBtn = document.createElement("button");
    jsonBtn.textContent = "Confirmar pagos";
    jsonBtn.className = "pagos-btn pagos-btn-primary";
    jsonBtn.style.marginTop = "10px";

    jsonBtn.addEventListener("click", () => {
        
        // Validar que todos los pagos de tarjeta tengan tarjeta y cuotas seleccionadas
        if (!validarPagos()) {
            mostrarError("Debe seleccionar la tarjeta y la cantidad de cuotas para todos los pagos con tarjeta de crédito antes de confirmar.");
            return;
        }

        const finalJSON = generarJSON();

        const suma = finalJSON.pagos.reduce(
            (acc, p) => acc + (p.monto || 0),
            0
        );

        finalJSON.totalMontoFinal = finalJSON.pagos.reduce(
            (acc, p) => acc + (p.monto_final || p.monto),
            0
        );

        if (suma < finalJSON.total) {
            mostrarError("El total de los pagos no cubre el monto total de la factura.");
            return;
        }

        if (suma > finalJSON.total) {
            mostrarError("El total de los pagos supera el monto total de la factura.");
            return;
        }

        // Limpiar cualquier error anterior
        const errorAnterior = container.querySelector(".pagos-error");
        if (errorAnterior) errorAnterior.remove();

        objeto.finalJSON = finalJSON;

        const fondoOscuro = document.getElementById("fondoOscuro");
        if (fondoOscuro) fondoOscuro.remove();

        crearTablaPagos(finalJSON, div);
    });

    container.appendChild(jsonBtn);
    console.log(container)
    return container;
};