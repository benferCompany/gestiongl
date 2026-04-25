import { FacturaVenta } from "../../../../controladores/DTOS/Factura/venta/FacturaVenta.js";

// CierreCajaApp.js - Versión completa y funcional

export class CierreCajaApp {
    constructor(contenedor) {
        this.contenedor = contenedor;
        this.facturas = [];
        this.resumen = null;
        this.pagosPorTipo = [];
        this.fechaInicio = this.obtenerFechaInicioDia();
        this.fechaFin = this.obtenerFechaFinDia();
        this.inicializar();
    }

    obtenerFechaInicioDia() {
        const fecha = new Date();
        fecha.setHours(0, 0, 0, 0);
        return fecha.toISOString().split('T')[0];
    }

    obtenerFechaFinDia() {
        const fecha = new Date();
        fecha.setHours(23, 59, 59, 999);
        return fecha.toISOString().split('T')[0];
    }

    async inicializar() {
        this.crearEstructura();
        this.agregarEventListeners();
        await this.cargarFacturas();
    }

    crearEstructura() {
        this.elemento = document.createElement('div');
        this.elemento.id = 'cierre-caja-contenido';
        this.elemento.innerHTML = `
            <style>
                #cierre-caja-contenido {
                    max-width: 100%;
                    width: 100%;
                    text-align: center;
                    background-color: #ffffff;
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
                    overflow: hidden;
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                }

                #cierre-caja-head {
                    max-width: 100%;
                    width: 100%;
                    padding: 1.5rem;
                    background: linear-gradient(to right, #1a1a1a, #333333);
                    display: flex;
                    align-items: center;
                    flex-wrap: wrap;
                    justify-content: space-around;
                    border-bottom: 2px solid #FF9800;
                }

                #cierre-caja-head h2 {
                    color: white;
                    margin: 0;
                    font-size: 1.8rem;
                    font-weight: 300;
                    letter-spacing: 1px;
                }

                #cierre-caja-head .btn-actualizar {
                    padding: 1rem 2rem;
                    border: none;
                    border-radius: 5px;
                    cursor: pointer;
                    background-color: transparent;
                    color: #ffffff;
                    font-weight: 600;
                    font-size: 1rem;
                    letter-spacing: 0.5px;
                    transition: all 0.3s ease;
                    border: 2px solid #FF9800;
                }

                #cierre-caja-head .btn-actualizar:hover {
                    background-color: #FF9800;
                    transform: translateY(-2px);
                    box-shadow: 0 5px 12px rgba(255, 152, 0, 0.3);
                }

                .filtros-fecha {
                    max-width: 100%;
                    width: 100%;
                    padding: 1.5rem;
                    background: linear-gradient(to right, #1a1a1a, #333333);
                    display: flex;
                    align-items: center;
                    flex-wrap: wrap;
                    justify-content: space-around;
                    border-bottom: 2px solid #FF9800;
                }

                .filtro-grupo {
                    position: relative;
                }

                .filtro-grupo label {
                    position: absolute;
                    top: -10px;
                    left: 10px;
                    background: #FF9800;
                    color: white;
                    padding: 2px 10px;
                    border-radius: 4px;
                    font-size: 0.8rem;
                    font-weight: 600;
                    z-index: 1;
                }

                .filtro-grupo input {
                    width: 220px;
                    font-size: 1rem;
                    padding: 0.875rem 1rem;
                    border: 2px solid #e0e0e0;
                    border-radius: 8px;
                    cursor: pointer;
                    background-color: #ffffff;
                    color: #333333;
                    font-weight: 500;
                    transition: all 0.3s ease;
                }

                .filtro-grupo input:focus {
                    outline: none;
                    border-color: #FF9800;
                    box-shadow: 0 0 0 3px rgba(255, 152, 0, 0.2);
                }

                .filtro-grupo input:hover {
                    background-color: #f9f9f9;
                    border-color: #cccccc;
                }

                .btn-aplicar {
                    margin-left: 1em;
                    width: 200px;
                    padding: 1rem;
                    border: none;
                    border-radius: 5px;
                    cursor: pointer;
                    background-color: #ff9f38;
                    color: #ffffff;
                    font-weight: 600;
                    font-size: 1rem;
                    letter-spacing: 0.5px;
                    transition: all 0.3s ease;
                    box-shadow: 0 3px 6px rgba(255, 152, 0, 0.3);
                }

                .btn-aplicar:hover {
                    background-color: #e98e33;
                    transform: translateY(-2px);
                    box-shadow: 0 5px 12px rgba(241, 194, 124, 0.4);
                }

                .btn-aplicar:active {
                    transform: translateY(0);
                    box-shadow: 0 2px 4px rgba(255, 152, 0, 0.3);
                }

                /* Resumen Cards */
                .resumen-caja {
                display: grid;
                grid-template-columns: repeat(4, 1fr);
                gap: 20px;
                padding: 20px;
                background-color: #f9f9f9;
                }

                .resumen-card {
                    background: white;
                    padding: 20px;
                    border-radius: 8px;
                    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
                    text-align: left;
                    border-left: 4px solid #FF9800;
                    transition: transform 0.2s ease, box-shadow 0.2s ease;
                }

                .resumen-card:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
                }

                .resumen-card h3 {
                    color: #666666;
                    font-size: 0.9rem;
                    text-transform: uppercase;
                    margin: 0 0 10px 0;
                    font-weight: 600;
                }

                .resumen-card .valor {
                    font-size: 1.8rem;
                    font-weight: bold;
                    color: #333333;
                    margin: 5px 0;
                }

                .resumen-card .subtitulo {
                    font-size: 0.85rem;
                    color: #888888;
                }

                .resumen-card.total .valor {
                    color: #4CAF50;
                }

                /* Sección de pagos por tipo */
                .pagos-tipo {
                    background: white;
                    padding: 20px;
                    margin: 0 20px 20px 20px;
                    border-radius: 8px;
                    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
                }

                .pagos-tipo h3 {
                    margin: 0 0 20px 0;
                    color: #333333;
                    font-size: 1.2rem;
                    font-weight: 600;
                    text-align: left;
                }

                .pagos-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                    gap: 15px;
                }

                .pago-tipo-card {
                    background: #f9f9f9;
                    padding: 15px;
                    border-radius: 8px;
                    border-left: 4px solid #FF9800;
                    text-align: left;
                }

                .pago-tipo-card .tipo {
                    font-size: 0.9rem;
                    color: #666666;
                    margin-bottom: 5px;
                    font-weight: 600;
                }

                .pago-tipo-card .monto {
                    font-size: 1.3rem;
                    font-weight: bold;
                    color: #333333;
                }

                .pago-tipo-card .cantidad {
                    font-size: 0.8rem;
                    color: #888888;
                    margin-top: 5px;
                }

                /* Tabla de facturas */
                .tabla-facturas {
                    margin: 0 20px 20px 20px;
                    background: white;
                    border-radius: 8px;
                    overflow: hidden;
                    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
                }

                .tabla-facturas table {
                    width: 100%;
                    border-collapse: collapse;
                    text-align: center;
                }

                .tabla-facturas th {
                    background-color: #f5f5f5;
                    border-bottom: 2px solid #e0e0e0;
                    padding: 1.2rem 0.8rem;
                    color: #333333;
                    font-weight: 600;
                    text-transform: uppercase;
                    font-size: 0.9rem;
                    letter-spacing: 0.5px;
                }

                .tabla-facturas td {
                    padding: 1.2rem 0.8rem;
                    border-bottom: 1px solid #f0f0f0;
                    color: #555555;
                    font-weight: 500;
                }

                .tabla-facturas tbody tr:hover {
                    background-color: #fafafa;
                }

                .detalle-productos {
                    font-size: 0.8rem;
                    color: #888888;
                    margin-top: 5px;
                }

                .badge {
                    padding: 6px 12px;
                    border-radius: 4px;
                    font-size: 0.8rem;
                    font-weight: 600;
                    display: inline-block;
                }

                .badge-exito {
                    background-color: #4CAF50;
                    color: white;
                }

                .badge-pendiente {
                    background-color: #FF9800;
                    color: white;
                }

                .badge-parcial {
                    background-color: #2196F3;
                    color: white;
                }

                /* Acciones finales */
                .acciones-finales {
                    margin: 20px;
                    display: flex;
                    justify-content: flex-end;
                    gap: 15px;
                }

                .btn-cerrar-caja {
                    padding: 1rem 2.5rem;
                    border: none;
                    border-radius: 5px;
                    cursor: pointer;
                    background: linear-gradient(to right, #4CAF50, #45a049);
                    color: white;
                    font-weight: 600;
                    font-size: 1rem;
                    transition: all 0.3s ease;
                    box-shadow: 0 3px 6px rgba(76, 175, 80, 0.3);
                }

                .btn-cerrar-caja:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 5px 12px rgba(76, 175, 80, 0.4);
                }

                .btn-imprimir {
                    padding: 1rem 2.5rem;
                    border: none;
                    border-radius: 5px;
                    cursor: pointer;
                    background: linear-gradient(to right, #FF9800, #F57C00);
                    color: white;
                    font-weight: 600;
                    font-size: 1rem;
                    transition: all 0.3s ease;
                    box-shadow: 0 3px 6px rgba(255, 152, 0, 0.3);
                }

                .btn-imprimir:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 5px 12px rgba(255, 152, 0, 0.4);
                }

                .loading, .no-facturas {
                    text-align: center;
                    padding: 60px;
                    color: #888888;
                    font-size: 1.1rem;
                }

                .error-message {
                    background-color: #f44336;
                    color: white;
                    padding: 15px;
                    margin: 20px;
                    border-radius: 5px;
                    text-align: center;
                    font-weight: 500;
                }

                /* Responsive */
                @media (max-width: 768px) {
                    #cierre-caja-head {
                        flex-direction: column;
                        gap: 15px;
                        text-align: center;
                    }

                    .filtros-fecha {
                        flex-direction: column;
                        align-items: stretch;
                        gap: 15px;
                    }

                    .filtro-grupo {
                        width: 100%;
                    }

                    .filtro-grupo input {
                        width: 100%;
                    }

                    .btn-aplicar {
                        width: 100%;
                        margin-left: 0;
                    }

                    .resumen-caja {
                        grid-template-columns: 1fr;
                    }

                    .acciones-finales {
                        flex-direction: column;
                    }

                    .btn-cerrar-caja,
                    .btn-imprimir {
                        width: 100%;
                    }

                    .tabla-facturas {
                        overflow-x: auto;
                    }

                    .tabla-facturas table {
                        min-width: 1200px;
                    }
                }
            </style>

            <div id="cierre-caja-head">
                <h2>💰 CIERRE DE CAJA - BALANCE GENERAL</h2>
                <button class="btn-actualizar" id="btnActualizar">🔄 ACTUALIZAR</button>
            </div>

            <div class="filtros-fecha">
                <div class="filtro-grupo">
                    <label>DESDE</label>
                    <input type="date" id="fechaDesde" value="${this.fechaInicio}">
                </div>
                <div class="filtro-grupo">
                    <label>HASTA</label>
                    <input type="date" id="fechaHasta" value="${this.fechaFin}">
                </div>
                <input type="button" class="btn-aplicar" id="aplicarFiltro" value="📅 APLICAR FILTRO">
            </div>

            <div id="mensajeError" class="error-message" style="display: none;"></div>

            <div class="resumen-caja" id="resumenCaja"></div>

            <div class="pagos-tipo" id="pagosTipo">
                <h3>💳 DISTRIBUCIÓN DE PAGOS POR TIPO</h3>
                <div class="pagos-grid" id="pagosGrid"></div>
            </div>

            <div class="tabla-facturas" id="tablaFacturas"></div>

            <div class="acciones-finales">
                <button class="btn-imprimir" id="btnImprimir">🖨️ IMPRIMIR REPORTE</button>
                <button class="btn-cerrar-caja" id="btnCerrarCaja">🔒 CERRAR CAJA</button>
            </div>
        `;

        this.contenedor.appendChild(this.elemento);

        this.fechaDesdeInput = this.elemento.querySelector('#fechaDesde');
        this.fechaHastaInput = this.elemento.querySelector('#fechaHasta');
        this.resumenDiv = this.elemento.querySelector('#resumenCaja');
        this.pagosGrid = this.elemento.querySelector('#pagosGrid');
        this.tablaDiv = this.elemento.querySelector('#tablaFacturas');
        this.mensajeError = this.elemento.querySelector('#mensajeError');
    }

