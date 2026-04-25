
import { tipoPago } from "../../facturador/vista/tipoPago.js";
import { stylePrint } from "../style/style.js";

/*

Ejemplo de objeto para crear factura
const objeto = {
    "cliente": {
        "id": "1",
        "nombre": "cliente",
        "apellido": "apellido cliente",
        "direccion": "dirección del cliente",
        "cuit": "11-11111111-1",
        "telefono": "362-1111111"
    },
    "id_factura_proveedor": "asd",
    "descuento": "0",
    "subTotal": "10000",
    "total": "10000.00",
    "productos": [
        {
            "id": "1",
            "descripcion": "Guirnaldas x10 con portafocos",
            "cantidad": 1,
            "costo": 10000,
            "descuento": 0,
            "total": 10000
        }
    ]
}*/


export function crearFacturaHTML(data) {
    
    data.total = parseFloat(data.total)
    data.subTotal = parseFloat(data.subTotal);
    data.totalMontoFinal = (data.pagos??data.datosFactura.pagos).reduce(
            (acc, p) => acc + (p.monto_final || p.monto),0);
    console.log(data)
    const PRODUCTOS_POR_PAGINA = 10;
    const totalPaginas = Math.ceil(data.productos.length / PRODUCTOS_POR_PAGINA);

    // ===============================
    // NORMALIZAR CLIENTE / PROVEEDOR
    // ===============================
    function normalizarPersona(data) {

        if (data.cliente) {
            return {
                titulo: "Datos del Cliente",
                nombre: `${data.cliente.nombre} ${data.cliente.apellido}`,
                direccion: data.cliente.direccion,
                cuit: data.cliente.cuit,
                telefono: data.cliente.telefono
            };
        }

        if (data.proveedor) {
            return {
                titulo: "Datos del Proveedor",
                nombre: data.proveedor.razon_social,
                direccion: data.proveedor.direccion,
                cuit: data.proveedor.cuit,
                telefono: data.proveedor.telefono
            };
        }

        return null;
    }

    const persona = normalizarPersona(data);

    const factura = document.createElement("div");
    factura.id = "facturaGenerada";

    const style = document.createElement("style");
    style.textContent = stylePrint;
    factura.appendChild(style);

    // ===============================
    // PAGINADO DE PRODUCTOS
    // ===============================
    for (let i = 0; i < data.productos.length; i += PRODUCTOS_POR_PAGINA) {
        const productosPagina = data.productos.slice(i, i + PRODUCTOS_POR_PAGINA);
        const esUltimaPagina = i + PRODUCTOS_POR_PAGINA >= data.productos.length;
        const numeroPagina = Math.floor(i / PRODUCTOS_POR_PAGINA) + 1;

        const pagina = document.createElement("div");
        pagina.className = "factura pagina";

        // ===== ENCABEZADO =====
        const header = document.createElement("div");
        header.className = "factura-header";

        const titulo = document.createElement("h1");
        titulo.textContent = "Presupuesto";

        const nroFactura = document.createElement("p");
        nroFactura.textContent = `N° Factura: ${data.id_factura_proveedor||data.id_factura_cliente}`;
        const tipoFactura = document.createElement("h1");
        tipoFactura.textContent = `${data.tipo_factura.tipo_factura}`;

        header.append(titulo,tipoFactura, nroFactura );

        // ===== DATOS PERSONA =====
        const cliente = document.createElement("div");
        cliente.className = "factura-cliente";
        cliente.innerHTML = `
            <h3>${persona.titulo}</h3>
            <p><strong>Nombre:</strong> ${persona.nombre}</p>
            <p><strong>Dirección:</strong> ${persona.direccion}</p>
            <p><strong>CUIT:</strong> ${persona.cuit}</p>
            <p><strong>Teléfono:</strong> ${persona.telefono}</p>
        `;

        // ===== TABLA =====
        const tabla = document.createElement("table");
        tabla.className = "factura-tabla";

        const thead = document.createElement("thead");
        thead.innerHTML = `
            <tr>
                <th>Descripción</th>
                <th>Cantidad</th>
                <th>Precio</th>
                <th>Descuento</th>
                <th>Total</th>
            </tr>
        `;

        const tbody = document.createElement("tbody");

        productosPagina.forEach(prod => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td>${prod.descripcion}</td>
                <td>${prod.cantidad}</td>
                <td>$${parseFloat(prod.costo?prod.costo:prod.pvp).toFixed(2)}</td>
                <td>$${prod.descuento}</td>
                <td>$${parseFloat(prod.total).toFixed(2)}</td>
            `;
            tbody.appendChild(tr);
        });

        tabla.append(thead, tbody);

        pagina.append(header, cliente, tabla);

        // ===== TOTALES (solo última página) =====
        if (esUltimaPagina) {

            
            const totales = document.createElement("div");
            totales.className = "factura-totales";
            totales.innerHTML = `
                <p><strong>Subtotal:</strong> $${parseFloat(data.subTotal).toFixed(2)}</p>
                <p><strong>Descuento:</strong> $${(data.total - data.subTotal).toFixed(2)}</p>
                <p><table style="width:auto;"><tbody><tr>${(data.pagos??data.datosFactura.pagos).map(p=>{return`<td>${p.tipo_pago?p.tipo_pago.nombre:p.descripcion} ${p.monto_final??p.monto}</td>`}).join("")}<td>Recargos ${(data.pagos??data.datosFactura.pagos).map(p=>{return`${p.tipo_pago?p.tipo_pago.nombre:p.descripcion}`}).join(" ")}: <strong>${(data.totalMontoFinal - data.total).toFixed(2)}</strong></td></tr></tbody></table>
                <h3>Total: $${parseFloat(data.totalMontoFinal).toFixed(2)}</h3>
            `;
            pagina.appendChild(totales);
        }

        // ===== FOOTER =====
        const footerPagina = document.createElement("div");
        footerPagina.className = "factura-footer-pagina";
        footerPagina.textContent = `Página ${numeroPagina} / ${totalPaginas}`;

        pagina.appendChild(footerPagina);
        factura.appendChild(pagina);
    }

    // ===============================
    // IMPRIMIR
    // ===============================
    
    const facturaHTML = factura.outerHTML;
    


    const datosComercio = `
        <div>
            <div style="text-align:center; margin-bottom:15px;">
                <h1 style="margin:0;">Todo-Electro</h1>
            </div>
            <div style="display:flex; justify-content:space-around;">
                
                    <p style="margin:0;">CUIT: 30-12345678-9</p>
                    <p style="margin:0;">Dirección: Isla del Cerrito 950</p>
                    <p style="margin:0;">WhatsApp: 362-4608368</p>
                
            </div>
        </div>
`;
    const ventana = window.open(
    "",
    "_blank",
    "width=800,height=600"
    );

    ventana.document.open();
    ventana.document.write(`
    <!DOCTYPE html>
    <html lang="es">
    <head>
    <meta charset="UTF-8">
    <title>Factura</title>
    <style>
        /* acá tus estilos de impresión */
        body {
        font-family: Arial, sans-serif;
        }
    </style>
    </head>
    <body>
    ${datosComercio}
    <hr style="margin:10px 0;">

    ${facturaHTML}
    </body>
    </html>
    `);
    ventana.document.close();

    ventana.onload = () => {
    ventana.focus();
    ventana.print();
    };

    
    
    
    /*const ventana = window.open("", "_blank");
    ventana.document.write(factura.outerHTML);
    ventana.document.close();
    ventana.focus();
    ventana.print();*/
}



export function crearHTMLTicket(data) {
     data.total = parseFloat(data.total)
    data.subTotal = parseFloat(data.subTotal);
    data.totalMontoFinal = (data.pagos??data.datosFactura.pagos).reduce(
            (acc, p) => acc + (p.monto_final || p.monto),0);
    console.log(data)
    function normalizarPersona(data) {
        if (data.cliente) {
            return {
                titulo: "CLIENTE",
                nombre: `${data.cliente.nombre} ${data.cliente.apellido}`,
                direccion: data.cliente.direccion || "",
                cuit: data.cliente.cuit || "",
                telefono: data.cliente.telefono || ""
            };
        }

        if (data.proveedor) {
            return {
                titulo: "PROVEEDOR",
                nombre: data.proveedor.razon_social,
                direccion: data.proveedor.direccion || "",
                cuit: data.proveedor.cuit || "",
                telefono: data.proveedor.telefono || ""
            };
        }

        return null;
    }

    const persona = normalizarPersona(data);

    const ventana = window.open("", "_blank");

    ventana.document.write(`
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <title>Ticket</title>
        <style>
                @media print {
                    @page {
                        size: 80mm auto;
                        margin: 0;
                    }

                    html, body {
                        width: 72mm;
                        margin: 0;
                        padding: 0;
                    }

                    body {
                        display: inline-block;
                    }

                    #ticket {
                        display: inline-block;
                    }
        }


            * {
                font-family: monospace;
                font-size: 11px;
                box-sizing: border-box;
            }

            #ticket {
                width: 72mm;
                padding: 4mm;
            }

            .center { text-align: center; }
            .right { text-align: right; }

           table {
                width: auto;
                border-collapse: collapse;
                margin-top: 5px;
                table-layout: auto;
            }

            th {
                text-align: left;
                border-bottom: 1px dashed #000;
            }

            td {
                padding: 2px 0;
            }

            th:nth-child(2),
            th:nth-child(3),
            td:nth-child(2),
            td:nth-child(3) {
                text-align: center;
            }

            .line {
                border-top: 1px dashed #000;
                margin: 5px 0;
            }

            .corte {
                height: 1px;
            }
        </style>
    </head>
    <body>
        <div id="ticket">

               <header style="display: flex; witdh: 100%; justify-content: space-between; align-items: center; padding: 0; margin: 0;"> 
                    <h4>TODO-ELECTRO</h4>
                    <h3>FACTURA ${data.tipo_factura?.tipo_factura || ""}</h3>
               </header>
                     
                     <p><b>CUIT:</b> 20-45.645.543-9</p>
                     <p><b>DIRECCIÓN:</b> Leopoldo lugones 726</p> 
                     <p><bTELÉFONO:></b> +5493625676574</p>
                
                <div>N° ${data.id_factura_proveedor || data.id_factura_cliente || ""}</div>
                <div>${new Date(data.fecha || Date.now()).toLocaleDateString()}</div>
            </div>

            <div class="line"></div>

            <div>
                <strong>${persona?.titulo || ""}</strong><br>
                ${persona?.nombre || ""}<br>
                ${persona?.direccion || ""}
                ${persona?.cuit ? `<br>CUIT: ${persona.cuit}` : ""}
                ${persona?.telefono ? `<br>Tel: ${persona.telefono}` : ""}
            </div>

            <div class="line"></div>

            <table>
                <thead>
                    <tr>
                        <th>Desc</th>
                        <th>Cant</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    ${data.productos.map(p => `
                        <tr>
                            <td>${p.descripcion}</td>
                            <td>${p.cantidad}</td>
                            <td>$${parseFloat(p.total).toFixed(2)}</td>
                        </tr>
                    `).join("")}
                </tbody>
            </table>

            <div class="line"></div>

            <div class="right">Subtotal: $${parseFloat(data.subTotal).toFixed(2)}</div>
            <div class="right">Descuento: $${(data.total - data.subTotal).toFixed(2)}</div>
            ${(data.pagos??data.datosFactura.pagos).map(p=>{return`<div>${p.tipo_pago?p.tipo_pago.nombre:p.descripcion} ${p.monto_final??p.monto}</div>`}).join("")}
            <div>Recargos ${(data.pagos??data.datosFactura.pagos).map(p=>{return`${p.tipo_pago?p.tipo_pago.nombre:p.descripcion}`}).join(" ")}: $${(data.totalMontoFinal - data.total).toFixed(2)}</div>
            <div class="right"><strong>TOTAL: $${parseFloat(data.totalMontoFinal).toFixed(2)}</strong></div>

            <div class="line"></div>

            <div class="center">
                Gracias por su compra
            </div>

            <div class="corte"></div>

        </div>
    </body>
    </html>
    `);

    ventana.document.close();

    ventana.onload = () => {
        ventana.focus();
        ventana.print();
        setTimeout(() => ventana.close(), 500);
    };
}
