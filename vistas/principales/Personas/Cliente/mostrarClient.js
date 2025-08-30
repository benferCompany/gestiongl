import { table } from "../../../../controladores/principales/componentes/table.js";


export const tablaClient = function () {
  const parametrosEjemplo = {
    style: `<style> 

        table {
           padding: 2em;
           background: black;
        }
        thead {
           border: 1px solid whitesmoke;
           color: whitesmoke;
           font-family: Arial, Tahoma, sans-serif;
        }
        tbody{
            border: 1px solid whitesmoke;
            color:whitesmoke;
            font-family: Arial, Tahoma, sans-serif;
        }
    </style>`,
    thead: ["Nombre", "Apellido", "Dirección", "CUIT", "Teléfono", "opciones"],
    tbody: ["se llena con nombre","se pone el apellido", "se pone la dirección", "aca va el cuit", "y aca el telefono"],
    idTbody:"idTbodyCliente"
}
  return table(parametrosEjemplo)
}