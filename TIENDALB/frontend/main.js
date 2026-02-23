export function updateAll() {
    // ========== ELEMENTOS DEL DOM ==========
    const menuToggle = document.getElementById('menuToggle');
    const navLateral = document.getElementById('navLateral');
    const overlay = document.getElementById('overlay');
    const carritoIcono = document.getElementById('carritoIcono');
    const carritoPanel = document.getElementById('carritoPanel');
    const cerrarCarrito = document.getElementById('cerrarCarrito');
    const contadorSpan = document.getElementById('contador-carrito');
    const carritoItemsDiv = document.getElementById('carritoItems');
    const totalSpan = document.getElementById('totalCarrito');
    const botonesAgregar = document.querySelectorAll('.agregar-carrito');
    const btnFinalizar = document.getElementById('finalizarCompra');

    // ========== ESTADO DEL CARRITO ==========
    let carrito = [];  // cada item: { nombre, precio }

    // ========== FUNCIONES DEL CARRITO ==========
    function actualizarCarritoUI() {
        // Actualizar contador
        contadorSpan.textContent = carrito.length;

        // Renderizar items en el panel
        if (carrito.length === 0) {
            carritoItemsDiv.innerHTML = '<div class="carrito-vacio">Aún no has agregado productos</div>';
            totalSpan.textContent = '$0';
            return;
        }

        let html = '';
        let total = 0;
        carrito.forEach((item, index) => {
            total += item.precio;
            html += `
                        <div class="item-carrito" data-index="${index}">
                            <div class="item-info">
                                <span class="item-nombre">${item.nombre}</span>
                                <span class="item-precio">$${item.precio.toLocaleString('es-CL')}</span>
                            </div>
                            <button class="item-eliminar" data-index="${index}">🗑️</button>
                        </div>
                    `;
        });
        carritoItemsDiv.innerHTML = html;
        totalSpan.textContent = '$' + total.toLocaleString('es-CL');

        // Asignar eventos a los botones eliminar (recién creados)
        document.querySelectorAll('.item-eliminar').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const index = btn.getAttribute('data-index');
                if (index !== null) {
                    eliminarDelCarrito(parseInt(index));
                }
            });
        });
    }

    function agregarAlCarrito(nombre, precio) {
        carrito.push({ nombre, precio: Number(precio) });
        actualizarCarritoUI();
        // Pequeña animación: abrir carrito automáticamente (opcional)
        // carritoPanel.classList.add('abierto');
        // overlay.classList.add('activo');
    }

    function eliminarDelCarrito(index) {
        if (index >= 0 && index < carrito.length) {
            carrito.splice(index, 1);
            actualizarCarritoUI();
        }
    }

    // ========== EVENTOS PRODUCTOS ==========
    botonesAgregar.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const card = btn.closest('.producto-card');
            if (!card) return;
            const nombre = card.getAttribute('data-nombre');
            const precio = card.getAttribute('data-precio');
            if (nombre && precio) {
                agregarAlCarrito(nombre, precio);
            }
        });
    });

    // ========== MENÚ LATERAL ==========
    function abrirMenu() {
        navLateral.classList.add('abierto');
        overlay.classList.add('activo');
        document.body.style.overflow = 'hidden';
    }
    function cerrarMenu() {
        navLateral.classList.remove('abierto');
        overlay.classList.remove('activo');
        document.body.style.overflow = '';
    }
    menuToggle.addEventListener('click', abrirMenu);
    overlay.addEventListener('click', () => {
        cerrarMenu();
        cerrarCarritoPanel(); // también cerramos carrito si está abierto
    });

    // ========== CARRITO PANEL ==========
    function abrirCarritoPanel() {
        carritoPanel.classList.add('abierto');
        overlay.classList.add('activo');
        document.body.style.overflow = 'hidden';
    }
    function cerrarCarritoPanel() {
        carritoPanel.classList.remove('abierto');
        // Solo quitar overlay si el menú no está abierto
        if (!navLateral.classList.contains('abierto')) {
            overlay.classList.remove('activo');
            document.body.style.overflow = '';
        } else {
            // si el menú está abierto, el overlay sigue
        }
    }
    carritoIcono.addEventListener('click', (e) => {
        e.stopPropagation();
        abrirCarritoPanel();
    });
    cerrarCarrito.addEventListener('click', cerrarCarritoPanel);

    // Cerrar con tecla Escape
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            cerrarMenu();
            cerrarCarritoPanel();
        }
    });

    // Finalizar compra (solo simulación)
    btnFinalizar.addEventListener('click', () => {
        if (carrito.length === 0) {
            alert('El carrito está vacío. Agrega productos profesionales.');
        } else {
            alert('✅ Gracias por tu compra. Pronto recibirás un correo con los detalles.');
            carrito = [];
            actualizarCarritoUI();
            cerrarCarritoPanel();
        }
    });

    // Inicializar UI del carrito vacío
    actualizarCarritoUI();
};