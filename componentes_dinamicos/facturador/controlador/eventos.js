
import { formToJSON, tablaAJSON } from "../../tools/tools.js";

export function handleSelect(tbody, li) {

    const objeto = li.object.obj
    
    const tr = document.createElement("tr");
   
    tr.innerHTML = `
            ${li.object.param.headers.map(header=>{
                const booleanObjeto = objeto[header.name];
                const response = header.name!=="descripcion" && header.name!=="id"?
                `<td data-key="${header.name}"><input value="${booleanObjeto?objeto[header.name]:header.name=="descuento"?0:1}" type="${header.type}" name="${header.name}"/></td>`:
                booleanObjeto?`<td data-key="${header.name}">${objeto[header.name]}</td>`:"";
                return response;
             }).join("")}
            <td id="tdAction"><i class="fa-solid fa-trash-can"></i></td>
    `
    tr.querySelector('[name="total"]').value = tr.querySelector('[name="costo"], [name="pvp"]').value;
    const inputTotal = tr.querySelector('[name="total"]')
    const inputPvp = tr.querySelector('[name="costo"], [name="pvp"]');
    const inputCantidad = tr.querySelector('[name="cantidad"]');
    const inputDescuento = tr.querySelector('[name="descuento"]');
    inputCantidad.addEventListener("input", (e) => {
        const resultado = inputPvp.value * e.target.value;
        inputTotal.value = resultado - (inputDescuento.value / 100 * resultado);
        changeInputs(document.getElementById("formularioFactura"))
    });
    inputPvp.addEventListener("input", (e) => {
        const resultado = e.target.value * inputCantidad.value
        inputTotal.value = resultado - (inputDescuento.value / 100 * resultado);
        changeInputs(document.getElementById("formularioFactura"))
    });

    inputDescuento.addEventListener("input",(e)=>{
        const resultado =  inputCantidad.value * inputPvp.value
        inputTotal.value = resultado - (e.target.value /100 * resultado);
        changeInputs(document.getElementById("formularioFactura"))
    })
    
    tr.querySelector("#tdAction").addEventListener("click",(e)=>{
        tr.remove();
    })
    
    tbody.append(tr);
    document.getElementById("fondoOscuro").remove();


    
}


export const changeInputs = (div)=>{
        console.log("cambio")
        let inputTotales=0;
        div.querySelectorAll('[name="total"]').forEach(input=>{
        inputTotales+=parseFloat(input.value); 
    })
    div.querySelector(".sbt").querySelector("span").innerHTML = "$"+inputTotales;
    inputFormulario(div)
}


 const inputFormulario = (div) => {
            const subtotal = parseFloat(div.querySelector(".sbt")
                                            .querySelector("span").innerText.replace("$", ""));
            
            const descuento = div.querySelector(".des").querySelector("input").value;
            const totalDescuento = subtotal * (descuento / 100);
            
            div.querySelector(".des").querySelector("strong").innerText = `- $${totalDescuento.toFixed(2)}`;
            const total = subtotal - totalDescuento;
            div.querySelector(".resumen").querySelector("span").innerText = `$${total.toFixed(2)}`;
    }



export const generarFactura =async(e,div,URL)=> {
                if(e instanceof PointerEvent){
                    e.preventDefault()
                    div = e.target.closest(".form").parentNode;
                    
                }

                const datosFactura = div.querySelectorAll(".spanSubTotal,.spanTotal")
                const formJson = formToJSON(div.querySelector("form"));
                const jsonTable = tablaAJSON(div.querySelector("table"));
                formJson.subTotal = datosFactura[0].innerText.replace("$","");
                formJson.total = datosFactura[1].innerText.replace("$","");
                formJson.productos = jsonTable;


                
               
                const booleanCliente = div.querySelector("form input[name='cliente']")?div.querySelector("form input[name='cliente']"):div.querySelector("form input[name='proveedor']");
                console.log(booleanCliente);
                const objetoTipo = JSON.parse(booleanCliente.getAttribute("objeto"));
                objetoTipo.nombre?formJson.cliente = objetoTipo :formJson.proveedor = objetoTipo;
                
                
                
                console.log(formJson);
                formJson.productos = formJson.productos.map(p => ({
                            ...p,
                            id_producto: p.id
                        }));

              const clienteProveedorKey = formJson.proveedor
                    ? { id: "id_proveedor", key: "proveedor" }
                    : { id: "id_cliente", key: "cliente" };

              const objeto = {
                   [clienteProveedorKey.id]: formJson[clienteProveedorKey.key].id,
                   descuento: formJson.descuento ? formJson.descuento : 0,
                   total: formJson.total,
                   detalles: formJson.productos,
                   pagos: []
                };


                
                return {objeto, formJson};                
    
            }




export const resetFacturaCompleta = (formJson) => {
    // 1️⃣ Reset formulario
    const div = document.getElementById("formularioFactura");
    if (div) {
        const form = div.querySelector("form");
        if (form) form.reset();

        const tbody = div.querySelector("table tbody");
        if (tbody) tbody.innerHTML = "";


        const subTotal = div.querySelector(".spanSubTotal");
        if (subTotal) subTotal.innerText = "$0.00";

        const total = div.querySelector(".spanTotal");
        if (total) total.innerText = "$0.00";
    }

    // 2️⃣ Reset objeto en memoria
    if (formJson) {
        formJson.productos = [];
        formJson.cliente = null;
        formJson.tipo_factura = null;
        formJson.id_factura_cliente = null;
        formJson.total = 0;
        formJson.subtotal = 0;
    }

    // 4️⃣ Cerrar modal si existe
    const fondo = document.querySelector("#fondoOscuroSinEsc");
    if (fondo) document.body.removeChild(fondo);
};
