
(function () {

    let buscador = document.getElementById('buscador'); 
    let resetBtn = document.getElementById("btnReset");  
    let btnExportPDF = document.getElementById("btnExportPDF");
    let tabla = document.getElementById("tablaProductos");
    let tablaBody = document.querySelector('#tablaProductos tbody');
    let filasOriginales = Array.from(tablaBody.querySelectorAll('tr'));
    let paginacion = document.getElementById('paginacion');
    let filasPorPagina = 15
    let paginaActual = 1;

    function aplicarFiltroYActualizar() {
        let filtro = buscador.value.toLowerCase();
        let filasFiltradas = filasOriginales.filter(fila => 
            fila.textContent.toLowerCase().includes(filtro)
        );

        mostrarPagina(filasFiltradas, 1);
    }

    function mostrarPagina(filas, pagina) {
        paginaActual = pagina;
        let inicio = (pagina - 1) * filasPorPagina;
        let fin = inicio + filasPorPagina;

        // Limpiar tabla
        tablaBody.innerHTML = '';

        // Mostrar las filas correspondientes a esta página
        filas.slice(inicio, fin).forEach(fila => {
            tablaBody.appendChild(fila);
        });

        actualizarPaginacion(filas);
    }

    function actualizarPaginacion(filas) {
        let totalPaginas = Math.ceil(filas.length / filasPorPagina);
        paginacion.innerHTML = '';

        for (let i = 1; i <= totalPaginas; i++) {
            let li = document.createElement('li');
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

    resetBtn.addEventListener("click", () => {
        buscador.value = "";
        paginaActual = 1;
        aplicarFiltroYActualizar();
    });


    //Exportar tabla en PDF
    btnExportPDF.addEventListener("click", () => {
        let { jsPDF } = window.jspdf;
        let doc = new jsPDF();
        // Encabezado
        doc.text("Lista de Productos", 14, 15);

        // Extraer filas visibles
        let rows = [];
        let headers = [];

        tabla.querySelectorAll("thead th").forEach(th => {
            if (th.innerText !== "Acciones") {
            headers.push(th.innerText);
            }
        });

        filasOriginales.forEach(fila => {
            if (fila.style.display !== "none") {
            let cols = Array.from(fila.querySelectorAll("td")).slice(0, 5).map(td => td.innerText.trim());
            rows.push(cols);
            }
        });

        doc.autoTable({
            startY: 20,
            head: [headers],
            body: rows,
            theme: "striped"
        });

        doc.save("productos.pdf");
    });

})();
