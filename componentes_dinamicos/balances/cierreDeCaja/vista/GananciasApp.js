// GananciasApp.js - Versión adaptada a tu estilo
import {Ganancias} from "../../../../controladores/DTOS/Factura/venta/Ganancias.js"

export class GananciasApp {
    constructor(contenedor) {
        this.contenedor = contenedor;
        this.ganancias = null;
        this.productosDetalle = [];
        this.fechaInicio = this.obtenerFechaInicioMes();
        this.fechaFin = this.obtenerFechaFinDia();
        this.inicializar();
    }

    obtenerFechaInicioMes() {
        const fecha = new Date();
        fecha.setDate(1);
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
        await this.cargarGanancias();
    }

    crearEstructura() {
        this.elemento = document.createElement('div');
        this.elemento.id = 'ganancias-contenido';
        this.elemento.innerHTML = `
            <style>
                #ganancias-contenido {
                    max-width: 100%;
                    width: 100%;
                    text-align: center;
                    background-color: #ffffff;
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
                    overflow: hidden;
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                }

                #ganancias-head {
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

                #ganancias-head .filtro-grupo {
                    position: relative;
                }

                #ganancias-head .filtro-grupo label {
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

                #ganancias-head input[type="date"] {
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

                #ganancias-head input[type="date"]:focus {
                    outline: none;
                    border-color: #FF9800;
                    box-shadow: 0 0 0 3px rgba(255, 152, 0, 0.2);
                }

                #ganancias-head input[type="date"]:hover {
                    background-color: #f9f9f9;
                    border-color: #cccccc;
                }

                #ganancias-head .btn-aplicar {
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

                #ganancias-head .btn-aplicar:hover {
                    background-color: #e98e33;
                    transform: translateY(-2px);
                    box-shadow: 0 5px 12px rgba(241, 194, 124, 0.4);
                }

                #ganancias-head .btn-aplicar:active {
                    transform: translateY(0);
                    box-shadow: 0 2px 4px rgba(255, 152, 0, 0.3);
                }

                #ganancias-head .btn-actualizar {
                    margin-left: 1em;
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

                #ganancias-head .btn-actualizar:hover {
                    background-color: #FF9800;
                    transform: translateY(-2px);
                    box-shadow: 0 5px 12px rgba(255, 152, 0, 0.3);
                }

                /* Cards de resumen */
                #resumen-ganancias {
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
                    display: flex;
                    align-items: center;
                    gap: 10px;
                }

                .badge-margen {
                    display: inline-block;
                    padding: 4px 12px;
                    border-radius: 4px;
                    font-size: 0.8rem;
                    font-weight: 600;
                }

                .badge-excelente {
                    background-color: #4CAF50;
                    color: white;
                }

                .badge-bueno {
                    background-color: #2196F3;
                    color: white;
                }

                .badge-regular {
                    background-color: #FF9800;
                    color: white;
                }

                .badge-malo {
                    background-color: #f44336;
                    color: white;
                }

                /* Tabs */
                .tabs-container {
                    padding: 20px;
                    background: white;
                }

                .tabs {
                    display: flex;
                    gap: 10px;
                    border-bottom: 2px solid #f0f0f0;
                    padding-bottom: 10px;
                    margin-bottom: 20px;
                }

                .tab-btn {
                    padding: 12px 24px;
                    background: none;
                    border: none;
                    cursor: pointer;
                    font-size: 1rem;
                    color: #666666;
                    font-weight: 600;
                    border-radius: 6px;
                    transition: all 0.3s ease;
                }

                .tab-btn:hover {
                    background-color: #f5f5f5;
                    color: #333333;
                }

                .tab-btn.active {
                    background: linear-gradient(to right, #1a1a1a, #333333);
                    color: white;
                }

                .tab-content {
                    display: none;
                }

                .tab-content.active {
                    display: block;
                }

                /* Tablas */
                .tabla-container {
                    background: white;
                    border-radius: 8px;
                    overflow: hidden;
                    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
                }

                #ganancias-contenido table {
                    width: 100%;
                    border-collapse: collapse;
                    text-align: center;
                }

                #ganancias-contenido table thead {
                    background-color: #f5f5f5;
                    border-bottom: 2px solid #e0e0e0;
                }

                #ganancias-contenido table th {
                    padding: 1.2rem 0.8rem;
                    color: #333333;
                    font-weight: 600;
                    text-transform: uppercase;
                    font-size: 0.9rem;
                    letter-spacing: 0.5px;
                }

                #ganancias-contenido table tbody tr {
                    border-bottom: 1px solid #f0f0f0;
                    transition: background-color 0.2s ease;
                }

                #ganancias-contenido table tbody tr:hover {
                    background-color: #fafafa;
                }

                #ganancias-contenido table td {
                    padding: 1.2rem 0.8rem;
                    color: #555555;
                    font-weight: 500;
                }

                .text-right {
                    text-align: right !important;
                }

                .text-success {
                    color: #4CAF50;
                    font-weight: 600;
                }

                .progress-bar {
                    width: 100px;
                    height: 6px;
                    background: #e0e0e0;
                    border-radius: 3px;
                    overflow: hidden;
                    display: inline-block;
                    margin-left: 10px;
                }

                .progress-fill {
                    height: 100%;
                    background: linear-gradient(to right, #FF9800, #F57C00);
                    transition: width 0.3s;
                }

                .loading, .no-data {
                    text-align: center;
                    padding: 60px;
                    color: #888888;
                    font-size: 1.1rem;
                }

                /* Responsive */
                @media (max-width: 1200px) {
                    #resumen-ganancias {
                        grid-template-columns: repeat(2, 1fr);
                    }
                }

                @media (max-width: 768px) {
                    #ganancias-head {
                        flex-direction: column;
                        align-items: stretch;
                        padding: 1.2rem;
                        gap: 15px;
                    }

                    #ganancias-head .filtro-grupo {
                        width: 100%;
                    }

                    #ganancias-head input[type="date"],
                    #ganancias-head .btn-aplicar,
                    #ganancias-head .btn-actualizar {
                        width: 100%;
                        margin-left: 0;
                    }

                    #resumen-ganancias {
                        grid-template-columns: 1fr;
                    }

                    .tabs {
                        flex-direction: column;
                    }

                    .tab-btn {
                        width: 100%;
                    }

                    #ganancias-contenido table th,
                    #ganancias-contenido table td {
                        padding: 0.8rem 0.5rem;
                        font-size: 0.85rem;
                    }
                }
            </style>

            <div id="ganancias-head">
                <div class="filtro-grupo">
                    <label>DESDE</label>
                    <input type="date" id="fechaDesde" value="${this.fechaInicio}">
                </div>
                <div class="filtro-grupo">
                    <label>HASTA</label>
                    <input type="date" id="fechaHasta" value="${this.fechaFin}">
                </div>
                <input type="button" id="aplicarFiltro" class="btn-aplicar" value="📊 ANALIZAR">
                <button id="btnActualizar" class="btn-actualizar">🔄 ACTUALIZAR</button>
            </div>

            <div id="resumen-ganancias"></div>

            <div class="tabs-container">
                <div class="tabs">
                    <button class="tab-btn active" data-tab="resumen">📈 RESUMEN GENERAL</button>
                    <button class="tab-btn" data-tab="productos">📦 POR PRODUCTO</button>
                    <button class="tab-btn" data-tab="facturas">🧾 POR FACTURA</button>
                </div>

                <div id="tabResumen" class="tab-content active"></div>
                <div id="tabProductos" class="tab-content"></div>
                <div id="tabFacturas" class="tab-content"></div>
            </div>
        `;

        this.contenedor.appendChild(this.elemento);

        this.fechaDesdeInput = this.elemento.querySelector('#fechaDesde');
        this.fechaHastaInput = this.elemento.querySelector('#fechaHasta');
        this.resumenDiv = this.elemento.querySelector('#resumen-ganancias');
        this.tabResumen = this.elemento.querySelector('#tabResumen');
        this.tabProductos = this.elemento.querySelector('#tabProductos');
        this.tabFacturas = this.elemento.querySelector('#tabFacturas');
    }

