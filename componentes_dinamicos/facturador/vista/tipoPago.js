import { guardardarDatos } from "../../../controladores/hooks.js";
import { URL } from "../../../controladores/url/url.js";
import { mostrarAlerta } from "../../../vistas/componentes/alertas.js";
import {fondoOscuroSinEsc } from "../../../vistas/componentes/fondoOscuro.js";
import { crearFacturaHTML, crearHTMLTicket } from "../../print/controlador/controlador.js";
import { formularioCompleto } from "../../tools/tools.js";
import { generarFactura, resetFacturaCompleta } from "../controlador/eventos.js";
import { crearPagoDB, getOpcionesDePagos } from "../controlador/tipoFactura.js";
import { cssTipoPago } from "../style/cssTipoPago.js";


export const tipoPago = async(e, paramDiv,url,tipo)=>{

    
    const div = document.createElement("div");
     
    div.id = "tipoPago";
    const pagos = await getTipoPago();
    
    const tipoFactura = await getTipoFactura();
    
    if(tipo ==="compra"){
        tipoFactura.data =tipoFactura.data.filter(tipo=>tipo.tipo_factura=="FC")
        pagos.data = pagos.data.filter(p=>p.descripcion=="Efectivo" || p.descripcion=="Transferencia");
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
        ${cssTipoPago()}
        <div class="exit-pago"><span >X</span></div>
        <h2>Seleccione el tipo de pago</h2>
        <div class="opcionesPago">
            <div><button class="btn-pagos" id="btnMasPagos">Pagos</button></div>
            <div class="contenido-pagos"></div>
            <select id="selectTipoFactura">
                ${tipoFactura.data.map(tipo => `<option value=${JSON.stringify(tipo)}>${tipo.tipo_factura}</option>`).join("")}
            </select>
            <h5 class="totalAPagar">Total a pagar: $${objeto.total}</h5>
            <br><br>
            <button id="confirmarTipoPago">Confirmar</button>
        </div>
    `;

    
    const btnConfirmar = div.querySelector("#confirmarTipoPago");
    btnConfirmar.addEventListener("click",async(e)=>{

        if(!objeto.finalJSON){
                    mostrarAlerta({
                            color: "#1e293b",
                            background: "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)",
                            mensaje:"Debes agregar al menos un pago"
                        })
            return
        };
        
    
        
        const tipo_factura = JSON.parse(div.querySelector("#selectTipoFactura").value);
        (tipo_factura);

        formJson.tipo_factura = tipo_factura;
        
        const datosFactura = {
            ...objeto,
            id_tipo_factura: tipo_factura.id,
    
            fecha: new Date().toISOString().split('T')[0],
            pagos: objeto.finalJSON.pagos.map(crearPagoDB)
        };

       formJson.datosFactura = objeto.finalJSON
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
    getOpcionesDePagos(div,objeto)
    document.body.appendChild(fondoOscuroSinEsc(div));
}




const getTipoPago = async()=>{
   
    try{

        const response = await fetch(URL + "/servicios/principales/factura/tipo_pago/consultaTipoPago.php");
        const data = await response.json();
        return data;
    }catch(e){
        console.info("Error al obtener los tipos de pago:", e);
        return { success: false, error: e.message };
    }
}

const getTipoFactura = async()=>{
   
    try{

        const response = await fetch(URL + "/servicios/principales/factura/tipo_factura/consultaTipoFactura.php");
        const data = await response.json();
        return data;
    }catch(e){
        console.info("Error al obtener los tipos de factura:", e);
        return { success: false, error: e.message };
    }
}





