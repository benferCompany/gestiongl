
const style = `
    <style>
        *  {
            padding: 0;
            margin: 0;
            }
        nav {
            padding: 1rem;
            display: flex;
            justify-content: space-around;
            background-color: #0f0f0fff;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.48);
        }
        button {
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
    nav.innerHTML = `
        ${style}
        <button>Ventas</button>
        <button>Compras</button>
        <button id ="idNavButtonProducto">Producto</button>
        <button>Balances</button>
        <button>Clientes</button>
    `;
    return nav;
}