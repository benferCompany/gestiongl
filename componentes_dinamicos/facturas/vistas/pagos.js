import { fondoOscuro } from "../../../vistas/componentes/fondoOscuro.js";

export const contenidoPagos = (pagos) => {
    const div = document.createElement("div");
    div.id = "pagos-contenido";

    const table = document.createElement("table");
    table.innerHTML = `
        <style>
            #pagos-contenido table {
                width: 100%;
                border-collapse: collapse;
            }
            #pagos-contenido th, td {
                border: 1px solid #ddd;
                padding: 8px;
                text-align: left;
            }
            #pagos-contenido th {
                background-color: #f2f2f2;
            }
            #pagos-contenido tbody {
                background-color: #f9f9f9;
            }
        </style>
        <thead>
            <tr>
                <th>ID Pago</th>
                <th>Fecha</th>
                <th>Monto</th>
                <th>Método de Pago</th>
                <th>Total Factura</th>
                <th>Saldo</th>
            </tr>
        </thead>
        <tbody>
            ${pagos.map(pago => `
                <tr>
                    <td>${pago.id}</td>
                    <td>${pago.fecha}</td>
                    <td>${pago.monto}</td>
                    <td>${pago.tipo_pago.nombre}</td>
                    <td>${pago.total}</td>
                    <td>${pago.total - pago.monto}</td>
                </tr>
            `).join('')}
        </tbody>
    `;

    div.appendChild(table);
    return div;
}

export const buttonPagos = (e) => {
    const objeto = JSON.parse(e.target.getAttribute("objeto"));
    const pagosContenido = contenidoPagos(objeto);
    console.log(pagosContenido);
    
    document.getElementById("contenido").appendChild(fondoOscuro(pagosContenido));
}