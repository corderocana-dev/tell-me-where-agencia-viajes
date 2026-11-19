// Arranca el servidor en modo desarrollo (se reinicia solo al guardar)
// y abre la web en el navegador UNA sola vez, cuando ya responde.
// Uso: npm run dev   (para no abrir el navegador: OPEN_BROWSER=false en el .env)
require('dotenv').config();

const { spawn, exec } = require('child_process');
const http = require('http');
const path = require('path');

const port = Number(process.env.PORT) || 3000;
const url = `http://localhost:${port}`;
const abrirNavegador = process.env.OPEN_BROWSER !== 'false';

// 1. Servidor con --watch (hereda la terminal para ver sus mensajes)
const servidor = spawn(process.execPath, ['--watch', path.join('src', 'server.js')], {
    stdio: 'inherit',
    cwd: path.join(__dirname, '..'),
});
servidor.on('exit', (code) => process.exit(code ?? 0));
for (const senal of ['SIGINT', 'SIGTERM']) {
    process.on(senal, () => servidor.kill(senal));
}

// 2. Abrir Chrome (o el navegador por defecto si Chrome no está)
const abrir = () => {
    const comandos = {
        win32: `start "" chrome "${url}" || start "" "${url}"`,
        darwin: `open -a "Google Chrome" "${url}" || open "${url}"`,
        linux: `google-chrome "${url}" || xdg-open "${url}"`,
    };
    exec(comandos[process.platform] || `xdg-open "${url}"`, { shell: true });
};

// 3. Esperar a que la web responda (máx. 20 s) y abrirla
if (abrirNavegador) {
    const inicio = Date.now();
    const comprobar = () => {
        http.get(url, (res) => { res.resume(); abrir(); })
            .on('error', () => {
                if (Date.now() - inicio < 20000) setTimeout(comprobar, 400);
            });
    };
    setTimeout(comprobar, 600);
}
