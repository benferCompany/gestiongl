// Ganancias.js
export class Ganancias {
    constructor(data = {}) {
        this.ventas_totales = Number(data.ventas_totales) || 0;
        this.costo_ventas = Number(data.costo_ventas) || 0;
        this.ganancia_bruta = Number(data.ganancia_bruta) || 0;
        this.gastos_operativos = Number(data.gastos_operativos) || 0;
        this.ganancia_neta = Number(data.ganancia_neta) || 0;
        this.margen_bruto = Number(data.margen_bruto) || 0;
        this.margen_neto = Number(data.margen_neto) || 0;
        this.facturas_count = Number(data.facturas_count) || 0;
        this.productos_vendidos = Number(data.productos_vendidos) || 0;
        this.fecha_desde = data.fecha_desde || null;
        this.fecha_hasta = data.fecha_hasta || null;
        this.detalle_por_producto = data.detalle_por_producto || [];
        this.detalle_por_factura = data.detalle_por_factura || [];
    }

    static BASE_URL = "/servicios/principales/ganancias";

    /* =========================
       MÉTODOS ESTÁTICOS
    ========================= */

    static async obtenerGanancias(desde, hasta) {
        if (!desde || !hasta) {
            throw new Error("Debe especificar fecha desde y hasta");
        }

        const response = await fetch(
            `${this.BASE_URL}/consultarGanancias.php?desde=${encodeURIComponent(desde)}&hasta=${encodeURIComponent(hasta)}`
        );

        const data = await response.json();

        if (!response.ok || data.status === "error") {
            throw new Error(data.message || "Error al consultar ganancias");
        }

        return new Ganancias(data.data);
    }

    static async obtenerGananciasPorProducto(desde, hasta) {
        const response = await fetch(
            `${this.BASE_URL}/consultarGananciasPorProducto.php?desde=${encodeURIComponent(desde)}&hasta=${encodeURIComponent(hasta)}`
        );

        const data = await response.json();

        if (!response.ok || data.status === "error") {
            throw new Error(data.message || "Error al consultar ganancias por producto");
        }

        return data.data || [];
    }

    /* =========================
       MÉTODOS DE INSTANCIA
    ========================= */

    formatearNumero(valor) {
        const num = Number(valor);
        return isNaN(num) ? 0 : num;
    }

    toJSON() {
        return {
            ventas_totales: this.ventas_totales,
            costo_ventas: this.costo_ventas,
            ganancia_bruta: this.ganancia_bruta,
            gastos_operativos: this.gastos_operativos,
            ganancia_neta: this.ganancia_neta,
            margen_bruto: this.margen_bruto,
            margen_neto: this.margen_neto,
            facturas_count: this.facturas_count,
            productos_vendidos: this.productos_vendidos,
            fecha_desde: this.fecha_desde,
            fecha_hasta: this.fecha_hasta
        };
    }
}