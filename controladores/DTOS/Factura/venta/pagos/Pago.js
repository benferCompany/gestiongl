// Pago.js
export class Pago {
    constructor(data) {
        // Si no hay datos, crear objeto vacío
        if (!data || typeof data !== "object") {
            data = {};
        }

        // Mapear campos básicos
        this.id = data.id || null;
        this.fecha = data.fecha || null;
        
        // 🔥 CORREGIDO: Manejar tipo_pago correctamente
        if (data.tipo_pago) {
            this.tipo_pago = {
                id: data.tipo_pago.id || null,
                // Aceptar tanto 'descripcion' como 'nombre'
                descripcion: data.tipo_pago.descripcion || data.tipo_pago.nombre || ''
            };
        } else {
            this.tipo_pago = null;
        }
        
        // 🔥 CORREGIDO: Manejar montos
        // El backend puede enviar monto_final o monto, o ambos
        this.monto = Number(data.monto) || 0;
        this.monto_final = Number(data.monto_final) || Number(data.monto) || 0;
        
        // Si no hay monto_final pero hay monto, usamos monto
        if (this.monto_final === 0 && this.monto > 0) {
            this.monto_final = this.monto;
        }
        
        // Campo adicional para compatibilidad
        this.metodo_pago = this.tipo_pago?.descripcion || data.metodo_pago || '';
    }

    /* =========================
       MÉTODOS DE UTILIDAD
    ========================= */

    // Obtener el nombre del tipo de pago
    getNombreTipoPago() {
        return this.tipo_pago?.descripcion || this.metodo_pago || 'Desconocido';
    }

    // Obtener el ID del tipo de pago
    getIdTipoPago() {
        return this.tipo_pago?.id || null;
    }

    // Verificar si es un pago con tarjeta (crédito o débito)
    esTarjeta() {
        const desc = this.getNombreTipoPago().toLowerCase();
        return desc.includes('tarjeta') || 
               desc.includes('credito') || 
               desc.includes('debito') ||
               this.getIdTipoPago() === 3 || 
               this.getIdTipoPago() === 4;
    }

    // Verificar si es tarjeta de crédito (tiene recargo)
    esTarjetaCredito() {
        const desc = this.getNombreTipoPago().toLowerCase();
        return desc.includes('credito') || this.getIdTipoPago() === 3;
    }

    // Verificar si es tarjeta de débito (sin recargo)
    esTarjetaDebito() {
        const desc = this.getNombreTipoPago().toLowerCase();
        return desc.includes('debito') || this.getIdTipoPago() === 4;
    }

    // Obtener el monto con recargo (siempre monto_final)
    getMontoConRecargo() {
        return this.monto_final;
    }

    // Obtener el monto sin recargo (si es tarjeta de crédito, usa monto, sino monto_final)
    getMontoSinRecargo() {
        if (this.esTarjetaCredito()) {
            return this.monto; // Monto base sin recargo
        }
        return this.monto_final; // Para otros medios, monto_final = monto
    }

    // Calcular el recargo (solo para tarjeta de crédito)
    getRecargo() {
        if (this.esTarjetaCredito()) {
            return this.monto_final - this.monto;
        }
        return 0;
    }

    // Obtener el porcentaje de recargo (si aplica)
    getPorcentajeRecargo() {
        if (this.esTarjetaCredito() && this.monto > 0) {
            return ((this.monto_final - this.monto) / this.monto) * 100;
        }
        return 0;
    }

    /* =========================
       REPRESENTACIÓN
    ========================= */

    toJSON() {
        return {
            id: this.id,
            fecha: this.fecha,
            tipo_pago: this.tipo_pago ? {
                id: this.tipo_pago.id,
                descripcion: this.tipo_pago.descripcion
            } : null,
            monto: this.monto,
            monto_final: this.monto_final,
            metodo_pago: this.metodo_pago
        };
    }

    toString() {
        const tipo = this.getNombreTipoPago();
        const monto = this.monto_final.toFixed(2);
        if (this.esTarjetaCredito()) {
            return `${tipo}: $${monto} (Base: $${this.monto.toFixed(2)} | Rec: +$${this.getRecargo().toFixed(2)})`;
        }
        return `${tipo}: $${monto}`;
    }
}