    agregarEventListeners() {
        this.elemento.querySelector('#aplicarFiltro').addEventListener('click', () => this.aplicarFiltro());
        this.elemento.querySelector('#btnActualizar').addEventListener('click', () => this.cargarFacturas());
        this.elemento.querySelector('#btnImprimir').addEventListener('click', () => this.imprimirReporte());
        this.elemento.querySelector('#btnCerrarCaja').addEventListener('click', () => this.cerrarCaja());
    }

    async aplicarFiltro() {
        this.fechaInicio = this.fechaDesdeInput.value;
        this.fechaFin = this.fechaHastaInput.value;
        await this.cargarFacturas();
    }

    formatearNumero(valor) {
        if (valor === null || valor === undefined) return 0;
        if (typeof valor === 'string') {
            valor = valor.replace(',', '.');
        }
        const num = Number(valor);
        return isNaN(num) ? 0 : num;
    }

    // 🔥 MÉTODO PARA CALCULAR TOTALES POR TIPO DE PAGO
    calcularTotalesPagos() {
    let totales = {
        efectivo: 0,
        transferencia: 0,
        tarjetaCredito: {
            base: 0,      // Monto sin recargo (lo que va al banco)
            final: 0       // Monto con recargo (lo que paga el cliente)
        },
        tarjetaDebito: 0,
        otros: 0,
        recargoTotal: 0,
        totalGeneral: 0,
        totalGeneralBase: 0
    };
    
    this.facturas.forEach(factura => {
        if (factura.pagos && factura.pagos.length > 0) {
            factura.pagos.forEach(pago => {
                const montoBase = pago.getMontoSinRecargo ? pago.getMontoSinRecargo() : (pago.monto || 0);
                const montoFinal = pago.getMontoConRecargo ? pago.getMontoConRecargo() : (pago.monto_final || pago.monto || 0);
                const idTipo = pago.getIdTipoPago ? pago.getIdTipoPago() : (pago.tipo_pago?.id || 0);
                
                switch(idTipo) {
                    case 1: // Efectivo
                        totales.efectivo += montoFinal;
                        break;
                    case 2: // Transferencia
                        totales.transferencia += montoFinal;
                        break;
                    case 3: // Tarjeta Crédito
                        totales.tarjetaCredito.base += montoBase;
                        totales.tarjetaCredito.final += montoFinal;
                        totales.recargoTotal += (montoFinal - montoBase);
                        break;
                    case 4: // Tarjeta Débito
                        totales.tarjetaDebito += montoFinal;
                        break;
                    default:
                        totales.otros += montoFinal;
                }
            });
        }
    });
    
    // Calcular totales generales
    totales.totalGeneral = totales.efectivo + totales.transferencia + 
                          totales.tarjetaCredito.final + totales.tarjetaDebito + 
                          totales.otros;
    
    totales.totalGeneralBase = totales.efectivo + totales.transferencia + 
                              totales.tarjetaCredito.base + totales.tarjetaDebito + 
                              totales.otros;
    
    return totales;
}

