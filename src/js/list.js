/* FILTER FORM */

function filtrarProductos() {
    var selectedDestiny = document.getElementById("Destiny").value;
  
    var productsContainers = document.querySelectorAll(".product_Photo");
  
    productsContainers.forEach(function (container) {
      if (container.classList.contains(selectedDestiny)) {
        container.style.display = "block";
      } else {
        container.style.display = "none";
      }
    });
  }
  
  document.addEventListener("DOMContentLoaded", () => {

    const destino = document.getElementById("Destiny");
    destino.addEventListener("change", filtrarProductos);

    // If we arrive from the home page search (/list?destino=praga&ida=...&vuelta=...&viajeros=...),
    // fill in this form with the same choices and show that destination.
    const params = new URLSearchParams(window.location.search);
    const elegido = params.get("destino");
    const existe = elegido && destino.querySelector('option[value="' + CSS.escape(elegido) + '"]');
    destino.value = existe ? elegido : "product_Photo";

    const fechas = document.querySelectorAll("#form .date_form");
    if (fechas[0] && params.get("ida")) fechas[0].value = params.get("ida");
    if (fechas[1] && params.get("vuelta")) fechas[1].value = params.get("vuelta");

    const viajeros = document.getElementById("people");
    if (viajeros && params.get("viajeros") && viajeros.querySelector('option[value="' + CSS.escape(params.get("viajeros")) + '"]')) {
      viajeros.value = params.get("viajeros");
    }

    filtrarProductos();

    if (existe) {
      const tarjeta = document.getElementById(elegido);
      if (tarjeta) tarjeta.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  });
