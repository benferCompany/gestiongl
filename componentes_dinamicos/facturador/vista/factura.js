import { observarCambios } from "../../../controladores/hooks.js";
import { buttonAgregar } from "../controlador/buttons.js";
import { changeInputs } from "../controlador/eventos.js";
import { facturaCss } from "../style/cssFactura.js";
import { jsSelectInputCliente } from "../../select/controlador/jsSelectInput.js";



export const factura = (param) => {
    const div = document.createElement('div');
    div.id="formularioFactura"
    div.innerHTML = `
    ${facturaCss()}
    <div class="padre">
        <div class="form">
            <form>
               
                ${param.inputs.map(i => `<input selector=${i.selector ? "true" : ""} url="${i.url}" type="${i.type}" name="${i.name}" placeholder="${i.placeholder}">`).join("<br><br>")}
                <div class="btn">
                    <button  type="button" class="btn-agregar"> Agregar Producto</button> <br><br>
                </div>
                
                <div class="sbt">
                    <b>SubTotal:</b>
                    <span class="spanSubTotal">$0</span>
                </div><br>

                <div class="des">
                    <div >
                        <b>Descuento:</b>
                        <span><input name="descuento" class="inputDes" value="0" type="number"/></span>
                    </div>
                    <strong style="color: red;">- $0</strong>
                </div> <br>
                <div class="resumen">
                    <b>Resumen</b>
                    <div>
                        <strong>TOTAL :</strong>
                        <span class="spanTotal">$0</span>
                    </div>

                </div> <br><br>
                <button type="button" class="btn-f">Generar Factura</button> <br>
            </form>
        </div>

        <div class="tablas">
            <table>
                <colgroup>
                    <col style="width: 10%;">
                    <col style="width: 40%;">
                    <col style="width: 10%;">
                    <col style="width: 10%;">
                    <col style="width: 10%;">
                    <col style="width: 10%;">
                    <col style="width: 10%;">
                </colgroup>
                <thead>
                    <tr>
                        ${param.headers.map(th => `<th>${th.header}</th>`).join("")}
                        <th>Acción</th>
                    </tr>
                </thead>
                <tbody>
                </tbody>
            </table> <br>
        </div>
    </div>`
    observarCambios(div.querySelector("table"),()=>{
       
        changeInputs(div)
    })
   
    const inputSelector = div.querySelectorAll('input[selector="true"]');
    inputSelector.forEach(input => {
        input.addEventListener("input", () => {
           console.log(input.getAttribute("url"))
           jsSelectInputCliente(input, input.getAttribute("url"));
        })
    });
    param.button[0].evento = (e)=>{ e.preventDefault()
        param.contenidos.divFactura = div 
        buttonAgregar(param)};
    div.querySelectorAll("button").forEach((b, i) => {
        b.innerHTML = param.button[i].value;
      
        b.addEventListener("click", param.button[i].evento);
    })
    
    div.querySelector("table").querySelectorAll("input").forEach(input => {
        input.addEventListener("click", ()=>{
            input.select();
        })        
    })
    
     div.querySelector(".des")
        .querySelector("input")
        .addEventListener("change", ()=>{inputFormulario()})

    const inputFormulario = () => {
            const subtotal = parseFloat(div.querySelector(".sbt")
                                            .querySelector("span").innerText.replace("$", ""));
            
            const descuento = div.querySelector(".des").querySelector("input").value;
            const totalDescuento = subtotal * (descuento / 100);
            
            div.querySelector(".des").querySelector("strong").innerText = `- $${totalDescuento.toFixed(2)}`;
            const total = subtotal - totalDescuento;
            div.querySelector(".resumen").querySelector("span").innerText = `$${total.toFixed(2)}`;
        }    
    document.body.addEventListener("keydown",(e)=>{
        if(e.key ==="F2"){
            if(document.getElementById("fondoOscuro")) return;
            if(!document.getElementById("contenido").querySelector(".btn-agregar")) return
            param.button[0].evento(e);
        }else if(e.key==="F8"){
            console.log("generar factura")
            param.button[1].evento(e,div);
        }
    })

        
    return div;
} 
