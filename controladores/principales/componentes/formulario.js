const parametrosEjemplo = {
    style: `<style>
       
    </style>
    `,
    idFormulario: "formCrearProd",
    inputs: [
        { type: "text", name: "id_producto", label: "Id Producto" },
    ],
    submitValue: "Cargar",
    idMensaje: "mensaje-crear-producto"



}


export const formulario = (parametros) => {

    const formulario = `
    ${parametros.style}

    <form id="${parametros.idFormulario}" action="">
        ${parametros.inputs.map(e => `<label>${e.label}</label> 
            <input type="${e.type}" name="${e.name}"/>`).join('<br><br>')}  
        <br><br>
        <input type="submit" value="${parametros.submitValue}"><br><br>
        <div id="${parametros.idMensaje}"></div>

    </form>
    `;

    // Retorna un DocumentFragment que se puede insertar directamente en el DOM
    return document.createRange().createContextualFragment(formulario);
}