import { guardardarDatos } from "../../../controladores/hooks.js";
import { URL } from "../../../controladores/url/url.js";
import { mostrarAlerta } from "../../../vistas/componentes/alertas.js";
import {fondoOscuroSinEsc } from "../../../vistas/componentes/fondoOscuro.js";
import { crearFacturaHTML } from "../../print/controlador/controlador.js";
import { formularioCompleto } from "../../tools/tools.js";
import { generarFactura, resetFacturaCompleta } from "../controlador/eventos.js";


export const tipoPago = async(e, paramDiv,url,tipo)=>{

    
    const div = document.createElement("div");
    div.id = "tipoPago";
    const pagos = await getTipoPago();
    const tipoFactura = await getTipoFactura();

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
            #tipoPago{
                width: 300px;
                height: 250px;
                background-color: white;

            }
        </style>

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
        console.log(tipo_factura);

        formJson.tipo_factura = tipo_factura;
        if(montoRecibido < objeto.total){
            alert("El monto recibido es insuficiente.");
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
        console.log(datosFactura);
        if(response && response.status === "success"){
            
             
            
            formJson.id_factura_cliente =
            tipo_factura.tipo_factura + "-" + response.factura.id;

            crearFacturaHTML(formJson);
            resetFacturaCompleta(formJson);
            

        }else{
            mostrarAlerta({
                color: "whitesmoke",
                background: "rgba(211, 27, 27, 1)",
                mensaje:"Error al guardar la factura."
            });
        }
    });

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