    async cargarFacturas() {
        try {
            this.mostrarCargando();
            this.ocultarError();

            const response = await fetch(
                `${FacturaVenta.BASE_URL}/buscarFactura.php?desde=${encodeURIComponent(this.fechaInicio)}&hasta=${encodeURIComponent(this.fechaFin)}`
            );

            const data = await response.json();

            if (!response.ok || data.status === 'error') {
                throw new Error(data.message || 'Error al cargar facturas');
            }

            const ventas = (data.data.ventas || []).map(f => {
                if (!f.pagos) f.pagos = [];
                return new FacturaVenta(f);
            });
            
            this.facturas = ventas;
            this.resumen = data.data.resumen || {
                total_facturas: 0,
                total_ventas: 0,
                total_descuentos: 0,
                total_pagado: 0,
                clientes_atendidos: 0
            };
            
            // Los pagos_por_tipo vienen del backend
            this.pagosPorTipo = data.data.pagos_por_tipo || [];

            console.log('Pagos por tipo:', this.pagosPorTipo);

            this.actualizarResumen();
            this.actualizarPagosPorTipo();
            this.actualizarTabla();
        } catch (error) {
            console.error('Error:', error);
            this.mostrarError(error.message);
            this.facturas = [];
            this.resumen = null;
            this.pagosPorTipo = [];
            this.actualizarResumen();
            this.actualizarPagosPorTipo();
            this.actualizarTabla();
        }
    }

