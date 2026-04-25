export const stylePrint = `
@page {
    size: A4;
    
    
    @top-center {
        
        font-family: Arial, sans-serif;
        font-size: 9pt;
        color: #666;
    }
    
    @bottom-center {
        content: "Página " counter(page) " de " counter(pages);
        font-family: Arial, sans-serif;
        font-size: 9pt;
        color: #666;
    }
}

.factura {
    max-width: 800px;
    background: #fff;
    margin: auto;
    font-family: 'Arial', 'Helvetica', sans-serif;
    font-size: 10pt;
    line-height: 1.4;
    color: #0f0f0f;
}

/* ===== MARCA DE AGUA ÚNICA CENTRADA ===== */
.pagina {
    position: relative;
    padding: 25px;
    padding-bottom: 50px;
    border: 1px solid #e0e0e0;
    border-radius: 4px;
    page-break-after: always;
    box-shadow: 0 2px 4px rgba(0,0,0,0.05);
    overflow: hidden; /* Para que la marca de agua no se desborde */
}

.pagina::before {
   
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) rotate(-45deg);
    font-size: 80px;
    font-weight: bold;
    color: rgba(240, 133, 33, 0.12); /* Naranja con opacidad */
    font-family: Arial, Helvetica, sans-serif;
    white-space: nowrap;
    pointer-events: none;
    z-index: 0;
    text-transform: uppercase;
    letter-spacing: 10px;
    border: 3px solid rgba(240, 133, 33, 0.1);
    padding: 30px 60px;
    border-radius: 10px;
    width: auto;
    height: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0.8;
}

.pagina:last-child {
    page-break-after: auto;
}

/* ===== HEADER ===== */
.factura-header {
    position: relative;
    z-index: 1;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 30px;
    padding-bottom: 20px;
    border-bottom: 2px solid rgb(240, 133, 33);
}

.factura-logo {
    font-size: 24pt;
    font-weight: bold;
    color: #0f0f0f;
    letter-spacing: 1px;
}

.factura-titulo {
    text-align: right;
}

.factura-titulo h1 {
    font-size: 20pt;
    color: #0f0f0f;
    margin: 0 0 5px 0;
    font-weight: 500;
}

.factura-numero {
    font-size: 11pt;
    color: rgb(240, 133, 33);
    background: #f8f9fa;
    padding: 4px 8px;
    border-radius: 3px;
}

/* ===== INFO EMPRESA ===== */
.factura-info-empresa {
    position: relative;
    z-index: 1;
    display: flex;
    justify-content: space-between;
    margin: 15px 0 25px 0;
    padding: 15px;
    background: #f8f9fa;
    border-radius: 4px;
    border-left: 4px solid rgb(240, 133, 33);
}

.empresa-detalles {
    font-size: 9pt;
    color: #0f0f0f;
    line-height: 1.5;
}

.empresa-detalles strong {
    color: rgb(240, 133, 33);
    font-size: 10pt;
}

.factura-fechas {
    text-align: right;
    font-size: 9pt;
}

.factura-fechas p {
    margin: 3px 0;
}

.factura-fechas span {
    font-weight: bold;
    color: rgb(240, 133, 33);
}

/* ===== CLIENTE ===== */
.factura-cliente {
    position: relative;
    z-index: 1;
    margin: 25px 0;
    padding: 15px;
    background: linear-gradient(to right, #f8f9fa, #ffffff);
    border-left: 4px solid rgb(240, 133, 33);
    border-radius: 0 4px 4px 0;
}

.factura-cliente h3 {
    margin: 0 0 10px 0;
    color: #0f0f0f;
    font-size: 11pt;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    border-bottom: 1px solid rgb(240, 133, 33);
    padding-bottom: 5px;
}

.cliente-detalles {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
}

.cliente-detalles p {
    margin: 3px 0;
    font-size: 10pt;
    color: #0f0f0f;
}

.cliente-detalles strong {
    color: rgb(240, 133, 33);
    min-width: 100px;
    display: inline-block;
}

/* ===== TABLA ===== */
.factura-tabla {
    position: relative;
    z-index: 1;
    width: 100%;
    border-collapse: collapse;
    margin: 20px 0;
    font-size: 9pt;
    background: rgba(255, 255, 255, 0.95);
}

.factura-tabla thead {
    display: table-header-group;
}

.factura-tabla tr {
    page-break-inside: avoid;
}

.factura-tabla th {
    background: #0f0f0f;
    color: white;
    font-weight: 500;
    padding: 12px 8px;
    border: none;
    font-size: 9pt;
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

.factura-tabla td {
    border-bottom: 1px solid #e0e0e0;
    border-left: none;
    border-right: none;
    padding: 10px 8px;
    vertical-align: top;
    color: #0f0f0f;
}

.factura-tabla tbody tr:hover {
    background: rgba(240, 133, 33, 0.05);
}

.factura-tabla tfoot td {
    background: #f8f9fa;
    font-weight: bold;
    border-top: 2px solid rgb(240, 133, 33);
    color: #0f0f0f;
}

/* Columnas específicas */
.factura-tabla td:nth-child(3),
.factura-tabla td:nth-child(4),
.factura-tabla td:nth-child(5) {
    text-align: right;
}

.factura-tabla th:nth-child(3),
.factura-tabla th:nth-child(4),
.factura-tabla th:nth-child(5) {
    text-align: right;
}

/* ===== TOTALES ===== */
.factura-totales {
    position: relative;
    z-index: 1;
    margin-top: 25px;
    text-align: right;
    padding: 15px;
    background: #f8f9fa;
    border-radius: 4px;
    border-right: 4px solid rgb(240, 133, 33);
}

.factura-totales table {
    width: 300px;
    margin-left: auto;
    border-collapse: collapse;
}

.factura-totales td {
    padding: 6px 10px;
    font-size: 10pt;
    color: #0f0f0f;
}

.factura-totales td:first-child {
    text-align: left;
    color: #0f0f0f;
}

.factura-totales td:last-child {
    text-align: right;
    font-weight: bold;
}

.factura-totales .total-final {
    font-size: 14pt;
    font-weight: bold;
    color: rgb(240, 133, 33);
    border-top: 2px solid rgb(240, 133, 33);
    padding-top: 10px;
    margin-top: 5px;
}

/* ===== PIE DE PÁGINA ===== */
.factura-footer-pagina {
    position: absolute;
    bottom: 15px;
    left: 0;
    right: 0;
    text-align: center;
    font-size: 8pt;
    color: #999;
    z-index: 1;
    background: rgba(255, 255, 255, 0.8);
    padding: 5px;
}

/* ===== NOTAS ===== */
.factura-notas {
    position: relative;
    z-index: 1;
    margin-top: 30px;
    padding: 15px;
    background: #f8f9fa;
    border-radius: 4px;
    font-size: 9pt;
    color: #0f0f0f;
    border-top: 1px dashed rgb(240, 133, 33);
}

.factura-notas h4 {
    margin: 0 0 8px 0;
    color: rgb(240, 133, 33);
    font-size: 10pt;
}

/* ===== SOLO IMPRESIÓN ===== */
@media print {
    body {
        margin: 0;
        background: #fff;
    }
    
    .factura {
        max-width: 100%;
        box-shadow: none;
    }
    
    .pagina {
        border: none;
        box-shadow: none;
        page-break-after: always;
    }
    
    .pagina::before {
        color: rgba(240, 133, 33, 0.15) !important;
        border-color: rgba(240, 133, 33, 0.1) !important;
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
    }
    
    .factura-tabla th {
        background: #0f0f0f !important;
        color: white !important;
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
    }
    
    .factura-info-empresa,
    .factura-cliente,
    .factura-totales,
    .factura-notas {
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
    }
}

/* ===== RESPONSIVE ===== */
@media (max-width: 600px) {
    .factura-header {
        flex-direction: column;
        align-items: flex-start;
    }
    
    .factura-titulo {
        text-align: left;
        margin-top: 15px;
    }
    
    .factura-info-empresa {
        flex-direction: column;
    }
    
    .factura-fechas {
        text-align: left;
        margin-top: 10px;
    }
    
    .cliente-detalles {
        grid-template-columns: 1fr;
    }
    
    .factura-totales table {
        width: 100%;
    }
    
    .pagina::before {
        font-size: 40px;
        letter-spacing: 5px;
        padding: 15px 30px;
    }
}

/* ===== VARIANTES DE MARCA DE AGUA ===== */

/* Marca de agua para borrador */
.pagina.watermark-draft::before {
    content: "BORRADOR";
    color: rgba(240, 133, 33, 0.12);
    border-color: rgba(240, 133, 33, 0.1);
}

/* Marca de agua para pagado */
.pagina.watermark-paid::before {
    content: "PAGADO";
    color: rgba(46, 204, 113, 0.15);
    border-color: rgba(46, 204, 113, 0.1);
}

/* Marca de agua para vencido */
.pagina.watermark-overdue::before {
    content: "VENCIDO";
    color: rgba(231, 76, 60, 0.15);
    border-color: rgba(231, 76, 60, 0.1);
}

`;
