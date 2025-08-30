import { formulario } from "../../../componentes/formulario.js";





export const crearCliente = ()=>{

    const parametrosEjemplo = {
    style: `<style>
       #formCrearCliente {
            display: flex;
            flex-direction: column; 
            background: black;
            color: whitesmoke;
            padding: 1em;
            width: 300px;
            border-radius: 10px;
            margin-top: 2em;
            font-family: Arial, Tahoma, sans-serif;
            box-shadow: 0 0 6px rgba(0, 0, 0, 0.9);
       }
        input[type="text"] {
            height: 20px;
            background: transparent;
            border-top: none;
            border-left: none;
            border-right: none;
            border-bottom: 1px solid whitesmoke;
            transition: 0.3s;
        }
        input[type="text"]:hover {
            height: 25px;
            background:  rgba(240, 133, 33, 0.16);;
            border-top: none;
            border-left: none;
            border-right: none;
            border-bottom: 1px solid whitesmoke;
        }
        input[type="submit"] {
            color: whitesmoke;
            background:  rgba(240, 133, 33, 1);
            border-radius: 5px;
            border: none;
            padding: 10px;
            width: 300px;
            height: 50px;
            font-size: 20px;
            cursor: pointer;
            transition: 0.3s;
        }
        input[type="submit"]:hover {
            color: whitesmoke;
            background:  rgba(240, 33, 33, 0.72);
            border-radius: 5px;
            border: none;
            padding: 10px;
            width: 300px;
            cursor: pointer;
        }
        label {
            margin-bottom: 0.5em;
        }
    
        </style>
    `,
    idFormulario: "formCrearCliente",
    inputs: [
        { type: "text", name: "id_cleinte", label: "Id Cliente"},
        { type: "text", name: "Nombre", label: "Nombre" },
        { type: "text", name: "Apellido", label: "Apellido" },
        { type: "text", name: "Cuit", label: "CUIT" },
        { type: "text", name: "Direccion", label: "Dirección" },
        { type: "text", name: "Telefono", label: "Teléfono" }
    ],
    submitValue: "Cargar",
    idMensaje: "mensaje-crear-cliente"



}
    return formulario(parametrosEjemplo);
}