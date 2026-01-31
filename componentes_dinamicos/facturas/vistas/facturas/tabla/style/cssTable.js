export const cssFacturas = (param) => {


return ` <style>
            
            #${param.idFactura} table {
                width: 100%;
                border-collapse: collapse;
            }
            #${param.idFactura} th, td {
                border: 1px solid #ddd;
                padding: 8px;
                text-align: left;
            }
            #${param.idFactura} th {
                background-color: #f2f2f2;
            }
        </style>`;
}