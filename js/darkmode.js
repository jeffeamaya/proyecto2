// darkmode.js
document.addEventListener('DOMContentLoaded', function() {
    const darkModeToggle = document.getElementById('darkModeToggle');
    
    // Aplicar tema almacenado al cargar
    applyStoredTheme();
    
    // Configurar el botón según el tema actual
    updateToggleButton();
    
    // Evento click del botón
    if(darkModeToggle) {
        darkModeToggle.addEventListener('click', function() {
            toggleDarkMode();
        });
    }
    
    // Función para aplicar el tema almacenado
    function applyStoredTheme() {
        const savedTheme = localStorage.getItem('theme') || 'light';
        document.documentElement.setAttribute('data-theme', savedTheme);
    }
    
    // Función para cambiar entre modos
    function toggleDarkMode() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateToggleButton();
    }
    
    // Función para actualizar el botón
    function updateToggleButton() {
        if(!darkModeToggle) return;
        
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const icon = darkModeToggle.querySelector('i');
        
        if (currentTheme === 'dark') {
            if(icon) icon.classList.replace('fa-moon', 'fa-sun');
            darkModeToggle.innerHTML = '<i class="fas fa-sun"></i> Modo Claro';
        } else {
            if(icon) icon.classList.replace('fa-sun', 'fa-moon');
            darkModeToggle.innerHTML = '<i class="fas fa-moon"></i> Modo Oscuro';
        }
    }
    
    // Escuchar cambios en las preferencias del sistema
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        if (!localStorage.getItem('theme')) {
            const newTheme = e.matches ? 'dark' : 'light';
            document.documentElement.setAttribute('data-theme', newTheme);
            updateToggleButton();
        }
    });
});