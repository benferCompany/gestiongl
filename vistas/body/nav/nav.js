const style = `
    <style>
        * {
            padding: 0;
            margin: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        #nav {
            position: relative;
        }

        /* Menú hamburguesa para móvil */
        .menu-toggle {
            display: none;
            background: none;
            border: none;
            cursor: pointer;
            padding: 10px;
            z-index: 1001;
        }

        .menu-toggle span {
            display: block;
            width: 25px;
            height: 3px;
            margin: 5px 0;
            background-color: whitesmoke;
            transition: all 0.3s ease;
        }

        /* Estilos para el overlay cuando el menú está abierto */
        .nav-overlay {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5);
            z-index: 999;
            opacity: 0;
            transition: opacity 0.3s ease;
        }

        .nav-overlay.active {
            display: block;
            opacity: 1;
        }

        /* Estilos principales del nav */
        #navegadores {
            display: flex;
            justify-content: space-around;
            padding: 1rem;
            background: linear-gradient(135deg, #0f0f0f 0%, #1a1a1a 100%);
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
            position: relative;
            z-index: 1000;
        }

        #navegadores button {
            background: transparent;
            color: whitesmoke;
            cursor: pointer;
            border: none;
            padding: 12px 24px;
            border-radius: 8px;
            font-weight: 600;
            letter-spacing: 0.5px;
            transition: all 0.3s ease;
            position: relative;
            overflow: hidden;
        }

        #navegadores button::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
            transition: left 0.5s ease;
        }

        #navegadores button:hover {
            background: rgba(240, 133, 33, 0.1);
            transform: translateY(-2px);
        }

        #navegadores button:hover::before {
            left: 100%;
        }

        #navegadores button:active {
            transform: translateY(0);
        }

        /* Estilos para el menú lateral móvil */
        .mobile-nav {
            position: fixed;
            top: 0;
            left: -280px;
            width: 280px;
            height: 100vh;
            background: linear-gradient(135deg, #0f0f0f 0%, #1a1a1a 100%);
            box-shadow: 2px 0 20px rgba(0, 0, 0, 0.5);
            z-index: 1000;
            transition: left 0.3s ease;
            overflow-y: auto;
        }

        .mobile-nav.active {
            left: 0;
        }

        .mobile-nav-header {
            padding: 20px;
            border-bottom: 1px solid rgba(240, 133, 33, 0.3);
            margin-bottom: 20px;
        }

        .mobile-nav-header h3 {
            color: rgb(240, 133, 33);
            font-size: 1.2rem;
            font-weight: 600;
        }

        .mobile-nav button {
            width: calc(100% - 40px);
            margin: 10px 20px;
            padding: 15px 20px;
            background: transparent;
            color: whitesmoke;
            border: 1px solid rgba(240, 133, 33, 0.3);
            border-radius: 10px;
            cursor: pointer;
            font-weight: 500;
            text-align: left;
            transition: all 0.3s ease;
            position: relative;
            overflow: hidden;
        }

        .mobile-nav button::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(240, 133, 33, 0.2), transparent);
            transition: left 0.5s ease;
        }

        .mobile-nav button:hover {
            background: rgba(240, 133, 33, 0.1);
            border-color: rgb(240, 133, 33);
            transform: translateX(5px);
        }

        .mobile-nav button:hover::before {
            left: 100%;
        }

        .close-nav {
            position: absolute;
            top: 10px;
            right: 10px;
            background: none;
            border: none;
            color: whitesmoke;
            font-size: 24px;
            cursor: pointer;
            width: 40px;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            transition: all 0.3s ease;
        }

        .close-nav:hover {
            background: rgba(240, 133, 33, 0.2);
            transform: rotate(90deg);
        }

        /* Estilos para el subnavegador */
        #subNavegadores {
            background: linear-gradient(135deg, #f08521 0%, #f57c00 100%);
            box-shadow: 0 4px 15px rgba(240, 133, 33, 0.3);
            padding: 0.8rem;
            display: flex;
            gap: 10px;
            flex-wrap: wrap;
        }

        #subNavegadores button {
            background: rgba(0, 0, 0, 0.8);
            color: whitesmoke;
            cursor: pointer;
            border: 1px solid rgba(255, 255, 255, 0.2);
            padding: 10px 20px;
            border-radius: 25px;
            font-weight: 500;
            transition: all 0.3s ease;
            backdrop-filter: blur(5px);
        }

        #subNavegadores button:hover {
            background: rgba(0, 0, 0, 0.95);
            border-color: whitesmoke;
            transform: translateY(-2px);
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
        }

        #subNavegadores button:active {
            transform: translateY(0);
        }

        /* Media queries para responsive */
        @media screen and (max-width: 768px) {
            #navegadores {
                justify-content: flex-start;
                padding: 1rem;
            }

            .menu-toggle {
                display: block;
            }

            #navegadores button:not(.menu-toggle) {
                display: none;
            }

            #subNavegadores {
                justify-content: center;
            }

            #subNavegadores button {
                flex: 1 1 auto;
                min-width: 120px;
            }
        }

        @media screen and (max-width: 480px) {
            #subNavegadores button {
                flex: 1 1 100%;
            }

            .mobile-nav {
                width: 100%;
                left: -100%;
            }
        }

        /* Animaciones */
        @keyframes slideIn {
            from {
                transform: translateX(-100%);
            }
            to {
                transform: translateX(0);
            }
        }

        @keyframes fadeIn {
            from {
                opacity: 0;
            }
            to {
                opacity: 1;
            }
        }
    </style>
`;

export const nav = function () {
    const nav = document.createElement("nav");
    nav.id = "nav";
    nav.innerHTML = `
        ${style}
        <div id="navegadores">
            <button class="menu-toggle" id="menuToggle">
                <span></span>
                <span></span>
                <span></span>
            </button>
            <button>FACTURA</button>
            <button>INVENTARIO</button>
            <button>PERSONAS</button>
            <button>BALANCES</button>
        </div>
        <div id="subNavegadores">

        </div>
        <div class="nav-overlay" id="navOverlay"></div>
        <div class="mobile-nav" id="mobileNav">
            <button class="close-nav" id="closeNav">×</button>
            <div class="mobile-nav-header">
                <h3>Menú Principal</h3>
            </div>
            <button>FACTURA</button>
            <button>INVENTARIO</button>
            <button>PERSONAS</button>
            <button>BALANCES</button>
        </div>
    `;

    // Agregar funcionalidad JavaScript para el menú móvil
    setTimeout(() => {
        const menuToggle = document.getElementById('menuToggle');
        const mobileNav = document.getElementById('mobileNav');
        const navOverlay = document.getElementById('navOverlay');
        const closeNav = document.getElementById('closeNav');

        if (menuToggle && mobileNav && navOverlay && closeNav) {
            function openMenu() {
                mobileNav.classList.add('active');
                navOverlay.classList.add('active');
                document.body.style.overflow = 'hidden';
            }

            function closeMenu() {
                mobileNav.classList.remove('active');
                navOverlay.classList.remove('active');
                document.body.style.overflow = '';
            }

            menuToggle.addEventListener('click', openMenu);
            closeNav.addEventListener('click', closeMenu);
            navOverlay.addEventListener('click', closeMenu);
        }
    }, 0);

    return nav;
}