import { fondoOscuro } from "../../../vistas/componentes/fondoOscuro.js";
import { debounce, trToJson } from "../../tools/tools.js";













export const jsSelectInputCliente = (inputParam,urlServicio) => {

     const div = document.createElement("div");
     div.id = "contenido";
     div.innerHTML = `
     <style>
        #contenido{
            all:unset;
        }
        #contenido input{
            
            border: none;
            height: 30px;
            border-radius: 5px;
            cursor: pointer;
            margin-bottom: 2em;
        }
        #contenido table{
            all: unset;
        }
     </style>
         <input  type="text" placeholder="Buscar..."> 
         <hr><br>
         
         <table tabindex="0">
             <thead>
                
             </thead>
             <tbody>
                 
             </tbody>
         </table>
     `;
    const input = div.querySelector("input");
    input.value = inputParam.value;
    
    
     debouncedGetContent(div,urlServicio,inputParam);

     
     keyDownInput(div,urlServicio,inputParam);
    
     
     keyDownContenido(div,inputParam)
    if(document.body.querySelector("#fondoOscuro")) return;
     document.body.appendChild(fondoOscuro(div));
     div.querySelector("input").focus();
    
     
    

 }    


const debouncedGetContent = debounce((contenido,url,inputParam) => {
            console.log(url)
             contenido.querySelector("tbody").innerHTML = "";
             getContent(contenido,url,inputParam);
         }, 300);


const keyDownInput = (contenido,url,inputParam)=>{
        
        const input = contenido.querySelector("input");    
    
         input.addEventListener("input",(e)=>{
             
     
         debouncedGetContent(contenido,url,inputParam);
     });
    }
    
    

 const getContent = async (contenido,url,inputParam)=>{
         
        const input = contenido.querySelector("input");
        const thead = contenido.querySelector("thead");
        const texto = input.value;
         
       
         if(!texto || texto.length < 3) return
         const response = await fetch(url, {
             method: "POST",
             headers: {
                 "Content-Type": "application/json"
             },
             body: JSON.stringify({ search: texto })
             });
         const responseJson = await response.json();
         if(responseJson.data.length <=0) return
         const keys = Object.keys(responseJson.data[0])
         
         responseJson.data.forEach((element,i) => {
             const tr = document.createElement("tr");
             tr.addEventListener("click", (e)=>{
                 eventoClick(e.target.closest("tr"), contenido,inputParam);
             });
             const trhead = document.createElement("tr");    
             const theadBoolean = thead.childElementCount < 1
             keys.forEach(k =>{
                 if(theadBoolean){
                   
                     const th = document.createElement("th");
                     th.innerHTML = k
                     trhead.append(th);
                 }
                 const td = document.createElement("td");
                 td.innerHTML = element[k];
                 tr.tabIndex = 0;
                 tr.append(td);
             })
             if(theadBoolean){
             
                 thead.append(trhead)
             }
             contenido.querySelector("tbody").append(tr)
         
         })
    
     }
    


      const eventoClick =(e,div,inputParam)=>{
         
          if(!e) return;
         console.log(e)
         console.log(div.querySelector("thead"))
         const json = trToJson(e, div.querySelector("thead"));
         inputParam.value = json["id"] + " " + json["nombre"] + " " + json["apellido"];
         inputParam.setAttribute("objeto", JSON.stringify(json));
         inputParam.select();
         
         document.getElementById("fondoOscuro").remove();
    
     }



     const keyDownContenido = (contenido, inputParam)=>{
         let index = 0;
         
         contenido.addEventListener('keydown', (e) => {
             const rows = contenido.querySelectorAll('tbody tr');
             try{
    
                 if (e.key === "ArrowDown") {
                 index = Math.min(index, rows.length - 1);
                 rows[index].focus();
                 index++
                 
                 }
         
                 if (e.key === 'ArrowUp') {
                     index--
                     index = Math.max(index, 0);
                     rows[index-1].focus();
                 }
                 if(e.key === "Enter"){
                     const selectedRow = contenido.querySelectorAll('tbody tr')[index -1];
                    
                     eventoClick(selectedRow, contenido,inputParam);
                 }
             }catch(e){
                 contenido.querySelector("input").select();
             }
    
     
     });
     }