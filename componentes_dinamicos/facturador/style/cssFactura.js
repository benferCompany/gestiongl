export const facturaCss = (param) => {
    //Condición
    return `<style>
          /* Paleta de colores profesional con fondo oscuro */
:root {
    --bg-dark: #1a1d21;
    --bg-container: #24282e;
    --bg-light-dark: #2d3239;
    --mp-blue: #009ee3;
    --mp-light-blue: #00a4ff;
    --mp-dark-blue: #0078be;
    --mp-orange: #ff6b00;
    --mp-red: #ff4400;
    --mp-white: #f8f9fa;
    --mp-light-gray: #e9ecef;
    --mp-gray: #6c757d;
    --mp-dark-gray: #343a40;
    --border-color: #3a4048;
    --shadow-color: rgba(0, 0, 0, 0.3);
}

/* Reset para evitar desbordamientos */
* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

body {
    background-color: var(--bg-dark);
    font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
    color: var(--mp-white);
    overflow-x: hidden;
}

.padre {
    padding-top: 20px;
    display: flex;
    justify-content: space-evenly;
    align-items: flex-start;
    min-height: 100vh;
    background-color: var(--bg-dark);
    padding: 30px 20px;
    gap: 40px;
    max-width: 1600px;
    margin: 0 auto;
}

/* Contenedor del formulario - EVITA DESBORDAMIENTO */
.padre .form {
    background-color: var(--bg-container);
    border: 1px solid var(--border-color);
    border-radius: 16px;
    padding: 2rem;
    width: 100%;
    max-width: 500px;
    height: auto;
    min-height: 650px;
    text-align: center;
    color: var(--mp-white);
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    box-shadow: 0 8px 32px var(--shadow-color);
    position: relative;
    overflow: hidden;
}

/* Encabezado del formulario */
.padre .form-header {
    color: var(--mp-blue);
    margin-bottom: 30px;
    font-size: 26px;
    font-weight: 700;
    text-align: center;
    padding-bottom: 15px;
    border-bottom: 2px solid var(--border-color);
}

/* Contenedor de campos de entrada - SIN DESBORDAMIENTO */
.padre .input-group {
    margin-bottom: 25px;
    position: relative;
    width: 100%;
}

.padre .input-label {
    display: block;
    text-align: left;
    margin-bottom: 8px;
    color: var(--mp-light-blue);
    font-size: 14px;
    font-weight: 600;
}

/* INPUTS - DENTRO DE SU CONTENEDOR */
.padre input {
    width: 100%;
    height: 52px;
    border: 1px solid var(--border-color);
    border-radius: 10px;
    color: var(--mp-white);
    background-color: var(--bg-light-dark);
    font-size: 16px;
    padding: 0 15px;
    transition: all 0.3s ease;
    outline: none;
    display: block;
}

.padre input:focus {
    border-color: var(--mp-orange);
    box-shadow: 0 0 0 2px rgba(255, 107, 0, 0.2);
    background-color: var(--bg-container);
}

.padre input::placeholder {
    color: var(--mp-gray);
    font-weight: 400;
}

/* Botones - DENTRO DE SU CONTENEDOR */
.padre .btn {
    width: 100%;
    text-align: center;
    margin-top: 40px;
}

.padre .btn button {
    width: 100%;
    height: 52px;
    border-radius: 10px;
    color: var(--mp-white);
    border: none;
    background: linear-gradient(135deg, var(--mp-orange) 0%, var(--mp-red) 100%);
    cursor: pointer;
    font-weight: 700;
    font-size: 16px;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(255, 107, 0, 0.3);
    display: block;
}

.padre .btn button:hover {
    background: linear-gradient(135deg, var(--mp-red) 0%, var(--mp-orange) 100%);
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(255, 107, 0, 0.4);
}

.padre .btn button:active {
    transform: translateY(0);
}

/* Contenedor de tablas - SIN DESBORDAMIENTO */
.padre .tablas {
    width: 100%;
    max-width: 900px;
    background-color: var(--bg-container);
    border-radius: 16px;
    padding: 25px;
    box-shadow: 0 8px 32px var(--shadow-color);
    border: 1px solid var(--border-color);
    overflow: hidden;
}

/* Tabla - CONTENIDA DENTRO DE SU PADRE */
.padre table {
    width: 100%;
    background-color: var(--bg-light-dark);
    border-radius: 12px;
    overflow: hidden;
    border-collapse: collapse;
    border: 1px solid var(--border-color);
}

.padre thead {
    background: linear-gradient(135deg, var(--mp-blue) 0%, var(--mp-dark-blue) 100%);
    color: var(--mp-white);
    height: 65px;
}

.padre th {
    text-align: center;
    padding: 20px 15px;
    font-weight: 700;
    font-size: 16px;
    border-bottom: 2px solid var(--border-color);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.padre td {
    padding: 18px 15px;
    text-align: center;
    border-bottom: 1px solid var(--border-color);
    color: var(--mp-light-gray);
    max-width: 200px;
    overflow: hidden;
    text-overflow: ellipsis;
}

/* Inputs dentro de la tabla - SIN DESBORDAMIENTO */
.padre td input {
    width: 100%;
    height: 100%;
    color: var(--mp-white);
    text-align: center;
    font-size: 15px;
    border: none;
    background: transparent;
    padding: 0;
    margin: 0;
    border-radius: 0;
}

.padre td input:focus {
    outline: none;
    background-color: rgba(255, 107, 0, 0.1);
}

.padre tbody {
    background-color: var(--bg-light-dark);
}

.padre tbody tr:hover {
    background-color: rgba(0, 158, 227, 0.1);
    transition: background-color 0.2s ease;
}

.padre tfoot {
    text-align: center;
    background-color: var(--bg-container);
    color: var(--mp-white);
    height: 60px;
    font-weight: 700;
}

.padre tfoot td {
    font-weight: 700;
    color: var(--mp-orange);
    font-size: 17px;
    border: none;
}

/* Secciones de resumen - CONTENIDAS */
.padre .sbt {
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-top: 25px;
    padding: 20px;
    background-color: var(--bg-light-dark);
    border-radius: 12px;
    border-left: 4px solid var(--mp-blue);
    border: 1px solid var(--border-color);
}

.padre .resumen {
    display: flex;
    width: 100%;
    justify-content: space-between;
    margin: 20px 0;
    padding: 20px;
    background-color: rgba(0, 158, 227, 0.05);
    border-radius: 12px;
    border: 1px solid var(--border-color);
}

.padre span {
    font-weight: 700;
    color: var(--mp-light-blue);
}

.padre .total {
    color: var(--mp-orange);
    font-size: 19px;
}

/* Botón final - CONTENIDO */
.padre .btn-f {
    width: 100%;
    height: 55px;
    border: none;
    cursor: pointer;
    border-radius: 10px;
    background: linear-gradient(135deg, var(--mp-blue) 0%, var(--mp-light-blue) 100%);
    color: var(--mp-white);
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-size: 18px;
    font-weight: 700;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(0, 158, 227, 0.3);
    margin-top: 25px;
    display: block;
}

.padre .btn-f:hover {
    background: linear-gradient(135deg, var(--mp-light-blue) 0%, var(--mp-blue) 100%);
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0, 158, 227, 0.4);
}

/* Acciones en tabla - CONTENIDAS */
.padre #tdAction {
    color: var(--mp-orange);
    font-size: 22px;
    background-color: transparent;
    transition: all 0.3s ease;
    font-weight: bold;
    padding: 10px;
    border-radius: 8px;
}

.padre #tdAction:hover {
    color: var(--mp-red);
    background-color: rgba(255, 107, 0, 0.15);
    transform: scale(1.05);
}

/* Sección descriptiva - CONTENIDA */
.padre .des {
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin: 25px 0;
    padding: 20px;
    background-color: var(--bg-light-dark);
    border-radius: 12px;
    border: 1px solid var(--border-color);
}

.padre .des div {
    width: 50%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 15px;
}

.padre .des input {
    width: 100%;
    color: var(--mp-white);
    text-align: left;
    font-size: 15px;
    border: 1px solid var(--border-color);
    background-color: var(--bg-container);
}

/* Elementos de Mercado Pago */
.padre .mp-badge {
    background: linear-gradient(135deg, var(--mp-blue) 0%, var(--mp-light-blue) 100%);
    color: var(--mp-white);
    padding: 6px 16px;
    border-radius: 20px;
    font-size: 13px;
    font-weight: 700;
    display: inline-block;
    margin-left: 10px;
    box-shadow: 0 2px 8px rgba(0, 158, 227, 0.3);
}

.padre .mp-highlight {
    color: var(--mp-light-blue);
    font-weight: 700;
    background-color: rgba(0, 158, 227, 0.1);
    padding: 4px 12px;
    border-radius: 6px;
}

.padre .mp-alert {
    background-color: rgba(255, 107, 0, 0.1);
    border-left: 4px solid var(--mp-orange);
    padding: 16px;
    border-radius: 8px;
    margin: 20px 0;
    font-size: 15px;
    border: 1px solid rgba(255, 107, 0, 0.2);
}

/* Filas alternas */
.padre tbody tr:nth-child(even) {
    background-color: rgba(45, 50, 57, 0.8);
}

.padre tbody tr:nth-child(even):hover {
    background-color: rgba(0, 158, 227, 0.15);
}

/* Título de sección */
.padre .section-title {
    color: var(--mp-light-blue);
    border-bottom: 2px solid var(--mp-orange);
    padding-bottom: 12px;
    margin-bottom: 30px;
    font-size: 24px;
    font-weight: 700;
    text-align: center;
}

/* Mensajes y estados */
.padre .success-message {
    background-color: rgba(0, 158, 227, 0.15);
    color: var(--mp-light-blue);
    padding: 16px;
    border-radius: 10px;
    margin: 20px 0;
    font-weight: 600;
    border: 1px solid rgba(0, 158, 227, 0.3);
}

.padre .error-message {
    background-color: rgba(255, 107, 0, 0.15);
    color: var(--mp-orange);
    padding: 16px;
    border-radius: 10px;
    margin: 20px 0;
    font-weight: 600;
    border: 1px solid rgba(255, 107, 0, 0.3);
}

/* Responsive - PARA MANTENER TODO CONTENIDO */
@media (max-width: 1200px) {
    .padre {
        flex-direction: column;
        align-items: center;
        gap: 30px;
    }
    
    .padre .form,
    .padre .tablas {
        max-width: 100%;
        width: 100%;
    }
}

@media (max-width: 768px) {
    .padre {
        padding: 20px 15px;
    }
    
    .padre .form,
    .padre .tablas {
        padding: 1.5rem;
    }
    
    .padre .des {
        flex-direction: column;
        gap: 15px;
    }
    
    .padre .des div {
        width: 100%;
    }
    
    .padre table {
        font-size: 14px;
    }
    
    .padre th,
    .padre td {
        padding: 12px 10px;
    }
}

/* Scroll personalizado */
::-webkit-scrollbar {
    width: 10px;
}

::-webkit-scrollbar-track {
    background: var(--bg-dark);
}

::-webkit-scrollbar-thumb {
    background: var(--mp-gray);
    border-radius: 5px;
}

::-webkit-scrollbar-thumb:hover {
    background: var(--mp-blue);
}
    </style> `;
};