    agregarEventListeners() {
        this.elemento.querySelector('#aplicarFiltro').addEventListener('click', () => this.aplicarFiltro());
        this.elemento.querySelector('#btnActualizar').addEventListener('click', () => this.cargarGanancias());

        // Tabs
        this.elemento.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.elemento.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                
                this.elemento.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
                this.elemento.querySelector(`#tab${e.target.dataset.tab.charAt(0).toUpperCase() + e.target.dataset.tab.slice(1)}`).classList.add('active');
            });
        });
    }

    async aplicarFiltro() {
        this.fechaInicio = this.fechaDesdeInput.value;
        this.fechaFin = this.fechaHastaInput.value;
        await this.cargarGanancias();
    }

    formatearNumero(valor) {
        const num = Number(valor);
        return isNaN(num) ? 0 : num;
    }

    async cargarGanancias() {
        try {
            this.mostrarCargando();

            const response = await fetch(
                `/servicios/principales/factura/venta/consultarGanancias.php?desde=${encodeURIComponent(this.fechaInicio)}&hasta=${encodeURIComponent(this.fechaFin)}`
            );

            const data = await response.json();

            if (data.status === 'error') {
                throw new Error(data.message);
            }

            this.ganancias = new Ganancias(data.data);
            
            // Cargar detalle por producto
            const responseProductos = await fetch(
                `/servicios/principales/factura/venta/consultarGananciasPorProducto.php?desde=${encodeURIComponent(this.fechaInicio)}&hasta=${encodeURIComponent(this.fechaFin)}`
            );
            const dataProductos = await responseProductos.json();
            this.productosDetalle = dataProductos.data || [];

            this.actualizarResumen();
            this.actualizarTabResumen();
            this.actualizarTabProductos();
            this.actualizarTabFacturas();

        } catch (error) {
            console.error('Error:', error);
            this.mostrarError(error.message);
        }
    }

    actualizarResumen() {
        const ventas = this.formatearNumero(this.ganancias?.ventas_totales);
        const costo = this.formatearNumero(this.ganancias?.costo_ventas);
        const ganancia = this.formatearNumero(this.ganancias?.ganancia_bruta);
        const margen = this.formatearNumero(this.ganancias?.margen_bruto);

        let margenClass = 'badge-regular';
        let margenText = 'Regular';
        
        if (margen >= 40) {
            margenClass = 'badge-excelente';
            margenText = 'Excelente';
        } else if (margen >= 25) {
            margenClass = 'badge-bueno';
            margenText = 'Buena';
        } else if (margen >= 10) {
            margenClass = 'badge-regular';
            margenText = 'Regular';
        } else {
            margenClass = 'badge-malo';
            margenText = 'Baja';
        }

        this.resumenDiv.innerHTML = `
            <div class="resumen-card">
                <h3>💰 VENTAS TOTALES</h3>
                <div class="valor">$${ventas.toFixed(2)}</div>
                <div class="subtitulo">${this.ganancias?.facturas_count || 0} facturas emitidas</div>
            </div>
            <div class="resumen-card">
                <h3>📦 COSTO DE VENTAS</h3>
                <div class="valor">$${costo.toFixed(2)}</div>
                <div class="subtitulo">${this.ganancias?.productos_vendidos || 0} productos vendidos</div>
            </div>
            <div class="resumen-card">
                <h3>📈 GANANCIA BRUTA</h3>
                <div class="valor" style="color: #4CAF50;">$${ganancia.toFixed(2)}</div>
                <div class="subtitulo">
                    <span>Margen:</span>
                    <span class="badge-margen ${margenClass}">${margen.toFixed(1)}% - ${margenText}</span>
                </div>
            </div>
            <div class="resumen-card">
                <h3>📊 TICKET PROMEDIO</h3>
                <div class="valor">$${(ventas / (this.ganancias?.facturas_count || 1)).toFixed(2)}</div>
                <div class="subtitulo">por factura</div>
            </div>
        `;
    }

    actualizarTabResumen() {
        if (!this.ganancias) {
            this.tabResumen.innerHTML = '<div class="no-data">No hay datos disponibles</div>';
            return;
        }

        const gananciaNeta = this.formatearNumero(this.ganancias?.ganancia_neta);
        const margenNeto = this.formatearNumero(this.ganancias?.margen_neto);

        this.tabResumen.innerHTML = `
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                <div class="tabla-container">
                    <table>
                        <thead>
                            <tr>
                                <th colspan="2">📊 MÉTRICAS PRINCIPALES</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Ventas Totales:</td>
                                <td class="text-right"><strong>$${this.ganancias.ventas_totales.toFixed(2)}</strong></td>
                            </tr>
                            <tr>
                                <td>Costo de Ventas:</td>
                                <td class="text-right">$${this.ganancias.costo_ventas.toFixed(2)}</td>
                            </tr>
                            <tr style="background-color: #f9f9f9;">
                                <td><strong>Ganancia Bruta:</strong></td>
                                <td class="text-right"><strong class="text-success">$${this.ganancias.ganancia_bruta.toFixed(2)}</strong></td>
                            </tr>
                            <tr>
                                <td>Margen Bruto:</td>
                                <td class="text-right">
                                    ${this.ganancias.margen_bruto.toFixed(1)}%
                                    <div class="progress-bar">
                                        <div class="progress-fill" style="width: ${Math.min(this.ganancias.margen_bruto, 100)}%"></div>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>Gastos Operativos:</td>
                                <td class="text-right">$${this.ganancias.gastos_operativos.toFixed(2)}</td>
                            </tr>
                            <tr style="background-color: #f9f9f9;">
                                <td><strong>Ganancia Neta:</strong></td>
                                <td class="text-right"><strong class="text-success">$${gananciaNeta.toFixed(2)}</strong></td>
                            </tr>
                            <tr>
                                <td>Margen Neto:</td>
                                <td class="text-right">${margenNeto.toFixed(1)}%</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div class="tabla-container">
                    <table>
                        <thead>
                            <tr>
                                <th colspan="2">📈 INDICADORES</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Facturas Emitidas:</td>
                                <td class="text-right"><strong>${this.ganancias.facturas_count}</strong></td>
                            </tr>
                            <tr>
                                <td>Productos Vendidos:</td>
                                <td class="text-right"><strong>${this.ganancias.productos_vendidos}</strong></td>
                            </tr>
                            <tr>
                                <td>Ticket Promedio:</td>
                                <td class="text-right"><strong>$${(this.ganancias.ventas_totales / this.ganancias.facturas_count || 0).toFixed(2)}</strong></td>
                            </tr>
                            <tr>
                                <td>Ganancia por Factura:</td>
                                <td class="text-right"><strong class="text-success">$${(this.ganancias.ganancia_bruta / this.ganancias.facturas_count || 0).toFixed(2)}</strong></td>
                            </tr>
                            <tr>
                                <td>Ganancia por Producto:</td>
                                <td class="text-right"><strong class="text-success">$${(this.ganancias.ganancia_bruta / this.ganancias.productos_vendidos || 0).toFixed(2)}</strong></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        `;
    }

    actualizarTabProductos() {
        if (!this.productosDetalle || this.productosDetalle.length === 0) {
            this.tabProductos.innerHTML = '<div class="no-data">No hay productos vendidos en este período</div>';
            return;
        }

        let html = `
            <div class="tabla-container">
                <table>
                    <thead>
                        <tr>
                            <th>PRODUCTO</th>
                            <th>CANTIDAD</th>
                            <th>VENTAS</th>
                            <th>COSTO</th>
                            <th>GANANCIA</th>
                            <th>MARGEN</th>
                            <th>RENTABILIDAD</th>
                        </tr>
                    </thead>
                    <tbody>
        `;

        this.productosDetalle.sort((a, b) => b.ganancia_total - a.ganancia_total).forEach(prod => {
            const margen = prod.margen_bruto || 0;
            let rentabilidadClass = '';
            let rentabilidadText = '';

            if (margen >= 40) {
                rentabilidadClass = 'badge-excelente';
                rentabilidadText = 'Excelente';
            } else if (margen >= 25) {
                rentabilidadClass = 'badge-bueno';
                rentabilidadText = 'Buena';
            } else if (margen >= 10) {
                rentabilidadClass = 'badge-regular';
                rentabilidadText = 'Regular';
            } else {
                rentabilidadClass = 'badge-malo';
                rentabilidadText = 'Baja';
            }

            html += `
                <tr>
                    <td><strong>${prod.descripcion}</strong></td>
                    <td class="text-right">${prod.cantidad_vendida} unid.</td>
                    <td class="text-right">$${prod.total_ventas.toFixed(2)}</td>
                    <td class="text-right">$${prod.total_costos.toFixed(2)}</td>
                    <td class="text-right"><strong class="text-success">$${prod.ganancia_total.toFixed(2)}</strong></td>
                    <td class="text-right">${margen.toFixed(1)}%</td>
                    <td>
                        <span class="badge-margen ${rentabilidadClass}">${rentabilidadText}</span>
                    </td>
                </tr>
            `;
        });

        html += `
                    </tbody>
                </table>
            </div>
        `;

        this.tabProductos.innerHTML = html;
    }

    actualizarTabFacturas() {
        if (!this.ganancias?.detalle_por_factura || this.ganancias.detalle_por_factura.length === 0) {
            this.tabFacturas.innerHTML = '<div class="no-data">No hay facturas en este período</div>';
            return;
        }

        let html = `
            <div class="tabla-container">
                <table>
                    <thead>
                        <tr>
                            <th>FACTURA #</th>
                            <th>FECHA</th>
                            <th>TOTAL VENTA</th>
                            <th>COSTO</th>
                            <th>GANANCIA</th>
                            <th>MARGEN</th>
                        </tr>
                    </thead>
                    <tbody>
        `;

        this.ganancias.detalle_por_factura.forEach(fact => {
            const margen = fact.total_venta > 0 ? (fact.ganancia / fact.total_venta) * 100 : 0;

            html += `
                <tr>
                    <td><strong>#${fact.factura_id}</strong></td>
                    <td>${new Date(fact.fecha).toLocaleDateString()}</td>
                    <td class="text-right">$${fact.total_venta.toFixed(2)}</td>
                    <td class="text-right">$${fact.costo_total.toFixed(2)}</td>
                    <td class="text-right"><strong class="text-success">$${fact.ganancia.toFixed(2)}</strong></td>
                    <td class="text-right">${margen.toFixed(1)}%</td>
                </tr>
            `;
        });

        html += `
                    </tbody>
                </table>
            </div>
        `;

        this.tabFacturas.innerHTML = html;
    }

    mostrarCargando() {
        const loadingHtml = '<div class="loading">Cargando datos de ganancias...</div>';
        this.resumenDiv.innerHTML = loadingHtml;
        this.tabResumen.innerHTML = loadingHtml;
        this.tabProductos.innerHTML = loadingHtml;
        this.tabFacturas.innerHTML = loadingHtml;
    }

    mostrarError(mensaje) {
        const errorHtml = `<div class="no-data" style="color: #f44336;">❌ ${mensaje}</div>`;
        this.resumenDiv.innerHTML = errorHtml;
        this.tabResumen.innerHTML = errorHtml;
        this.tabProductos.innerHTML = errorHtml;
        this.tabFacturas.innerHTML = errorHtml;
    }

    destruir() {
        if (this.elemento && this.contenedor.contains(this.elemento)) {
            this.contenedor.removeChild(this.elemento);
        }
    }
}