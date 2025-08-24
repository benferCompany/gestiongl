import { consulta } from "../../hooks.js"

export const consultarProducto= async()=>{
    return await consulta("http://localhost/servicios/principales/producto/consulta.php")
}