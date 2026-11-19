/* ACCOUNT FORMS (login and register): show/hide password and password strength meter */

document.addEventListener("DOMContentLoaded", () => {

  // ---- Show / hide password ----
  document.querySelectorAll(".auth-ver").forEach((boton) => {
    const campo = document.getElementById(boton.dataset.ver);
    if (!campo) return;

    boton.addEventListener("click", () => {
      const mostrar = campo.type === "password";
      campo.type = mostrar ? "text" : "password";
      boton.textContent = mostrar ? "Ocultar" : "Ver";
      boton.setAttribute("aria-label", mostrar ? "Ocultar contraseña" : "Mostrar contraseña");
      campo.focus();
    });
  });

  // ---- Password strength (register only) ----
  const password = document.getElementById("password");
  const barra = document.querySelector(".auth-fuerza");
  const texto = document.getElementById("fuerza-texto");
  if (!password || !barra || !texto) return;

  const NIVELES = [
    { texto: "Usa letras, números y algún símbolo", clase: "" },
    { texto: "Débil: añade más caracteres", clase: "debil" },
    { texto: "Media: prueba a añadir números o símbolos", clase: "media" },
    { texto: "Fuerte: ¡buena contraseña!", clase: "fuerte" },
  ];

  // 1 = weak, 2 = medium, 3 = strong
  function calcularNivel(valor) {
    if (!valor) return 0;
    if (valor.length < 6) return 1;
    let puntos = 1;                                         // 6+ characters
    if (valor.length >= 10) puntos++;                       // long
    if (/[a-zA-Z]/.test(valor) && /\d/.test(valor)) puntos++; // letters and numbers
    if (/[a-z]/.test(valor) && /[A-Z]/.test(valor)) puntos++; // upper and lower case
    if (/[^a-zA-Z0-9]/.test(valor)) puntos++;               // symbols
    if (puntos <= 1) return 1;
    if (puntos <= 3) return 2;
    return 3;
  }

  password.addEventListener("input", () => {
    const nivel = calcularNivel(password.value);
    barra.dataset.nivel = String(nivel);
    texto.textContent = NIVELES[nivel].texto;
    texto.className = "auth-fuerza-texto " + NIVELES[nivel].clase;
  });
});
