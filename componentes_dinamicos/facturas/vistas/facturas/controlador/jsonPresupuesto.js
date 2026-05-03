import { URL } from "../../../../../controladores/url/url.js";
import { tipoPago } from "../../../../facturador/vista/tipoPago.js";
import { handleSelect } from "../../../../facturador/controlador/eventos.js";

const PRESUPUESTO_JSON = {
    presupuesto: {
        factura_id: "60",
        id_cliente: "1",
        id_tipo_factura: "1",
        cliente: {
            id: 1,
            nombre: "cliente",
            apellido: "apellido cliente",
            cuit: "11-11111111-1",
            direccion: "dirección del cliente",
            telefono: "362-1111111"
        },
        factura_descuento: "0.00",
        factura_total: 18500,
        factura_fecha: "2026-02-04 00:00:00",
        producto: [
            {
                id: "1",
                id_producto: "pro01",
                descripcion: "Guirnaldas x10 con portafocos",
                cantidad: 1,
                pvp: "18500.00",
                descuento: 0,
                costo: "10000.00"
            }
        ]
    }
};


export const paramPresupuesto = {
    inputs: [
        {
            type: "text",
            name: "cliente",
            id: "",
            placeholder: "Cliente",
            selector: true,
            url: URL + "/servicios/principales/cliente/buscarCliente.php"
        }
    ],

    button: [
        {
            value: "Agreagar Producto (F2)",
            evento: (e) => { e.preventDefault(); }
        },
        {
            value: "Generar Factura (F8)",
            evento: async (e, div) => {
                tipoPago(
                    e,
                    div,
                    URL + "/servicios/principales/factura/venta/crearVenta.php",
                    "venta"
                );
            }
        }
    ],

    headers: [
        { header: "ID",          name: "id",          type: "number" },
        { header: "Descripción", name: "descripcion", type: "text" },
        { header: "Cantidad",    name: "cantidad",    type: "number" },
        { header: "PVP",         name: "pvp",         type: "number" },
        { header: "Descuento",   name: "descuento",   type: "number" },
        { header: "Total",       name: "total",       type: "number" }
    ],

    contenidos: { divFactura: null },

    url: URL + "/servicios/principales/inventario/producto/buscar.php",
    eventos: { handleSelect },
    llave: "descripcion",
    body: {},
    backgroundColor: "rgb(14, 48, 5)",

    /* 🔥 DATA PARA PRECARGA */
    defaultData: PRESUPUESTO_JSON
};