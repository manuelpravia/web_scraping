
const buscador = document.getElementById('buscador');   
const tablaBody = document.querySelector('#tablaProductos tbody');
const filasOriginales = Array.from(tablaBody.querySelectorAll('tr'));
const paginacion = document.getElementById('paginacion');
const filasPorPagina = 15
let paginaActual = 1;

function aplicarFiltroYActualizar() {
    const filtro = buscador.value.toLowerCase();
    const filasFiltradas = filasOriginales.filter(fila => 
        fila.textContent.toLowerCase().includes(filtro)
    );

    mostrarPagina(filasFiltradas, 1);
}

function mostrarPagina(filas, pagina) {
    paginaActual = pagina;
    const inicio = (pagina - 1) * filasPorPagina;
    const fin = inicio + filasPorPagina;

    // Limpiar tabla
    tablaBody.innerHTML = '';

    // Mostrar las filas correspondientes a esta página
    filas.slice(inicio, fin).forEach(fila => {
        tablaBody.appendChild(fila);
    });

    actualizarPaginacion(filas);
}

function actualizarPaginacion(filas) {
    const totalPaginas = Math.ceil(filas.length / filasPorPagina);
    paginacion.innerHTML = '';

    for (let i = 1; i <= totalPaginas; i++) {
        const li = document.createElement('li');
        li.className = 'page-item' + (i === paginaActual ? ' active' : '');
        li.innerHTML = `<a class="page-link">${i}</a>`;
        li.addEventListener('click', () => mostrarPagina(filas, i));
        paginacion.appendChild(li);
    }
}

// Evento cuando se escribe en el buscador
buscador.addEventListener('input', aplicarFiltroYActualizar);

// Mostrar al inicio
aplicarFiltroYActualizar();