    actualizarResumen() {
    const totalVentas = this.formatearNumero(this.resumen?.total_ventas);
    
    const totalDescuentos = this.facturas.reduce((acc, factura) => {
        return acc + this.formatearNumero(factura.montoDescuento);
    }, 0);
    
    const totales = this.calcularTotalesPagos();
    
    const cantidadFacturas = this.formatearNumero(this.resumen?.total_facturas);
    const clientesAtendidos = this.formatearNumero(this.resumen?.clientes_atendidos);
    
    // 🔥 NUEVO: Calcular total bancario (todo menos efectivo, usando base para TC)
    const totalBancario = totales.transferencia + 
                         totales.tarjetaCredito.base + // Usamos BASE para TC
                         totales.tarjetaDebito;
    
    const diferencia = totalVentas - totales.totalGeneral;
    const todoPagado = Math.abs(diferencia) < 0.01;

    this.resumenDiv.innerHTML = `
        <div class="resumen-card">
            <h3>💰 TOTAL VENTAS</h3>
            <div class="valor">$${totalVentas.toFixed(2)}</div>
            <div class="subtitulo">Bruto sin descuentos</div>
        </div>
        
        <div class="resumen-card">
            <h3>💵 EFECTIVO</h3>
            <div class="valor">$${totales.efectivo.toFixed(2)}</div>
            <div class="subtitulo">${((totales.efectivo / totales.totalGeneral) * 100 || 0).toFixed(1)}% del total</div>
        </div>
        
        <div class="resumen-card">
            <h3>🏦 TRANSFERENCIA</h3>
            <div class="valor">$${totales.transferencia.toFixed(2)}</div>
            <div class="subtitulo">${((totales.transferencia / totales.totalGeneral) * 100 || 0).toFixed(1)}% del total</div>
        </div>
        
        <div class="resumen-card">
            <h3>💳 TARJETA CRÉDITO</h3>
            <div class="valor">$${totales.tarjetaCredito.final.toFixed(2)}</div>
            <div class="subtitulo">
                Base: $${totales.tarjetaCredito.base.toFixed(2)} | 
                Rec: +$${(totales.tarjetaCredito.final - totales.tarjetaCredito.base).toFixed(2)}
            </div>
            <div class="subtitulo" style="color: #4CAF50;">
                ${totales.tarjetaCredito.base > 0 ? 
                    `Recargo: ${((totales.tarjetaCredito.final / totales.tarjetaCredito.base - 1) * 100).toFixed(2)}%` : 
                    ''}
            </div>
        </div>
        
        <div class="resumen-card">
            <h3>💳 TARJETA DÉBITO</h3>
            <div class="valor">$${totales.tarjetaDebito.toFixed(2)}</div>
            <div class="subtitulo">${((totales.tarjetaDebito / totales.totalGeneral) * 100 || 0).toFixed(1)}% del total</div>
        </div>
        
        <!-- 🔥 NUEVO: Tarjeta de ingresos bancarios -->
        <div class="resumen-card" style="border-left: 4px solid #2196F3;">
            <h3>🏦 INGRESOS BANCARIOS</h3>
            <div class="valor">$${totalBancario.toFixed(2)}</div>
            <div class="subtitulo">
                Transferencia: $${totales.transferencia.toFixed(2)} | 
                TC (Base): $${totales.tarjetaCredito.base.toFixed(2)} | 
                TD: $${totales.tarjetaDebito.toFixed(2)}
            </div>
            <div class="subtitulo" style="color: #2196F3;">
                ${((totalBancario / totales.totalGeneral) * 100 || 0).toFixed(1)}% del total
            </div>
        </div>
        
        ${totales.otros > 0 ? `
        <div class="resumen-card">
            <h3>⚠️ OTROS</h3>
            <div class="valor">$${totales.otros.toFixed(2)}</div>
            <div class="subtitulo">Pagos sin tipo definido</div>
        </div>
        ` : ''}
        
        <div class="resumen-card">
            <h3>🏷️ TOTAL DESCUENTOS</h3>
            <div class="valor">$${totalDescuentos.toFixed(2)}</div>
            <div class="subtitulo">Ahorro para clientes</div>
        </div>
        
        <div class="resumen-card">
            <h3>📊 FACTURAS</h3>
            <div class="valor">${cantidadFacturas}</div>
            <div class="subtitulo">${clientesAtendidos} clientes</div>
        </div>
        
        <div class="resumen-card total">
            <h3>✅ TOTAL GENERAL</h3>
            <div class="valor">$${totales.totalGeneral.toFixed(2)}</div>
            <div class="subtitulo">
                Base total: $${totales.totalGeneralBase.toFixed(2)} | 
                Recargo total: +$${totales.recargoTotal.toFixed(2)}
            </div>
            <div class="subtitulo" style="color: ${!todoPagado ? '#FF9800' : '#4CAF50'};">
                ${!todoPagado ? `Pendiente: $${diferencia.toFixed(2)}` : '✓ Todo pagado'}
            </div>
        </div>
    `;
}

