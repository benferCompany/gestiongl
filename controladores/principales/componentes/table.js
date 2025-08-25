const parametrosEjemplo = {
    style: `<style> </style>`,
    thead: ["Id Producto", "Descripción", "Costo", "PVP", "Acción"],
    tbody: ["idProd01", "descripcion del producto", "$100", "$150"],
    idTbody:"idTbody"
}

export const table = (parametros) => {

    const html = `
    
    ${parametros.style}

    <div>
         <table>
                <thead>
                    <tr>
                        ${parametros.thead.map(e => `<th>${e}</th>`).join("")}
                    </tr>
                </thead>
                <tbody id="${parametros.idTbody}">
                    <tr>
                        ${parametros.tbody.map(e => `<th>${e}</th>`).join("")}
                        <td>
                            <button class="btnEditar"><i class="fas fa-pencil-alt"></i>
                            </button>
                            <button class="btnEliminar" ><i class="fas fa-trash"></i>
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
    </div>`

    return document.createRange().createContextualFragment(html);
}