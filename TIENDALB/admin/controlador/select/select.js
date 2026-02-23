import { buscarPorTexto } from "../../../backend/hooks.js";

export const selection = async(param)=>{
    
    const data = await buscarPorTexto(param);

    console.log(data)

}