const parametrosEjemplo = {
    style: `<style>
        form {
            margin-top:3.2%;
            background-color:  #0f0f0fff;
            padding: 1rem;
            text-align: center;
            border-radius: 5px;
            width: 230px;
            box-shadow: 0 6px 12px rgba(0, 0, 0, 0.466);
        }

        input[type="submit"] {
            height: 35px;
            width: 205px;
            background-color: rgba(240, 133, 33, 1);
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            transition: background-color 0.3s, transform 0.3s;
        }

        input[type="submit"]:hover {
            background-color: rgba(247, 155, 69, 1);
            color: whitesmoke;
        }

        label {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            color: whitesmoke
            ;
        }

        input {
            height: 27px;
            width: 200px;
            background-color: #FBFCFC;
            border: 1px solid #D5DBDB;
        }
    </style>
    `,
    idFormulario: "formCrearProd",
    inputs: [
        { type: "text", name: "id_producto", label: "Id Producto" },
        { type: "text", name: "descripcion", label: "Descripción" },
        { type: "number", name: "costo", label: "Costo" },
        { type: "number", name: "PVP", label: "PVP" }
    ],
    submitValue: "Cargar",
    idMensaje: "mensaje-crear-producto"



}


export const formulario = (parametros) => {

    const formulario = `
    ${parametros.style}

    <form id="${parametros.idFormulario}" action="">
        ${parametros.inputs.map(e => `<label>${e.label}</label><input type="${e.type} name="${e.name}">`).join("")}        
        
        <input type="submit" value="${parametros.submitValue}"><br><br>
        <div id="${parametros.idMensaje}"></div>

    </form>
    `;

    // Retorna un DocumentFragment que se puede insertar directamente en el DOM
    return document.createRange().createContextualFragment(formulario);
}