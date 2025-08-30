import {URL} from "../../url/url.js"
export const crearCliente=async(form)=>{
    try{
        const formulario = new FormData(form)
        const response = await fetch(URL+"/servicios/principales/cliente/crearCliente.php",{
            method: "POST",
            body: formulario
        })
        const responseJson = await response.json();
        console.log(responseJson);
    }catch(error){
        console.log(error);
    }
}