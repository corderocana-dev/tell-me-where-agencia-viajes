/* RESERVATION FORM (offer page) */

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form-reserva");
  const ida = document.getElementById("fecha_salida");
  const vuelta = document.getElementById("fecha_vuelta");
  const aviso = document.getElementById("aviso-demo");
  if (!form) return;

  // Dates cannot be in the past, and the return date cannot be before departure.
  const hoy = new Date();
  hoy.setMinutes(hoy.getMinutes() - hoy.getTimezoneOffset());
  const fechaHoy = hoy.toISOString().slice(0, 10);
  ida.min = fechaHoy;
  vuelta.min = fechaHoy;

  ida.addEventListener("change", () => {
    vuelta.min = ida.value || fechaHoy;
    if (vuelta.value && vuelta.value < ida.value) vuelta.value = ida.value;
  });

  // This is a demo project: show a message instead of reloading the page.
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    aviso.hidden = false;
  });
});
