import { updateAll } from "../frontend/main.js";

export const URL = ""

export const mostrar = async(url,article) => {
    const data = await consultas(url);
    const param = {};
    param.data =  data.data;
    param.article = article;
    cargarProductos(param);
    updateAll()
}




export const consultas = async(url) => {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Error de red: ${response.status}`);
        }
        const json = await response.json();
        console.log(json);
        return json;
    } catch (error) {
        console.error('Error al obtener los datos:', error);
        throw error;
    }
};


export const buscarPorTexto = async(param)=>{

    if(param.body.search.length<3 ) return;
    
    try{
    
        const response = await fetch(param.url,{
            method:"POST",
            headers:{"Content-Type": "application/json"},
            body: JSON.stringify(param.body)
        });
        const json = await response.json();

        if(json.status=="success"){
            return json;
        }

        console.info(json.message);
        return json;
        
    }catch(e){
        console.error("Hubo un error al consulta :",e);
    }
}



export const productosPorCategoria = async (param)=>{
    try{
        console.log(param.categoriaId)
        const response = await fetch(param.url,{
            method:"POST",
            headers: {"Content-Type":"application/json"},
            body:JSON.stringify(param.categoriaId)
        })

        const json = await response.json();

        if(json.status =="success"){
            return json;
        }
        console.info("No se pudo cargar la categoría", json.error);
    }catch(e){
        console.error("Hubo un error al consultar categoría")
    }
}


export function debounce(fn, delay) {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => fn(...args), delay);
    };
}



export const cargarProductos = (param)=>{
    param.data.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.classList.add('item');
            itemElement.innerHTML = `
                <div class="producto-card" data-nombre="${item.descripcion}" data-precio="${item.pvp}">
                    <span class="producto-badge">Oferta</span>
                    <div class="producto-imagen"><img width="100" src="${item.imagenes[0].url}" alt="Imagen del producto"></div>
                    <h3>${item.descripcion}</h3>
                    <div class="producto-detalle">${item.descripcion}</div>
                    <div class="producto-precio">$${item.pvp}</div>
                    <button class="btn-accion agregar-carrito">Agregar</button>
                </div>
            `;
            param.article.appendChild(itemElement);
    })

}