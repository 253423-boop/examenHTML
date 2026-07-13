// --- 1. LÓGICA DEL CARRUSEL (inicio.html) ---
let currentSlide = 0;
const track = document.getElementById('carouselTrack');
const slides = document.querySelectorAll('.carousel-slide');

function moveCarousel(direction) {
    if (!track || slides.length === 0) return;

    currentSlide += direction;

    if (currentSlide >= slides.length) currentSlide = 0;
    if (currentSlide < 0) currentSlide = slides.length - 1;

    track.style.transform = `translateX(-${currentSlide * 100}%)`;
}

// Avance automático cada 5 segundos
if (track) {
    setInterval(() => moveCarousel(1), 5000);
}

// --- 2. LÓGICA DE FILTROS DEL CATÁLOGO (menu.html) ---
// Categorías soportadas: damas, caballeros, ninos, ninas
function filterCatalog(category, event) {
    // Estado visual del botón activo
    const buttons = document.querySelectorAll('.filter-btn');
    buttons.forEach(btn => btn.classList.remove('active'));

    if (event && event.currentTarget) {
        event.currentTarget.classList.add('active');
    }

    // Filtrado de productos según la clase de categoría
    const products = document.querySelectorAll('.product-item');

    products.forEach(product => {
        if (category === 'todos' || product.classList.contains(category)) {
            product.style.display = 'block';
        } else {
            product.style.display = 'none';
        }
    });
}

// --- 3. LÓGICA DEL CARRITO DE COMPRA (carrito.html) ---

// Recalcula el total general (parte inferior derecha)
function actualizarTotal() {
    const filas = document.querySelectorAll('#cartBody tr');
    let total = 0;

    filas.forEach(fila => {
        const precio = parseFloat(fila.dataset.precio);
        const cantidad = parseInt(fila.querySelector('input[type="number"]').value) || 0;
        // El total general = suma de (precio unitario x cantidad) de cada fila
        total += precio * cantidad;
    });

    const totalEl = document.getElementById('cartTotal');
    if (totalEl) {
        totalEl.textContent = `$${total.toFixed(2)}`;
    }
}

// Elimina la fila del producto (icono eliminar)
function eliminarProducto(boton) {
    const fila = boton.closest('tr');
    if (fila) {
        fila.remove();
        actualizarTotal();
    }
}

// Inicializa el total al cargar la página del carrito
document.addEventListener('DOMContentLoaded', actualizarTotal);
