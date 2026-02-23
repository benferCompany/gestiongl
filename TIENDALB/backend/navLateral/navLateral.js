import { consulta } from "../../../controladores/hooks.js";
import { updateAll } from "../../frontend/main.js";
import { cargarProductos, productosPorCategoria } from "../hooks.js";

export const navLateral =async(param)=>{
    console.log(param.navegador)
    const navegador = param.navegador;
    
    const response = await consulta(param.URLS.mostrarCategorias);
    if(response.status != "success") return;
    const categorias = response.data;
    const ul = navegador.querySelector("ul");

    ul.innerHTML = renderCategorias(categorias);
    ul.querySelectorAll("li").forEach(li => {
        li.addEventListener("click",async(e)=>{
            console.log(e.target.dataset.id)
            param.url = param.URLS.productosPorCategoria;
            param.categoriaId = {id_categoria: e.target.dataset.id}
            getProductos(param);
        })
    });
    
}



function renderCategorias(categorias, padreId = null) {
    return categorias
        .filter(ct => ct.id_categoria_padre === padreId)
        .map(ct => {
            const hijos = categorias.some(
                c => c.id_categoria_padre === ct.id
            );

            if (hijos) {
                return `
                   
                
                    <details>
                            <summary>${ct.nombre}</summary>
                                ${renderCategorias(categorias, ct.id)}
                    </details>
                                
                   
                `;
            } else {
                return `<li data-id=${ct.id}>${ct.nombre}</li>`;
            }
        })
        .join("");
}



const getProductos =async(param)=>{
    const article = document.getElementById("article")
    article.innerHTML =""

    const data = await productosPorCategoria(param);
        param.data = data.data;
        param.article = article;
        cargarProductos(param);
        document.body.style=""
        document.body.querySelector(".nav-lateral").setAttribute("class","nav-lateral")
        document.body.querySelector("#overlay").setAttribute("class","overlay")
        updateAll()
}