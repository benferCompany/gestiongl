export function handleSelect(tbody, li) {

    const objeto = li.object.obj
    console.log(tbody)
    console.log(li.object.param)
    const tr = document.createElement("tr");
   
    tr.innerHTML = `
            ${li.object.param.headers.map(header=>{
                const booleanObjeto = objeto[header.name];
                const response = header.name!=="descripcion" && header.name!=="id"?
                `<td><input value="${booleanObjeto?objeto[header.name]:header.name=="descuento"?0:1}" type="${header.type}" name="${header.name}"/></td>`:
                booleanObjeto?`<td>${objeto[header.name]}</td>`:"";
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