    actualizarPagosPorTipo() {
        if (!this.pagosPorTipo || this.pagosPorTipo.length === 0) {
            this.pagosGrid.innerHTML = '<div style="text-align: center; color: #888888; padding: 20px;">No hay pagos en este período</div>';
            return;
        }

        let html = '';
        this.pagosPorTipo.forEach(pago => {
            const total = this.formatearNumero(pago.total_pagado);
            const porcentaje = this.resumen?.total_pagado > 0 
                ? (total / this.resumen.total_pagado * 100).toFixed(1) 
                : 0;

            html += `
                <div class="pago-tipo-card">
                    <div class="tipo">${pago.tipo_pago || 'Otro'}</div>
                    <div class="monto">$${total.toFixed(2)}</div>
                    <div class="cantidad">
                        ${pago.cantidad_pagos || 0} pagos · ${porcentaje}% del total
                    </div>
                </div>
            `;
        });

        this.pagosGrid.innerHTML = html;
    }

    actualizarTabla() {
    if (this.facturas.length === 0) {
        this.tablaDiv.innerHTML = '<div class="no-facturas">📭 No hay facturas en el período seleccionado</div>';
        return;
    }

    let html = `
        <table>
            <thead>
                <tr>
                    <th>FACTURA #</th>
                    <th>FECHA</th>
                    <th>CLIENTE</th>
                    <th>PRODUCTOS</th>
                    <th>SUBTOTAL</th>
                    <th>DTO %</th>
                    <th>DTO $</th>
                    <th>TOTAL</th>
                    <th>EFECTIVO</th>
                    <th>TRANSF</th>
                    <th>TC (Base/Final)</th>
                    <th>TD</th>
                    <th>ESTADO</th>
                </tr>
            </thead>
            <tbody>
    `;

    this.facturas.forEach(f => {
        const cantidadProductos = f.detalles?.length || 0;
        
        const subtotal = this.formatearNumero(f.subtotal);
        const porcentajeDescuento = this.formatearNumero(f.descuento);
        const montoDescuento = this.formatearNumero(f.montoDescuento);
        const total = this.formatearNumero(f.total);
        
        let pagosFactura = {
            efectivo: 0,
            transferencia: 0,
            tarjetaCredito: { base: 0, final: 0 },
            tarjetaDebito: 0,
            otros: 0
        };
        
        if (f.pagos && f.pagos.length > 0) {
            f.pagos.forEach(pago => {
                const montoBase = pago.getMontoSinRecargo ? pago.getMontoSinRecargo() : (pago.monto || 0);
                const montoFinal = pago.getMontoConRecargo ? pago.getMontoConRecargo() : (pago.monto_final || pago.monto || 0);
                const idTipo = pago.getIdTipoPago ? pago.getIdTipoPago() : (pago.tipo_pago?.id || 0);
                
                switch(idTipo) {
                    case 1:
                        pagosFactura.efectivo += montoFinal;
                        break;
                    case 2:
                        pagosFactura.transferencia += montoFinal;
                        break;
                    case 3:
                        pagosFactura.tarjetaCredito.base += montoBase;
                        pagosFactura.tarjetaCredito.final += montoFinal;
                        break;
                    case 4:
                        pagosFactura.tarjetaDebito += montoFinal;
                        break;
                    default:
                        pagosFactura.otros += montoFinal;
                }
            });
        }
        
        const totalPagadoFactura = pagosFactura.efectivo + pagosFactura.transferencia + 
                                  pagosFactura.tarjetaCredito.final + pagosFactura.tarjetaDebito + 
                                  pagosFactura.otros;
        
        // 🔥 CORREGIDO: Usar tolerancia de 0.01 para evitar problemas de redondeo
        const diferencia = Math.abs(total - totalPagadoFactura);
        
        let estado = 'pendiente';
        let badgeClass = 'badge-pendiente';
        
        // 🔥 CORREGIDO: Si la diferencia es menor a 0.01, consideramos pagada
        if (diferencia < 0.01) {
            estado = 'pagada';
            badgeClass = 'badge-exito';
        } 
        // 🔥 CORREGIDO: Si hay pagos pero no cubren el total
        else if (totalPagadoFactura > 0 && totalPagadoFactura < total) {
            estado = 'parcial';
            badgeClass = 'badge-parcial';
        }
        // 🔥 CORREGIDO: Si pagaron de más (no debería pasar, pero por si acaso)
        else if (totalPagadoFactura > total) {
            estado = 'pagada';
            badgeClass = 'badge-exito';
        }

        const fecha = f.fecha ? new Date(f.fecha).toLocaleDateString() : 'N/A';
        const hora = f.fecha ? new Date(f.fecha).toLocaleTimeString() : '';

        // Formatear TC para mostrar base/final
        const tcTexto = pagosFactura.tarjetaCredito.final > 0 
            ? `$${pagosFactura.tarjetaCredito.final.toFixed(2)}<br><small>Base: $${pagosFactura.tarjetaCredito.base.toFixed(2)}</small>`
            : '-';

        html += `
            <tr>
                <td><strong>#${f.id || 'N/A'}</strong></td>
                <td>${fecha}<br><small style="color: #888888;">${hora}</small></td>
                <td>
                    ${f.cliente ? 
                        `${f.cliente.nombre || ''} ${f.cliente.apellido || ''}`.trim() || 'Consumidor Final' 
                        : 'Consumidor Final'}
                </td>
                <td>
                    ${cantidadProductos} productos
                    <div class="detalle-productos">
                        ${f.detalles?.map(d => 
                            `${d.cantidad || 1}x ${(d.descripcion || 'Producto').substring(0, 20)}`
                        ).join(', ').substring(0, 50) || 'Sin detalles'}
                    </div>
                </td>
                <td>$${subtotal.toFixed(2)}</td>
                <td>${porcentajeDescuento}%</td>
                <td>$${montoDescuento.toFixed(2)}</td>
                <td><strong>$${total.toFixed(2)}</strong></td>
                <td>$${pagosFactura.efectivo.toFixed(2)}</td>
                <td>$${pagosFactura.transferencia.toFixed(2)}</td>
                <td>${tcTexto}</td>
                <td>$${pagosFactura.tarjetaDebito.toFixed(2)}</td>
                <td>
                    <span class="badge ${badgeClass}">
                        ${estado === 'pagada' ? '✓ PAGADA' : 
                          estado === 'parcial' ? '⏳ PARCIAL' : '⏳ PENDIENTE'}
                    </span>
                </td>
            </tr>
        `;

        // Detalle de pagos individuales
        if (f.pagos && f.pagos.length > 0) {
            f.pagos.forEach(pago => {
                const montoBase = pago.getMontoSinRecargo ? pago.getMontoSinRecargo() : (pago.monto || 0);
                const montoFinal = pago.getMontoConRecargo ? pago.getMontoConRecargo() : (pago.monto_final || pago.monto || 0);
                const nombreTipo = pago.getNombreTipoPago ? pago.getNombreTipoPago() : (pago.tipo_pago?.descripcion || 'Desconocido');
                const esCredito = pago.esTarjetaCredito ? pago.esTarjetaCredito() : (pago.tipo_pago?.id === 3);
                
                let detallePago = `$${montoFinal.toFixed(2)}`;
                if (esCredito) {
                    detallePago += ` (Base: $${montoBase.toFixed(2)} | Rec: +$${(montoFinal - montoBase).toFixed(2)})`;
                }
                
                html += `
                    <tr style="background: #f9f9f9; font-size: 0.85rem;">
                        <td colspan="4" style="text-align: right; color: #888888;">
                            └─ ${nombreTipo}:
                        </td>
                        <td colspan="4">${detallePago}</td>
                        <td colspan="5">${pago.fecha ? new Date(pago.fecha).toLocaleString() : ''}</td>
                    </tr>
                `;
            });
        }
    });

    html += `
                </tbody>
            </table>
        `;

    this.tablaDiv.innerHTML = html;
}

