// FacturaVenta.js (actualizado)
import { DetalleVenta } from "./detallesVentas/DetalleVenta.js";
import { Pago } from "./pagos/Pago.js";

export class FacturaVenta {

    static BASE_URL = "/servicios/principales/factura/venta"; 

    constructor(data) {
        if (!data || typeof data !== "object") {
            data = {};
        }

        const {
            factura_id = null,
            id_cliente = null,
            id_tipo_factura = null,
            factura_descuento = 0,
            factura_fecha = null,
            factura_total = 0,
            cliente = null,
            tipo_factura = null,
            detalles = [],
            pagos = [],
            total_pagado = 0
        } = data;

        this.id = factura_id;
        this.id_cliente = id_cliente;
        this.id_tipo_factura = id_tipo_factura;
        this.descuento = Number(factura_descuento);
        this.fecha = factura_fecha ?? this.obtenerFechaActual();
        this.total = Number(factura_total);
        this.cliente = cliente;
        this.tipo_factura = tipo_factura;
        this._totalPagado = Number(total_pagado);

        this.detalles = (detalles || []).map(d => new DetalleVenta(d));
          this.pagos = (pagos || []).map(p => {
        // Asegurar que tipo_pago tenga la estructura correcta
        if (p.tipo_pago) {
            // Normalizar el objeto tipo_pago
            p.tipo_pago = {
                id: p.tipo_pago.id,
                descripcion: p.tipo_pago.descripcion || p.tipo_pago.nombre || ''
            };
        }
        return new Pago(p);
        });
    }

    /* =========================
       UTIL
    ========================= */

    obtenerFechaActual() {
        const now = new Date();
        return now.toISOString().slice(0, 19).replace("T", " ");
    }

    async request(url, options = {}) {
        const response = await fetch(url, {
            headers: {
                "Content-Type": "application/json"
            },
            ...options
        });

        const data = await response.json();

        if (!response.ok || data.status === "error") {
            throw new Error(data.message || "Error en la operación");
        }

        return data;
    }

    /* =========================
       DETALLES
    ========================= */

    agregarDetalle(data) {
        const detalle = new DetalleVenta(data);
        this.detalles.push(detalle);
        return detalle;
    }

    /* =========================
       PAGOS
    ========================= */

    agregarPago(data) {
        const pago = new Pago(data);
        this.pagos.push(pago);
        return pago;
    }

    getotalPagado() {
        // Si ya viene calculado del backend, lo usamos
        if (this._totalPagado > 0) return this._totalPagado;
        // Si no, lo calculamos
        return this.pagos.reduce((acc, p) => acc + (p.monto || p.monto_final || 0), 0);
    }

    /* =========================
       VALIDAR
    ========================= */

    validar() {
        if (!this.detalles.length) {
            throw new Error("Debe tener al menos un producto");
        }

        if (this.total <= 0) {
            throw new Error("Total inválido");
        }

        if (this.pagos.length && Math.abs(this.totalPagado - this.total) > 0.01) {
            throw new Error("Los pagos no coinciden con el total");
        }
    }

    /* =========================
       JSON
    ========================= */

    toJSON() {
        return {
            id: this.id,
            id_cliente: this.id_cliente,
            descuento: this.descuento,
            total: this.total,
            id_tipo_factura: this.id_tipo_factura,
            fecha: this.fecha,
            detalles: this.detalles.map(d => d.toJSON()),
            pagos: this.pagos.map(p => p.toJSON())
        };
    }

    /* =========================
       CREAR
    ========================= */

    async crear() {
        this.validar();

        const data = await this.request(
            `${FacturaVenta.BASE_URL}/crearVenta.php`,
            {
                method: "POST",
                body: JSON.stringify(this.toJSON())
            }
        );

        this.id = data.factura.id;
        return this;
    }

    /* =========================
       EDITAR
    ========================= */

    async editar() {
        if (!this.id) {
            throw new Error("No se puede editar sin ID");
        }

        this.validar();

        await this.request(
            `${FacturaVenta.BASE_URL}/editarVenta.php?id=${this.id}`,
            {
                method: "PUT",
                body: JSON.stringify(this.toJSON())
            }
        );

        return this;
    }

    /* =========================
       ELIMINAR
    ========================= */

