import { updateAll } from "../frontend/main.js";
import { buscarPorTexto, cargarProductos, debounce, mostrar, URL } from "./hooks.js";
import { navLateral } from "./navLateral/navLateral.js";
const article = document.getElementById('article');
const inputSearch = document.getElementById("idSearch");
const param = {
    URLS:{
        mostrarProductosConImagen :URL+"/servicios/tienda/producto/consulta.php",
        mostrarProductos: URL+"/servicios/principales/inventario/producto/buscar.php",
        mostrarCategorias: URL+"/servicios/tienda/producto/categoria/mostrar.php",
        productosPorCategoria: URL+"/servicios/tienda/producto/consultaPorCategoria.php",
        buscarProducto: URL+"/servicios/tienda/producto/buscarProducto.php",
    },
    url:""
}

//Carga los datos al arrancar
mostrar(param.URLS.mostrarProductosConImagen,article);


//Cargar categoria en el nav lateral
const navegaorLateral = document.getElementById("navLateral")
if(navegaorLateral){
    param.navegador = navegaorLateral;
    navLateral(param);
}


//Buscar en el input principal
const response = debounce(async(param)=>{
        const productos = await buscarPorTexto(param)??[];
        
        param.data = productos.data??null;
        if(productos == null || productos.status!="success") return;
        param.article = article
        article.innerHTML = "";
        cargarProductos(param);
        updateAll();
    },300)

inputSearch.addEventListener("input",(e)=>{
    param.body= {search:e.target.value};
    param.url = param.URLS.buscarProducto;
    if( !param.body.search || param.body.search=="") {
        article.innerHTML=""
        return
    };
    response(param)
    


})
