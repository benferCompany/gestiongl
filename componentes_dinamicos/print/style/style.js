export const stylePrint = `
@page {
    size: A4;
    margin: 20mm;
}

.factura {
    max-width: 800px;
    background: #fff;
    margin: auto;
    font-family: Arial, sans-serif;
}

/* ===== PAGINA ===== */
.pagina {
    padding: 20px;
    padding-bottom: 40px;
    border: 1px solid #ddd;
    page-break-after: always;
}

.pagina:last-child {
    page-break-after: auto;
}

/* ===== HEADER ===== */
.factura-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

/* ===== CLIENTE ===== */
.factura-cliente {
    margin: 20px 0;
}

/* ===== TABLA ===== */
.factura-tabla {
    width: 100%;
    border-collapse: collapse;
}

.factura-tabla thead {
    display: table-header-group; /* 🔑 repite encabezado en print */
}

.factura-tabla tr {
    page-break-inside: avoid; /* 🔑 no cortar filas */
}

.factura-tabla th,
.factura-tabla td {
    border: 1px solid #ccc;
    padding: 8px;
    text-align: left;
}

.factura-tabla th {
    background: #f5f5f5;
}

/* ===== TOTALES ===== */
.factura-totales {
    margin-top: 20px;
    text-align: right;
}

/* ===== SOLO IMPRESIÓN ===== */
@media print {
    body {
        margin: 0;
    }
}

.pagina {
    position: relative;
}

.factura-footer-pagina {
    position: absolute;
    bottom: 10px;
    left: 0;
    right: 0;
    text-align: center;
}

`;