    async eliminar() {
        if (!this.id) {
            throw new Error("No se puede eliminar sin ID");
        }

        await this.request(
            `${FacturaVenta.BASE_URL}/eliminarVenta.php?id=${this.id}`,
            {
                method: "DELETE"
            }
        );

        return true;
    }

    /* =========================
       ESTÁTICOS - ACTUALIZADOS
    ========================= */

    static async buscarPorId(id) {
        const response = await fetch(
            `${this.BASE_URL}/buscarFactura.php?id=${id}`
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error("Factura no encontrada");
        }

        if (!data.data) {
            throw new Error("Respuesta inválida del backend");
        }

        return new FacturaVenta(data.data);
    }

    static async buscarPorTexto(texto) {
        const response = await fetch(
            `${this.BASE_URL}/buscarVenta.php`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ search: texto })
            }
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error("Error en búsqueda");
        }

        if (!Array.isArray(data.data)) {
            return [];
        }

        return data.data.map(f => new FacturaVenta(f));
    }

    static async listar() {
        const response = await fetch(
            `${this.BASE_URL}/consultarVenta.php`
        );

        const data = await response.json();
        
        if (data.status !== "success") {
            throw new Error("Error al listar");
        }

        if (!Array.isArray(data.data)) {
            return [];
        }

        return data.data.map(f => new FacturaVenta(f));
    }

    /* =========================
       BUSCAR POR FECHAS
    ========================= */

    static async buscarPorFechas(desde, hasta) {
        if (!desde || !hasta) {
            throw new Error("Debe especificar fecha desde y hasta");
        }

        const fechaDesde = desde.split(' ')[0];
        const fechaHasta = hasta.split(' ')[0];

        const response = await fetch(
            `${this.BASE_URL}/consultarPorFechas.php?desde=${encodeURIComponent(fechaDesde)}&hasta=${encodeURIComponent(fechaHasta)}`
        );

        const data = await response.json();

        if (!response.ok || data.status === "error") {
            throw new Error(data.message || "Error al buscar por fechas");
        }

        if (!Array.isArray(data.data)) {
            return [];
        }

        return data.data.map(f => new FacturaVenta({
            factura_id: f.factura_id,
            id_cliente: f.id_cliente,
            id_tipo_factura: f.id_tipo_factura,
            factura_descuento: f.factura_descuento,
            factura_total: f.factura_total,
            factura_fecha: f.factura_fecha,
            cliente: f.cliente,
            tipo_factura: f.tipo_factura,
            detalles: f.detalles,
            pagos: f.pagos,
            total_pagado: f.total_pagado || 0
        }));
    }

    /* =========================
       MÉTODOS DE UTILIDAD
    ========================= */

    getNombreCliente() {
        if (!this.cliente) return 'Consumidor Final';
        return `${this.cliente.nombre || ''} ${this.cliente.apellido || ''}`.trim() || 'Consumidor Final';
    }

    getTipoFactura() {
        if (!this.tipo_factura) return 'Estándar';
        return this.tipo_factura.tipo_factura || 'Estándar';
    }

    getFechaFormateada() {
        return new Date(this.fecha).toLocaleString();
    }

    getEstado() {
        if (Math.abs(this._totalPagado - this.total) < 0.01) {
            return 'pagada';
        } else if (this._totalPagado > 0) {
            return 'parcial';
        } else {
            return 'pendiente';
        }
    }

    /* =========================
       GETTERS PARA CÁLCULOS
    ========================= */

    // 🔥 CORREGIDO: Getter para subtotal (suma de cantidad * pvp)
    get subtotal() {
        if (!this.detalles || this.detalles.length === 0) return 0;
        
        return this.detalles.reduce((acc, d) => {
            const cantidad = Number(d.cantidad) || 0;
            const pvp = Number(d.pvp) || 0;
            return acc + (cantidad * pvp);
        }, 0);
    }

    // 🔥 CORREGIDO: Getter para monto del descuento en dinero
    get montoDescuento() {
        const subtotal = this.subtotal;
        const porcentaje = Number(this.descuento) || 0;
        
        // Calcular el monto del descuento basado en el porcentaje
        return subtotal * (porcentaje / 100);
    }

    // 🔥 CORREGIDO: Getter para total después del descuento
    get totalConDescuento() {
        return this.subtotal - this.montoDescuento;
    }
}