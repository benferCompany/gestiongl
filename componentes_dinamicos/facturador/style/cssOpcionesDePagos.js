export const cssOpcionesDePago = ()=>{
    return `/* ============================= */
/*        SISTEMA POS CAJA       */
/* ============================= */

.pagos-container {
    font-family: 'Inter', 'Segoe UI', sans-serif;
    width: 550px;
    height: 650px;
    background: #0b1220;
    border-radius: 18px;
    padding: 20px;
    box-shadow: 0 15px 40px rgba(0,0,0,0.6);
    display: flex;
    flex-direction: column;
    color: #f8fafc;
}

/* ===== TOTAL FIJO ===== */

.pagos-total {
    font-size: 20px;
    font-weight: 700;
    padding: 15px;
    border-radius: 14px;
    background: linear-gradient(135deg, #1e293b, #0f172a);
    border: 1px solid #334155;
    margin-bottom: 15px;
}

/* ===== LISTA SCROLL ===== */

.pagos-lista {
    flex: 1;
    overflow-y: auto;
    padding-right: 6px;
    margin-bottom: 15px;
}

.pagos-lista::-webkit-scrollbar {
    width: 6px;
}

.pagos-lista::-webkit-scrollbar-thumb {
    background: #334155;
    border-radius: 10px;
}

/* ===== ITEM PAGO ===== */

.pago-item {
    background: #1e293b;
    padding: 16px;
    border-radius: 16px;
    margin-bottom: 15px;
    border: 1px solid #334155;
    transition: 0.2s ease;
}

.pago-item:hover {
    border-color: #3b82f6;
}

/* ===== INPUTS GRANDES ===== */

.pago-item select,
.pago-item input {
    width: 100%;
    padding: 14px;
    margin-bottom: 12px;
    border-radius: 12px;
    border: 1px solid #334155;
    background: #0f172a;
    color: #f1f5f9;
    font-size: 16px;
}

.pago-item select:focus,
.pago-item input:focus {
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59,130,246,0.3);
    outline: none;
}

/* ===== TARJETA ===== */

.credito-opciones {
    display: none;
    background: #0f172a;
    padding: 12px;
    border-radius: 12px;
    border: 1px solid #334155;
}

.monto-real {
    font-weight: 700;
    font-size: 16px;
    margin-top: 8px;
    color: #38bdf8;
}

/* ===== BOTONES GRANDES POS ===== */

.pagos-btn {
    padding: 16px;
    border-radius: 14px;
    border: none;
    font-size: 16px;
    font-weight: 700;
    cursor: pointer;
    transition: 0.2s ease;
}

.pagos-btn-primary {
    background: #2563eb;
    color: white;
}

.pagos-btn-primary:hover {
    background: #1d4ed8;
    transform: scale(1.02);
}

.pagos-btn-danger {
    background: #ef4444;
    color: white;
}

.pagos-btn-danger:hover {
    background: #dc2626;
}`}