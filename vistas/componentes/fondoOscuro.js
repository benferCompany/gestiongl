import { observarCambios } from "../../controladores/hooks.js";





export const fondoOscuro = (contenido) => {
    const div = document.createElement("div");
     observarCambios(document.body,avisarCambio)

    contenido.classList.add("webkitScroll")
    div.id = "fondoOscuro"
    div.style = `width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.5);
        position: fixed;
        top: 0;
        justify-content: center;
        align-items: center;
        text-align: center;
        position: fixed;
        display: flex;
        overflow: auto;
    `
    div.appendChild(contenido);
    const style = document.createElement("style");

    style.innerHTML = `
    
        .webkitScroll{
         overflow:auto;
        }
    `
    contenido.style.scrollbarColor = "grey black";

    contenido.append(style);


    div.addEventListener("click", (e)=>{
        if(e.target.id =="fondoOscuro")
            
            e.target.remove()
    })

    return div;
}





export const fondoOscuroSinEsc = (contenido) => {
    const div = document.createElement("div");
     observarCambios(document.body,avisarCambio)

    contenido.classList.add("webkitScroll")
    div.id = "fondoOscuroSinEsc"
    div.style = `width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.5);
        position: fixed;
        top: 0;
        justify-content: center;
        align-items: center;
        text-align: center;
        position: fixed;
        display: flex;
        overflow: auto;
    `
    div.appendChild(contenido);
    const style = document.createElement("style");

    style.innerHTML = `
    
        .webkitScroll{
         overflow:auto;
        }
    `
    contenido.style.scrollbarColor = "grey black";

    contenido.append(style);


    return div;
}




function avisarCambio(mutation) {
        
    const body = document.body;
    if(body.querySelector("#fondoOscuro")){
        body.style.overflow ="hidden";
    }else{
        body.style.overflow ="auto";
    }
}



export class FondoOscuro {
    constructor(contenido) {
        this.contenido = contenido;
        this.div = null;
        this.init();
    }

    init() {
        observarCambios(document.body, avisarCambio);

        this.contenido.classList.add("webkitScroll");
        
        this.div = document.createElement("div");
        this.div.id = "fondoOscuro";
        this.div.style = `width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.5);
            position: fixed;
            top: 0;
            justify-content: center;
            align-items: center;
            text-align: center;
            position: fixed;
            display: flex;
            overflow: auto;
        `;
        
        this.div.appendChild(this.contenido);
        
        const style = document.createElement("style");
        style.innerHTML = `
            .webkitScroll{
                overflow:auto;
            }
        `;
        
        this.contenido.style.scrollbarColor = "grey black";
        this.contenido.append(style);

        document.body.addEventListener("keydown",(e)=>{
         
            if(e.key=="Escape") this.handleClick({target:this.div})
        })
    }

    handleClick(e) {
        if (e.target.id === "fondoOscuro") {
            this.delete();
        }
    }

    delete() {
        if (this.div && this.div.parentNode) {
            this.div.removeEventListener("click", this.handleClick);
            this.div.remove();
            this.div = null;
            this.contenido = null;
        }
    }
}

// Uso:
// const fondo = new FondoOscuro(miContenido);
// document.body.appendChild(fondo.div);
// Para eliminar: fondo.delete()