
const style = `
    <style>
        *  {
            padding: 0;
            margin: 0;
            }
        nav{
            
        }
        #navegadores {
            display:flex;
            justify-content: space-around;
            padding: 1rem;
            background-color: #0f0f0fff;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.48);
            
        }
        #subNavegadores{
            background:orange;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.48);
        }
        #subNavegadores button {
        background-color: rgba(0, 0, 0, 1);
            color:whitesmoke;
            cursor: pointer;
            border: 1px solid whitesmoke;
            padding: 10px;
            border-radius: 5px;
        }
        #subNavegadores, #navegadores button {
            background-color: rgba(240, 133, 33, 1);
            color: whitesmoke;
            cursor: pointer;
            border: none;
            padding: 10px;
            border-radius: 5px;
        }
    </style>`

export const nav = function () {
    const nav = document.createElement("nav");
    nav.id = "nav"
    nav.innerHTML = `
        ${style}
        <div id="navegadores">
        
            <button>FACTURA</button>
            <button>INVENTARIO</button>
            <button>PERSONAS</button>
            <button>BALANCES</button>
        
        </div>
        <div id="subNavegadores"></div>
    `;
    return nav;
}