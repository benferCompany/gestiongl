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
    const PRODUCTOS_POR_PAGINA = 13;
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
        titulo.textContent = "Factura";

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
                <td>$${prod.costo?prod.costo:prod.pvp}</td>
                <td>$${prod.descuento}</td>
                <td>$${prod.total}</td>
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
                <p><strong>Subtotal:</strong> $${data.subTotal}</p>
                <p><strong>Descuento:</strong> $${data.descuento}</p>
                <h3>Total: $${data.total}</h3>
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
