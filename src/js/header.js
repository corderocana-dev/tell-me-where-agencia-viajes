/* HEADER COMPARTIDO: modo claro/oscuro y menú del móvil */

(function () {
    const CLAVE_TEMA = 'tellmewhere-tema';

    // ---- MODO OSCURO ----
    // Se aplica la clase "dark-theme" al <body> (las páginas ya tienen estilos para ella)
    // y se guarda la elección para que se mantenga al cambiar de página.
    const botonTema = document.getElementById('site-tema');

    function leerTema() {
        try { return localStorage.getItem(CLAVE_TEMA); } catch (e) { return null; }
    }

    function guardarTema(tema) {
        try { localStorage.setItem(CLAVE_TEMA, tema); } catch (e) { /* sin almacenamiento: no pasa nada */ }
    }

    function aplicarTema(oscuro) {
        document.body.classList.toggle('dark-theme', oscuro);
        if (botonTema) {
            botonTema.setAttribute('aria-pressed', String(oscuro));
            botonTema.setAttribute('aria-label', oscuro ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro');
        }
    }

    // Modo inicial: el que eligió el usuario o, si no eligió, el del sistema.
    // (El header ya lo aplicó antes de dibujar la página; aquí solo se sincroniza el botón.)
    const sistemaOscuro = window.matchMedia('(prefers-color-scheme: dark)');
    const guardado = leerTema();
    aplicarTema(guardado ? guardado === 'oscuro' : sistemaOscuro.matches);

    // Si el usuario nunca ha elegido, seguir los cambios del sistema en directo.
    sistemaOscuro.addEventListener('change', function (e) {
        if (!leerTema()) aplicarTema(e.matches);
    });

    // Transición suave solo al pulsar el botón (no al cargar la página).
    function conTransicion() {
        document.body.classList.add('tema-transicion');
        setTimeout(function () { document.body.classList.remove('tema-transicion'); }, 400);
    }

    if (botonTema) {
        botonTema.addEventListener('click', function () {
            const oscuro = !document.body.classList.contains('dark-theme');
            conTransicion();
            aplicarTema(oscuro);
            guardarTema(oscuro ? 'oscuro' : 'claro');
        });
    }

    // ---- MENÚ MÓVIL ----
    const hamburguesa = document.getElementById('site-hamburguesa');
    const menu = document.getElementById('site-menu');

    function abrirMenu(abrir) {
        menu.classList.toggle('abierto', abrir);
        hamburguesa.classList.toggle('abierto', abrir);
        hamburguesa.setAttribute('aria-expanded', String(abrir));
        hamburguesa.setAttribute('aria-label', abrir ? 'Cerrar menú' : 'Abrir menú');
    }

    if (hamburguesa && menu) {
        hamburguesa.addEventListener('click', function () {
            abrirMenu(!menu.classList.contains('abierto'));
        });
        // Cerrar con la tecla Esc
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') abrirMenu(false);
        });
        // Si se agranda la ventana, cerrar el menú del móvil
        window.addEventListener('resize', function () {
            if (window.innerWidth > 860) abrirMenu(false);
        });
    }

    // ---- SOMBRA AL BAJAR ----
    const header = document.querySelector('.site-header');
    if (header) {
        const alBajar = function () { header.classList.toggle('con-sombra', window.scrollY > 10); };
        alBajar();
        window.addEventListener('scroll', alBajar, { passive: true });
    }
})();
