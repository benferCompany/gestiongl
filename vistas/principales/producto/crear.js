import { formulario } from "../../../controladores/principales/componentes/formulario.js";
import { table } from "../../../controladores/principales/componentes/table.js";
import { consultarProducto } from "../../../controladores/principales/producto/consulta.js";
import { submitCrearProd } from "../../../controladores/principales/producto/crearControlador.js";

export const crear = () => {
    const divPadre = document.createElement("div");
    divPadre.style.cssText = `
        display: flex;
        justify-content: space-around;
    `;

    // Llamamos a la función para obtener el fragmento y lo agregamos
    
    const formularioFragment = formCrearProductoHtml();
    const tableFragment = tableCrearProducto();
    const tbody = tableFragment.querySelector("tbody");
    const form = formularioFragment.querySelector("form");
    
    consultarProducto(tbody);
    tbody.addEventListener("click",(e)=>{
        
        if(e.target.tagName =="BUTTON" || e.target.tagName =="I"){
            
            if(e.target.className =="btnEditar"){
                console.log("Editar")
            }else{
                console.log("ELiminar")
            }
        }
    })

    form.addEventListener("submit", (e)=>{
        e.preventDefault()
        submitCrearProd(form)
        
    })

    divPadre.appendChild(formularioFragment);
    divPadre.appendChild(tableFragment)

    return divPadre;

}

const formCrearProductoHtml = () => {
    const parametros = {
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
    
    // Retorna un DocumentFragment que se puede insertar directamente en el DOM
    formulario(parametros);
}


const tableCrearProducto = () => {

    const parametros = {
        style: `<style>
    
        table {
                margin-top:5%;
                border: 1px solid black;
                padding: 10px;
                border-radius:5px;
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                text-align:  center;
                width: 900px;
                background-color: #ECEFF1;
                border-collapse: collapse;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.253);
            }
            thead {
                background-color:  #0f0f0fff;
                color: whitesmoke;
            }
            td {
                border: 1px solid black;
                padding: 6px;
            }
            th {
                padding: 10px;
                border: 1px solid black;
            }
            .btnEditar{
                background-color: #38A0F5;
                border-radius: 2px;
                padding: 4px; 
                width: 40px;
                height: 25px;
                color:whitesmoke; 
                border:none; 
                cursor:pointer;}
            .btnEliminar{
            
                color:whitesmoke; 
                width: 40px;
                height: 25px;
                background-color: #DA5252;
                padding: 5px; 
                border:none; 
                border-radius: 4px;
        
            }    
    
    </style>
    `,
        thead: ["Id Producto", "Descripción", "Costo", "PVP", "Acción"],
        tbody: ["idProd01", "descripcion del producto", "$100", "$150"],
        idTbody: "tbodyProducto"
    }
    return table(parametros);   
}












