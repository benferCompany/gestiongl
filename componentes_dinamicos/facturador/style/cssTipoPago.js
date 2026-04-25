export const  cssTipoPago = ()=>{
    return `<style>
        /* Variables CSS - Modo Oscuro Profesional */
:root {
    --color-bg-main: #0a0c0e;
    --color-bg-surface: #14181c;
    --color-bg-elevated: #1e2329;
    --color-bg-hover: #2a313c;
    --color-bg-header: #1a1f24;
    
    --color-text-primary: #e8edf2;
    --color-text-secondary: #9aa7b9;
    --color-text-muted: #5f6c80;
    
    --color-primary: #f97316;
    --color-primary-hover: #fb923c;
    --color-primary-glow: rgba(249, 115, 22, 0.15);
    
    --color-secondary: #0ea5e9;
    --color-secondary-glow: rgba(14, 165, 233, 0.1);
    
    --color-border: #2a313c;
    --color-border-strong: #3a4452;
    --color-success: #10b981;
    --color-danger: #ef4444;
    
    --shadow-sm: 0 2px 4px 0 rgba(0, 0, 0, 0.5);
    --shadow-md: 0 4px 12px 0 rgba(0, 0, 0, 0.6);
    --shadow-lg: 0 8px 24px -4px rgba(0, 0, 0, 0.8);
    
    --border-radius: 0.75rem;
    --transition-base: all 0.2s ease-in-out;
}

/* Contenedor principal */
#tipoPago {
    width: 450px;
    height:100%;
    background: linear-gradient(135deg, var(--color-bg-surface) 0%, var(--color-bg-elevated) 100%);
    color: var(--color-text-primary);
    border-radius: var(--border-radius);
    border: 1px solid var(--color-border);
    box-shadow: var(--shadow-lg);
    overflow: hidden;
    overflow-y: auto;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
    backdrop-filter: blur(10px);
    position: relative;
}

/* Efecto de brillo superior */
#tipoPago::before {
    content: '';
    position: absolute;
    top: -1px;
    left: -1px;
    right: -1px;
    height: 2px;
    background: linear-gradient(90deg, var(--color-primary), var(--color-secondary));
    border-radius: var(--border-radius) var(--border-radius) 0 0;
    opacity: 0.5;
    pointer-events: none;
}

/* Header con botón de cerrar */
.exit-pago {
    display: flex;
    justify-content: flex-end;
    padding: 0.75rem;
    border-bottom: 1px solid var(--color-border);
    background: var(--color-bg-header);
}

.exit-pago span {
    background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-danger) 100%);
    color: white;
    padding: 0.5rem 1rem;
    border-radius: calc(var(--border-radius) / 2);
    cursor: pointer;
    font-weight: 600;
    font-size: 0.9rem;
    letter-spacing: 0.5px;
    text-transform: uppercase;
    transition: var(--transition-base);
    border: none;
    outline: none;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    box-shadow: var(--shadow-sm);
    min-width: 32px;
    height: 32px;
}

.exit-pago span:hover {
    background: linear-gradient(135deg, var(--color-danger) 0%, var(--color-primary-hover) 100%);
    transform: translateY(-1px);
    box-shadow: var(--shadow-md), 0 0 0 3px var(--color-primary-glow);
}

.exit-pago span:active {
    transform: translateY(1px);
    box-shadow: var(--shadow-sm);
}

/* Títulos */
#tipoPago h2 {
    color: var(--color-text-primary);
    font-size: 1.25rem;
    font-weight: 600;
    margin: 1rem 1.5rem;
    padding-bottom: 0.5rem;
    border-bottom: 2px solid var(--color-primary);
    letter-spacing: 0.5px;
}

#tipoPago h3 {
    color: var(--color-text-secondary);
    font-size: 1rem;
    font-weight: 500;
    margin: 0.5rem 1.5rem;
}

#tipoPago h5 {
    color: var(--color-primary);
    font-size: 1.1rem;
    font-weight: 600;
    margin: 0.5rem 1.5rem;
    padding: 0.75rem;
    background: var(--color-bg-elevated);
    border-radius: calc(var(--border-radius) / 2);
    border: 1px solid var(--color-border);
}

/* Contenedor de opciones */
.opcionesPago {
    padding: 1rem 1.5rem 1.5rem 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
}

/* Selects estilizados */
.selectTipoPago,
#selectTipoFactura {
    width: 100%;
    padding: 0.8rem 1rem;
    background: var(--color-bg-elevated);
    border: 1px solid var(--color-border);
    border-radius: calc(var(--border-radius) / 2);
    color: var(--color-text-primary);
    font-size: 0.95rem;
    cursor: pointer;
    transition: var(--transition-base);
    outline: none;
    appearance: none;
    background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%239aa7b9' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><polyline points='6 9 12 15 18 9'/></svg>");
    background-repeat: no-repeat;
    background-position: right 1rem center;
    background-size: 16px;
}
.pagos-extras div input{
    width: 90%;
    padding: 0.8rem 1rem;
    margin: 1em;
    background: var(--color-bg-elevated);
    border: 1px solid var(--color-border);
    border-radius: calc(var(--border-radius) / 2);
    color: var(--color-text-primary);
    font-size: 1.1rem;
    transition: var(--transition-base);
    outline: none;
    box-sizing: border-box;
    font-weight: 500;
}
.selectTipoPago:hover,
#selectTipoFactura:hover {
    border-color: var(--color-primary);
    background-color: var(--color-bg-hover);
    box-shadow: 0 0 0 3px var(--color-primary-glow);
}

.selectTipoPago:focus,
#selectTipoFactura:focus {
    border-color: var(--color-primary);
    box-shadow: 0 0 0 3px var(--color-primary-glow);
    background-color: var(--color-bg-hover);
}

.selectTipoPago option,
#selectTipoFactura option {
    background: var(--color-bg-elevated);
    color: var(--color-text-primary);
    padding: 0.5rem;
}


/* Input de monto recibido */
#montoRecibido {
    width: 100%;
    padding: 0.8rem 1rem;
    background: var(--color-bg-elevated);
    border: 1px solid var(--color-border);
    border-radius: calc(var(--border-radius) / 2);
    color: var(--color-text-primary);
    font-size: 1.1rem;
    transition: var(--transition-base);
    outline: none;
    box-sizing: border-box;
    font-weight: 500;
}

#montoRecibido:hover {
    border-color: var(--color-primary);
    background: var(--color-bg-hover);
    box-shadow: 0 0 0 3px var(--color-primary-glow);
}

#montoRecibido:focus {
    border-color: var(--color-primary);
    box-shadow: 0 0 0 3px var(--color-primary-glow);
    background: var(--color-bg-hover);
}

#montoRecibido::-webkit-inner-spin-button,
#montoRecibido::-webkit-outer-spin-button {
    opacity: 0.5;
    background: var(--color-bg-elevated);
}

/* Total a pagar y cambio */
#tipoPago h2:last-of-type {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background: var(--color-bg-elevated);
    padding: 0.75rem 1.5rem;
    border-radius: calc(var(--border-radius) / 2);
    margin: 0 1.5rem;
}

#cambio {
    color: var(--color-success);
    font-weight: 700;
    font-size: 1.3rem;
    text-shadow: 0 0 10px rgba(16, 185, 129, 0.3);
}

/* Cuando el cambio es negativo (falta dinero) */
#cambio.negativo {
    color: var(--color-danger);
    text-shadow: 0 0 10px rgba(239, 68, 68, 0.3);
}

/* Botón confirmar */
#confirmarTipoPago {
    background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-hover) 100%);
    color: white;
    border: none;
    padding: 1rem;
    border-radius: calc(var(--border-radius) / 2);
    font-weight: 600;
    font-size: 1.1rem;
    letter-spacing: 0.5px;
    text-transform: uppercase;
    cursor: pointer;
    transition: var(--transition-base);
    margin-top: 0.5rem;
    box-shadow: var(--shadow-sm);
    width: 100%;
    position: relative;
    overflow: hidden;
}

#confirmarTipoPago::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.2);
    transform: translate(-50%, -50%);
    transition: width 0.3s, height 0.3s;
}

#confirmarTipoPago:hover {
    background: linear-gradient(135deg, var(--color-primary-hover) 0%, var(--color-primary) 100%);
    transform: translateY(-2px);
    box-shadow: var(--shadow-lg), 0 0 0 3px var(--color-primary-glow);
}

#confirmarTipoPago:hover::after {
    width: 300px;
    height: 300px;
}

#confirmarTipoPago:active {
    transform: translateY(1px);
    box-shadow: var(--shadow-sm);
}

#confirmarTipoPago:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    pointer-events: none;
}

/* Separador visual */
br {
    display: none;
}

/* Responsive */
@media (max-width: 500px) {
    #tipoPago {
        width: 100%;
        max-width: 450px;
        margin: 0 auto;
    }
    
    #tipoPago h2 {
        margin: 1rem;
    }
    
    .opcionesPago {
        padding: 1rem;
    }
}

/* Animación de entrada */
@keyframes slideInModal {
    from {
        opacity: 0;
        transform: translateY(-20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

#tipoPago {
    animation: slideInModal 0.3s ease forwards;
}


#tipoPago .btn-pagos {
    background: linear-gradient(135deg, #ff8c00, #ff6a00);
    color: white;
    border: none;
    padding: 12px 28px;
    font-size: 16px;
    font-weight: 600;
    border-radius: 12px;
    cursor: pointer;
    transition: all 0.25s ease;
    box-shadow: 0 8px 20px rgba(255, 106, 0, 0.3);
    letter-spacing: 0.5px;
}

/* Hover */
#tipoPago .btn-pagos:hover {
    transform: translateY(-3px);
    box-shadow: 0 12px 25px rgba(255, 106, 0, 0.4);
}

/* Click */
#tipoPago .btn-pagos:active {
    transform: translateY(1px);
    box-shadow: 0 5px 15px rgba(255, 106, 0, 0.3);
}

/* Opcional: efecto brillo al pasar el mouse */
#tipoPago .btn-pagos::after {
    content: "";
    position: absolute;
    top: 0;
    left: -75%;
    width: 50%;
    height: 100%;
    background: rgba(255,255,255,0.2);
    transform: skewX(-25deg);
    transition: 0.5s;
}

#tipoPago .btn-pagos:hover::after {
    left: 125%;
}


        </style>`
}