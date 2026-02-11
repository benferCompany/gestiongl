export const cssFacturas = (param) => {


return ` <style>
            
            #${param.idFactura} table {
                width: 100%;
                border-collapse: collapse;
            }
            #${param.idFactura} .pagada button{
                background:#1ba053;
            }

            #${param.idFactura} .parcial button{
                background:#d86405;
            }

             #${param.idFactura} .sin-pagos button{
                background:#d40707;
            }
            #${param.idFactura} .button-presupuesto{
                background-color:red;
            }
            #${param.idFactura} th, td {
                border: 1px solid #dddddd;
                padding: 8px;
                text-align: left;
            }
            #${param.idFactura} th {
                background-color: #f2f2f2;
            }
        </style>`;
}