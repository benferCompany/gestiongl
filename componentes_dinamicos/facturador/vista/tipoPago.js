import { guardardarDatos } from "../../../controladores/hooks.js";
import { URL } from "../../../controladores/url/url.js";
import { mostrarAlerta } from "../../../vistas/componentes/alertas.js";
import {fondoOscuro, fondoOscuroSinEsc } from "../../../vistas/componentes/fondoOscuro.js";
import { crearFacturaHTML, crearHTMLTicket } from "../../print/controlador/controlador.js";
import { formularioCompleto } from "../../tools/tools.js";
import { generarFactura, resetFacturaCompleta } from "../controlador/eventos.js";


export const tipoPago = async(e, paramDiv,url,tipo)=>{

    
    const div = document.createElement("div");
    div.id = "tipoPago";
    const pagos = await getTipoPago();
    const tipoFactura = await getTipoFactura();
    
    if(tipo ==="compra"){
        tipoFactura.data =tipoFactura.data.filter(tipo=>tipo.id==1)
    }

    const response = await generarFactura(e, paramDiv,url,tipo);

    if (!response) return;
    const objeto = response.objeto;
    const formJson = response.formJson;
    
 if(formularioCompleto(formJson)) return;
                if(formJson.productos.length <= 0 || !formJson.productos.length){
                    mostrarAlerta({
                        color: "whitesmoke",
                        background: "rgba(211, 27, 27, 1)",
                        mensaje:"Debe agregar al menos un producto a la factura."
                    });
                    return;
        }


    div.innerHTML = `
        <style>
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
    background: linear-gradient(135deg, var(--color-bg-surface) 0%, var(--color-bg-elevated) 100%);
    color: var(--color-text-primary);
    border-radius: var(--border-radius);
    border: 1px solid var(--color-border);
    box-shadow: var(--shadow-lg);
    overflow: hidden;
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
#selectTipoPago,
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

#selectTipoPago:hover,
#selectTipoFactura:hover {
    border-color: var(--color-primary);
    background-color: var(--color-bg-hover);
    box-shadow: 0 0 0 3px var(--color-primary-glow);
}

#selectTipoPago:focus,
#selectTipoFactura:focus {
    border-color: var(--color-primary);
    box-shadow: 0 0 0 3px var(--color-primary-glow);
    background-color: var(--color-bg-hover);
}

#selectTipoPago option,
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
        </style>
        <div class="exit-pago"><span >X</span></div>
        <h2>Seleccione el tipo de pago</h2>
        <div class="opcionesPago">
            <select id="selectTipoPago">
                ${pagos.data.map(pago => `<option value=${pago.id}>${pago.descripcion}</option>`).join("")}
            </select>
            <select id="selectTipoFactura">
                ${tipoFactura.data.map(tipo => `<option value=${JSON.stringify(tipo)}>${tipo.tipo_factura}</option>`).join("")}
            </select>
            <h5>Total a pagar: $${objeto.total}</h5>
            <h3>Ingrese el monto recibido:</h3>
            <input type="number" id="montoRecibido" value="${objeto.total}" />
            <h2>Cambio: $<span id="cambio">0</span></h2>
            <br><br>
            <button id="confirmarTipoPago">Confirmar</button>
        </div>
    `;

    const inputMonto = div.querySelector("#montoRecibido");
    const spanCambio = div.querySelector("#cambio");
    inputMonto.addEventListener("input",()=>{
        const montoRecibido = parseFloat(inputMonto.value) || 0;
        const cambio = montoRecibido - objeto.total;
        spanCambio.textContent = cambio.toFixed(2);
    });
    inputMonto.focus();

    const btnConfirmar = div.querySelector("#confirmarTipoPago");
    btnConfirmar.addEventListener("click",async()=>{
     
        const tipoPagoSeleccionado = div.querySelector("#selectTipoPago").value;
        const montoRecibido = parseFloat(inputMonto.value) || 0;
        const tipo_factura = JSON.parse(div.querySelector("#selectTipoFactura").value);
        (tipo_factura);

        formJson.tipo_factura = tipo_factura;
        if(montoRecibido < objeto.total && tipo!="compra"){
            mostrarAlerta({
                        color: "whitesmoke",
                        background: "rgba(211, 27, 27, 1)",
                        mensaje:"El de pago no puede ser menos que el total."
                    });
            return;
        }
        
        const datosFactura = {
            ...objeto,
            id_tipo_factura: tipo_factura.id,
    
            fecha: new Date().toISOString().split('T')[0],
            pagos: [{
                fecha: new Date().toISOString().split('T')[0],
                id_tipo_pago: tipoPagoSeleccionado,
                monto: montoRecibido
               
            }]
        };

       
        const response = await guardardarDatos(url, datosFactura);
        (datosFactura);
        if(response && response.status === "success"){
            
             
            
            formJson.id_factura_cliente =
            tipo_factura.tipo_factura + "-" + response.factura.id;

            if(tipo_factura.tipo_factura=="T"){

                crearHTMLTicket(formJson);
            }else{
                crearFacturaHTML(formJson);
            }
            resetFacturaCompleta(formJson);
            

        }else{
            mostrarAlerta({
                color: "whitesmoke",
                background: "rgba(211, 27, 27, 1)",
                mensaje:"Error al guardar la factura."
            });
        }
    });
    div.querySelector(".exit-pago span").addEventListener("click",()=>{
        const fondo = document.getElementById("fondoOscuroSinEsc");
        if(fondo) fondo.remove();
    })
    document.body.appendChild(fondoOscuroSinEsc(div));

}




const getTipoPago = async()=>{
   
    try{

        const response = await fetch(URL + "servicios/principales/factura/tipo_pago/consultaTipoPago.php");
        const data = await response.json();
        return data;
    }catch(e){
        console.info("Error al obtener los tipos de pago:", e);
        return { success: false, error: e.message };
    }
}

const getTipoFactura = async()=>{
   
    try{

        const response = await fetch(URL + "servicios/principales/factura/tipo_factura/consultaTipoFactura.php");
        const data = await response.json();
        return data;
    }catch(e){
        console.info("Error al obtener los tipos de factura:", e);
        return { success: false, error: e.message };
    }
}





