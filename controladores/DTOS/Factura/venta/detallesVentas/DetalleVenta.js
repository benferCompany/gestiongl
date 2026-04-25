export class DetalleVenta {

    constructor({
        id_producto,
        descripcion,
        cantidad,
        pvp,
        descuento = 0
    }) {
        this.id_producto = id_producto;
        this.descripcion = descripcion;
        this.cantidad = Number(cantidad);
        this.pvp = Number(pvp);
        this.descuento = Number(descuento);
    }

    get subtotal() {
        return (this.cantidad * this.pvp) - this.descuento;
    }

    toJSON() {
        return {
            id_producto: this.id_producto,
            descripcion: this.descripcion,
            cantidad: this.cantidad,
            pvp: this.pvp,
            descuento: this.descuento
        };
    }
}