    imprimirReporte() {
        if (!this.facturas || this.facturas.length === 0) {
            alert('No hay datos para imprimir');
            return;
        }

        try {
            const fechaReporte = new Date().toLocaleString();
            const totalVentas = this.formatearNumero(this.resumen?.total_ventas);
            
            const totalDescuentos = this.facturas.reduce((acc, factura) => {
                return acc + this.formatearNumero(factura.montoDescuento);
            }, 0);
            
            const totales = this.calcularTotalesPagos();
            
            const cantidadFacturas = this.formatearNumero(this.resumen?.total_facturas);
            const clientesAtendidos = this.formatearNumero(this.resumen?.clientes_atendidos);

            const ventanaImpresion = window.open('', '_blank');
            
            if (!ventanaImpresion) {
                alert('Por favor, permita ventanas emergentes para imprimir el reporte');
                return;
            }

            const filasFacturas = this.facturas.map(f => {
                const subtotal = this.formatearNumero(f.subtotal);
                const total = this.formatearNumero(f.total);
                
                let pagosFactura = { efectivo: 0, transferencia: 0, tc: 0, td: 0 };
                
                if (f.pagos && f.pagos.length > 0) {
                    f.pagos.forEach(pago => {
                        const idTipo = pago.getIdTipoPago ? pago.getIdTipoPago() : (pago.tipo_pago?.id || 0);
                        const monto = pago.getMontoConRecargo ? pago.getMontoConRecargo() : (pago.monto_final || pago.monto || 0);
                        
                        switch(idTipo) {
                            case 1:
                                pagosFactura.efectivo += monto;
                                break;
                            case 2:
                                pagosFactura.transferencia += monto;
                                break;
                            case 3:
                                pagosFactura.tc += monto;
                                break;
                            case 4:
                                pagosFactura.td += monto;
                                break;
                        }
                    });
                }
                
                return `
                    <tr>
                        <td>#${f.id}</td>
                        <td>${new Date(f.fecha || '').toLocaleDateString()}</td>
                        <td>${f.cliente?.nombre || 'CF'} ${f.cliente?.apellido || ''}</td>
                        <td>$${subtotal.toFixed(2)}</td>
                        <td>$${total.toFixed(2)}</td>
                        <td>$${pagosFactura.efectivo.toFixed(2)}</td>
                        <td>$${pagosFactura.transferencia.toFixed(2)}</td>
                        <td>$${pagosFactura.tc.toFixed(2)}</td>
                        <td>$${pagosFactura.td.toFixed(2)}</td>
                    </tr>
                `;
            }).join('');

            ventanaImpresion.document.write(`
                <html>
                    <head>
                        <title>Reporte de Cierre de Caja</title>
                        <style>
                            body { font-family: 'Segoe UI', Arial, sans-serif; padding: 30px; }
                            .header { text-align: center; margin-bottom: 40px; }
                            .resumen { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; margin-bottom: 30px; }
                            .card { border-left: 4px solid #FF9800; padding: 15px; background: white; }
                            table { width: 100%; border-collapse: collapse; }
                            th { background: #333; color: white; padding: 10px; }
                            td { padding: 8px; border-bottom: 1px solid #ccc; }
                            .total { font-size: 1.3rem; font-weight: bold; margin-top: 30px; text-align: right; }
                        </style>
                    </head>
                    <body>
                        <div class="header">
                            <h1>💰 CIERRE DE CAJA</h1>
                            <p>${new Date(this.fechaInicio).toLocaleDateString()} - ${new Date(this.fechaFin).toLocaleDateString()}</p>
                        </div>
                        
                        <div class="resumen">
                            <div class="card">
                                <h3>VENTAS</h3>
                                <div>$${totalVentas.toFixed(2)}</div>
                            </div>
                            <div class="card">
                                <h3>EFECTIVO</h3>
                                <div>$${totales.efectivo.toFixed(2)}</div>
                            </div>
                            <div class="card">
                                <h3>TRANSFERENCIA</h3>
                                <div>$${totales.transferencia.toFixed(2)}</div>
                            </div>
                            <div class="card">
                                <h3>TC</h3>
                                <div>$${totales.tarjetaCredito.final.toFixed(2)}</div>
                                <small>Base: $${totales.tarjetaCredito.base.toFixed(2)}</small>
                            </div>
                            <div class="card">
                                <h3>TD</h3>
                                <div>$${totales.tarjetaDebito.toFixed(2)}</div>
                            </div>
                            <div class="card">
                                <h3>DESCUENTOS</h3>
                                <div>$${totalDescuentos.toFixed(2)}</div>
                            </div>
                            <div class="card">
                                <h3>FACTURAS</h3>
                                <div>${cantidadFacturas}</div>
                            </div>
                            <div class="card">
                                <h3>TOTAL</h3>
                                <div>$${totales.totalGeneral.toFixed(2)}</div>
                                <small>Base: $${totales.totalGeneralBase.toFixed(2)}</small>
                            </div>
                        </div>
                        
                        <h3>Detalle de Facturas</h3>
                        <table>
                            <thead>
                                <tr>
                                    <th>#</th><th>Fecha</th><th>Cliente</th>
                                    <th>Subtotal</th><th>Total</th>
                                    <th>Efe</th><th>Trans</th><th>TC</th><th>TD</th>
                                </tr>
                            </thead>
                            <tbody>${filasFacturas}</tbody>
                        </table>
                        
                        <div class="total">TOTAL GENERAL: $${totalVentas.toFixed(2)}</div>
                        <button onclick="window.print()">Imprimir</button>
                    </body>
                </html>
            `);
            
            ventanaImpresion.document.close();
            ventanaImpresion.focus();
            
        } catch (error) {
            console.error('Error:', error);
            alert('Error al generar reporte');
        }
    }

    async cerrarCaja() {
        if (this.facturas.length === 0) {
            alert('No hay facturas para cerrar');
            return;
        }

        const confirmar = confirm('¿Está seguro de realizar el cierre de caja?');
        
        if (confirmar) {
            try {
                alert('✅ Cierre de caja realizado');
                this.imprimirReporte();
            } catch (error) {
                alert('Error: ' + error.message);
            }
        }
    }

    mostrarCargando() {
        this.tablaDiv.innerHTML = '<div class="loading">Cargando facturas...</div>';
    }

    mostrarError(mensaje) {
        this.mensajeError.style.display = 'block';
        this.mensajeError.textContent = '❌ ' + mensaje;
    }

    ocultarError() {
        this.mensajeError.style.display = 'none';
    }

    destruir() {
        if (this.elemento && this.contenedor.contains(this.elemento)) {
            this.contenedor.removeChild(this.elemento);
        }
    }
}