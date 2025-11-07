export function handleSelect(tbody, li) {

    const objeto = li.object
    console.log(tbody)

    const tr = document.createElement("tr");
    tr.innerHTML = `
            <td>${objeto.id}</td>
            <td>${objeto.descripcion}</td>
            <td><input name="cantidad" value="1" type="number" /></td>
            <td><input name="pvp" value="${objeto.pvp}" type="number" /></td>
            <td><input name="descuento" value="0" type="number"/>
            <td><input name ="total" value="${objeto.pvp}" type="number" /></td>
            <td id="tdAction"><i class="fa-solid fa-trash-can"></i></td>
    `
    const inputTotal = tr.querySelector('[name="total"]');
    const inputPvp = tr.querySelector('[name="pvp"]');
    const inputCantidad = tr.querySelector('[name="cantidad"]');
    const inputDescuento = tr.querySelector('[name="descuento"]');
    inputCantidad.addEventListener("input", (e) => {
        const resultado = inputPvp.value * e.target.value;
        inputTotal.value = resultado - (inputDescuento.value / 100 * resultado);
    });
    inputPvp.addEventListener("input", (e) => {
        const resultado = e.target.value * inputCantidad.value
        inputTotal.value = resultado - (inputDescuento.value / 100 * resultado);
    });

    inputDescuento.addEventListener("input",(e)=>{
        const resultado =  inputCantidad.value * inputPvp.value
        inputTotal.value = resultado - (e.target.value /100 * resultado);
    })

    tbody.append(tr);
    document.getElementById("fondoOscuro").remove();


    // acá hacés lo que quieras con el li
}