    
const sidebar = document.getElementById('sidebar');
const content = document.getElementById('content');

document.getElementById('toggleSidebar').addEventListener('click', () => {
    sidebar.classList.toggle('collapsed');
    content.classList.toggle('full-width');
});

async function cargarPagina(pageUrl, script_file = null) {
    const res = await fetch(pageUrl);
    const html = await res.text();
    content.innerHTML = html;

    if (script_file) {
        const oldScript = document.getElementById('content_script');
        if (oldScript) oldScript.remove();

        const script = document.createElement('script');
        //script.src = script_file + '?t=' + new Date().getTime();
        script.src = script_file;
        script.id = 'content_script';
        document.body.appendChild(script);
    }
}


// Navegación dinámica
document.querySelectorAll('#sidebar a[data-page]').forEach(link => {
    link.addEventListener('click', async e => {
        e.preventDefault();
        const pageUrl = link.getAttribute('data-page');
        const script_file = link.getAttribute('script_file');
        cargarPagina(pageUrl, script_file,"content");
            
    });
});


window.addEventListener('DOMContentLoaded', () => {
    cargarPagina('/home', '');

});
  
  