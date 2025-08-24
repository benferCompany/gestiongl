import { consultarProducto } from "../../../controladores/principales/producto/consulta.js";

export const crear =() => {
    const divPadre = document.createElement("div");
    divPadre.style.cssText = `
        display: flex;
        justify-content: space-around;
    `;
    
    // Llamamos a la función para obtener el fragmento y lo agregamos
    divPadre.appendChild(formCrearProductoHtml());
    divPadre.appendChild(tableCrearProducto())
   
    return divPadre;

}

const formCrearProductoHtml = () => {
    const formulario = `
    <style>
        form {
            background-color: #F8F9F9;
            padding: 1rem;
            text-align: center;
            border-radius: 5px;
            width: 230px;
            box-shadow: 0 6px 12px rgba(0, 0, 0, 0.466);
        }

        input[type="submit"] {
            height: 35px;
            width: 210px;
            background-color: #1151da;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            transition: background-color 0.3s, transform 0.3s;
        }

        input[type="submit"]:hover {
            background-color: #4e80eb;
            color: whitesmoke;
        }

        label {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        input {
            height: 27px;
            width: 200px;
            background-color: #FBFCFC;
            border: 1px solid #D5DBDB;
        }
    </style>

    <form id="formCrearProd" action="">
        <label>ID Producto</label><br>
        <input type="text" name="id_producto"><br><br>

        <label>Descripción</label><br>
        <input type="text" name="descripcion"><br><br>

        <label>Costo</label><br>
        <input type="number" name="costo"><br><br>

        <label>PVP</label><br>
        <input type="number" name="pvp"><br><br>
        
        <input type="submit" value="CARGAR">
        <div id="mensaje-crear-producto"></div>
    </form>
    `;

    // Retorna un DocumentFragment que se puede insertar directamente en el DOM
    return document.createRange().createContextualFragment(formulario);
}


const tableCrearProducto = () => {
    const html = `
    
    <style>
    
        table {
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
                background-color: #1151da;
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


    <div>
            <table>
                <thead>
                    <tr>
                        <th>Id Producto</th>
                        <th>Descripción</th>
                        <th>Costo</th>
                        <th>PVP</th>
                        <th>Acción</th>
                    </tr>
                </thead>
                <tbody id="tbodyProducto">
                    <tr>
                        <td>idProd01</td>
                        <td>Descripción del producto</td>
                        <td>$100</td>
                        <td>$200</td>
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