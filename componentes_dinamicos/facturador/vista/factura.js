import { URL } from "../../../controladores/url/url.js";
import { buttonAgregar } from "../controlador/buttons.js";
import { handleSelect } from "../controlador/eventos.js";
import { facturaCss } from "../style/cssFactura.js";


const param = {
    inputs: [
        { type: "text", name: "", id: "", placeholder: "Tipo de factura" },
        { type: "text", name: "", id: "", placeholder: "Cliente" },
        { type: "text", name: "", id: "", placeholder: "Tipo de pago" }
    ],
    button: [
        {
            value: "Agreagar Producto", evento:(e)=>{e.preventDefault()}
        },
        {
            value: "Generar Factura", evento: (e) => {
                e.preventDefault()
                console.log(e.target);
            }
        }
    ],

    headers: [
        {
            header: "ID",
            name: "id",
            type: "number"
        },
        {
            header: "Descripción",
            name: "descripcion",
            type: "text"
        },
        {
            header: "Cantidad",
            name: "cantidad",
            type: "number"
        },
        {
            header: "PVP",
            name: "pvp",
            type: "number"
        },
        {
            header: "Descuento",
            name: "descuento",
            type: "number"
        },
        {
            header: "Total",
            name: "total",
            type: "number"
        }

    ],
    contenidos:{divFactura:null},

    url: URL + "/servicios/principales/inventario/producto/buscar.php",
    eventos: {handleSelect: handleSelect},
    llave: "descripcion",
    body :{}
}

export const factura = () => {
    const div = document.createElement('div');
    div.innerHTML = `
    ${facturaCss()}
    <div class="padre">
        <div class="form">
            <form action="">
               
                ${param.inputs.map(i => `<input type="${i.type}" name="${i.name}" placeholder="${i.placeholder}">`).join("<br><br>")}
                <div class="btn">
                    <button class="btn-agregar"> Agregar Producto</button> <br><br>
                </div>
                
                <div class="sbt">
                    <b>SubTotal:</b>
                    <span>$1000</span>
                </div><br>

                <div class="des">
                    <div >
                        <b>Descuento:</b>
                        <span><input value="0" type="number"/></span>
                    </div>
                    <strong style="color: red;">- $100</strong>
                </div> <br>
                <div class="resumen">
                    <b>Resumen</b>
                    <div>
                        <strong>TOTAL :</strong>
                        <span>$1000</span>
                    </div>

                </div> <br><br>
                <button class="btn-f">Generar Factura</button> <br>
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
    param.button[0].evento = (e)=>{ e.preventDefault()
        param.contenidos.divFactura = div 
        buttonAgregar(param)};
    div.querySelectorAll("button").forEach((b, i) => {
        b.innerHTML = param.button[i].value
        b.addEventListener("click", param.button[i].evento);
    })
    
    div.querySelector("table").querySelectorAll("input").forEach(input => {
        input.addEventListener("click", ()=>{
            input.select();
        })        
    })

    div.querySelector(".des")
        .querySelector("input")
        .addEventListener("change", (e) => {
            const subtotal = parseFloat(div.querySelector(".sbt")
                                            .querySelector("span").innerText.replace("$", ""));
            
            const descuento = e.target.value;
            const totalDescuento = subtotal * (descuento / 100);
            
            e.target.closest(".des").querySelector("strong").innerText = `- $${totalDescuento.toFixed(2)}`;
            const total = subtotal - totalDescuento;
            div.querySelector(".resumen").querySelector("span").innerText = `$${total.toFixed(2)}`;
        })

    return div;
} 
