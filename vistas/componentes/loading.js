import { fondoOscuro } from "./fondoOscuro.js";

export const loading = (show) => {
    if (show) {
       const h1 = document.createElement("h1");
h1.innerHTML = "<span></span><span></span><span></span>";
document.body.appendChild(h1);

const style = document.createElement("style");
style.textContent = `
    h1 {
        display: flex;
        justify-content: center;
        align-items: center; 
        gap: 8px;
    }

    h1 span {
    width: 12px;
    height: 12px;
    background: orange;
    border-radius: 50%;
    animation: bounce 0.6s infinite alternate;
    }

    h1 span:nth-child(2) { animation-delay: 0.2s; }
    h1 span:nth-child(3) { animation-delay: 0.4s; }

    @keyframes bounce {
    from { transform: translateY(0); opacity: 0.5; }
    to { transform: translateY(-10px); opacity: 1; }
    }
`;
    document.head.appendChild(style);






        
        const fondo = fondoOscuro(h1);
        fondo.classList.add("mostrar-loading");
        document.body.appendChild(fondo); // asegurar que quede en el DOM
        return fondo;
    } else {
        const fondo = document.querySelector(".mostrar-loading");
        if (fondo) fondo.remove(); // evita error si no existe
        return null;
    }
};