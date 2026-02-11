import { inputSearch } from "./inputSearch/inputSearch.js";
import { selectFacturas } from "./select/select.js";
import { tablaFacturas } from "./tabla/tabla.js";

export const factura = async (param) => {
    const div = document.createElement("div");
    div.id="facturas-contenido";
 div.innerHTML =` 
       <style>
            #facturas-contenido               {
                  max-width: 100%;
                  width: 100%;
                  text-align: center;
                  background-color: #ffffff;
                  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
                  overflow: hidden;
            }

            #div-head               {
                  max-width: 100%;
                  width: 100%;
                  padding: 1.5rem;
                  background: linear-gradient(to right, #1a1a1a, #333333);
                  display: flex;
                  align-items: center;
                  flex-wrap: wrap;
                  justify-content: space-around;
                  border-bottom: 2px solid #FF9800;
                  
            }
            #div-head select {
                  width: 320px;
                  font-size: 1rem;
                  padding: 0.875rem 1rem;
                  border: 2px solid #e0e0e0;
                  border-radius: 8px;
                  cursor: pointer;
                  background-color: #ffffff;
                  color: #333333;
                  font-weight: 500;
                  transition: all 0.3s ease;
              }
            
            #div-head select:focus {
                  outline: none;
                  border-color: #FF9800;
                  box-shadow: 0 0 0 3px rgba(255, 152, 0, 0.2);
               }
              
            #div-head select:hover {
                  background-color: #f9f9f9;
                  border-color: #cccccc;
              }
              
              #div-head input {
                  margin-left: 1em;
                  width: 200px;
                  padding:1rem;
                  border: none;
                  border-radius: 5px;
                  cursor: pointer;
                  background-color: #ff9f38;
                  color: #ffffff;
                  font-weight: 600;
                  font-size: 1rem;
                  letter-spacing: 0.5px;
                  transition: all 0.3s ease;
                  box-shadow: 0 3px 6px rgba(255, 152, 0, 0.3);
              }
              ::placeholder {
                  color: whitesmoke;
              }
              #div-head input:hover {
                  background-color: #e98e33;
                  transform: translateY(-2px);
                  box-shadow: 0 5px 12px rgba(241, 194, 124, 0.4);
              }
              
              #div-head input:active {
                  transform: translateY(0);
                  box-shadow: 0 2px 4px rgba(255, 152, 0, 0.3);
              }
              
              #facturas-contenido table {
                  width: 100%;
                  border-collapse: collapse;
                  text-align: center;
                  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                  color: #333333;
              }
              
              #facturas-contenido table thead {
                  background-color: #f5f5f5;
                  border-bottom: 2px solid #e0e0e0;
              }
              
              #facturas-contenido table th {
                  padding: 1.2rem 0.8rem;
                  color: #333333;
                  font-weight: 600;
                  text-transform: uppercase;
                  font-size: 0.9rem;
                  letter-spacing: 0.5px;
              }
              
              #facturas-contenido table tbody tr {
                  border-bottom: 1px solid #f0f0f0;
                  transition: background-color 0.2s ease;
              }
              
              #facturas-contenido table tbody tr:hover {
                  background-color: #fafafa;
              }
              
              #facturas-contenido table td {
                  padding: 1.2rem 0.8rem;
                  color: #555555;
                  font-weight: 500;
              }
              
              #facturas-contenido table button {
                  cursor: pointer;
                  border: none;
                  border-radius: 6px;
                  padding: 0.75rem 1.5rem;
                  background: linear-gradient(to right, #333333, #444444);
                  color: #ffffff;
                  font-weight: 600;
                  font-size: 0.9rem;
                  transition: all 0.3s ease;
                  min-width: 120px;
                  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
              }
              
              #facturas-contenido table button:hover {
                  background: linear-gradient(to right, #FF9800, #F57C00);
                  transform: translateY(-2px);
                  box-shadow: 0 4px 8px rgba(255, 152, 0, 0.3);
                  color: #ffffff;
              }
              
              #facturas-contenido table button:active {
                  transform: translateY(0);
              }
              
              /* Responsive para pantallas más pequeñas */
              @media (max-width: 768px) {
                  #div-head {
                      flex-direction: column;
                      align-items: stretch;
                      padding: 1.2rem;
                  }
                  
                  #div-head select,
                  #div-head input {
                      width: 100%;
                  }
                  
                  #facturas-contenido table th,
                  #facturas-contenido table td {
                      padding: 0.8rem 0.5rem;
                      font-size: 0.85rem;
                  }
                  
                  #facturas-contenido table button {
                      padding: 0.6rem 1rem;
                      min-width: 100px;
                      font-size: 0.85rem;
                  }
              }  
    `;
    param.idFactura = div.id;
    param.div = div;

    //CREAMOS EL DIV HEAD///////
    const divA = document.createElement('div');
    divA.id = "div-head";

    //Obtener el select de facturas
    const select = await selectFacturas(param);
    divA.appendChild(select);
    param.select = select;

    //Obtener el input de facturas
    const input = inputSearch(param);
    divA.appendChild(input);

    //AGREMAMOS EL INPUT Y SELEC AL divA

    div.appendChild(divA);
    
    //Obtener la tabla de facturas
    const table = tablaFacturas(param);
    div.appendChild(table);

    return div;
}