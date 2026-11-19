// Carga la configuración del archivo .env antes que nada.
require('dotenv').config();

const path = require('path');
const express = require('express');
const session = require('express-session');

// Routes import.
const myRoutes = require('./routes/myRoutes');

const app = express();
const port = Number(process.env.PORT) || 3000;

// Middleware: leer formularios y JSON (ya incluido en Express, no hace falta body-parser).
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(session({
    secret: process.env.SESSION_SECRET || 'cambia-este-secreto',
    resave: false,
    saveUninitialized: false,
    cookie: { httpOnly: true, sameSite: 'lax' },
}));

// Archivos públicos: SOLO estilos, scripts del navegador, imágenes y fuentes.
// (Antes se publicaba toda la carpeta src, incluido conexion.js con la contraseña de la base de datos.)
for (const carpeta of ['css', 'js', 'img', 'fonts']) {
    app.use(`/${carpeta}`, express.static(path.join(__dirname, carpeta)));
}

// Plantillas EJS (ruta absoluta: funciona se arranque desde donde se arranque).
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Variables disponibles en todas las vistas.
app.use((req, res, next) => {
    res.locals.ruta = req.path;                     // para marcar la página activa en el menú
    res.locals.usuario = req.session.nombre || null; // nombre del usuario si ha iniciado sesión
    next();
});

// Routes.
app.use('/', myRoutes);

// Página no encontrada.
app.use((req, res) => {
    res.status(404).send('Página no encontrada. <a href="/">Volver al inicio</a>');
});

const servidor = app.listen(port, () => {
    console.log(`🌍 TellMeWhere funcionando en http://localhost:${port}`);
});

// Mensaje claro si el puerto ya está ocupado (por ejemplo, la web ya está abierta en otra terminal).
servidor.on('error', (error) => {
    if (error.code === 'EADDRINUSE') {
        console.error(`❌ El puerto ${port} ya está en uso: probablemente la web ya está arrancada en otra terminal.`);
        console.error(`   Ciérrala (Ctrl + C) o cambia PORT en el archivo .env.`);
        process.exit(1);
    }
    throw error;
});
