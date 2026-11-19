// CAROUSEL
document.addEventListener("DOMContentLoaded", () => {

  const slidesContainer = document.getElementById("slides-container");

const slide = document.querySelector(".slide");

const prevButton = document.getElementById("slide-arrow-prev");

const nextButton = document.getElementById("slide-arrow-next");

nextButton.addEventListener("click", () => {

  const slideWidth = slide.clientWidth;

  slidesContainer.scrollLeft += slideWidth;

});

prevButton.addEventListener("click", () => {

  const slideWidth = slide.clientWidth;

  slidesContainer.scrollLeft -= slideWidth;

});
});
    

/*SEND COMMENT FUNCTION*/

document.addEventListener("DOMContentLoaded", function (event) {
  const sendButton = document.getElementById('send');
  const popup = document.getElementById('popup');

  function mostrarPopup() {
    popup.classList.add('show');

    setTimeout(function () {
      popup.classList.remove('show');
    }, 3000);
  }

  sendButton.addEventListener('click', function () {
    mostrarPopup();
  });
});

/* COMMENTS STARS */

document.addEventListener("DOMContentLoaded", () => {

  let currentRating = 0;

  const textarea = document.querySelector("textarea");

  const sendButton = document.querySelector("#send");

  const ratingSpans = document.querySelectorAll(".rating > span");

  function rate(stars) {

    currentRating = stars;

    highlightStars(stars);

    fixStars();

  }

  function highlightStars(stars) {

    ratingSpans.forEach((star, index) => {

      if (index > stars) {

        star.innerHTML = "★";

      } else {

        star.innerHTML = "☆";

      }

    });

  }

  function fixStars() {

    ratingSpans.forEach((star, index) => {

      if (index > currentRating) {

        star.classList.add("fixed");

      } else {

        star.classList.remove("fixed");

      }

    });

  }

  ratingSpans.forEach((star, index) => {

    star.addEventListener("click", () => {

      rate(index - 1);

    });

  });

  sendButton.addEventListener("click", () => {

    textarea.value = "";

  });

});


/* HERO SEARCH: dates cannot be in the past, and the return date cannot be before departure */

document.addEventListener("DOMContentLoaded", () => {
  const ida = document.getElementById("hero-ida");
  const vuelta = document.getElementById("hero-vuelta");
  if (!ida || !vuelta) return;

  const hoy = new Date();
  hoy.setMinutes(hoy.getMinutes() - hoy.getTimezoneOffset());
  const fechaHoy = hoy.toISOString().slice(0, 10);

  ida.min = fechaHoy;
  vuelta.min = fechaHoy;

  ida.addEventListener("change", () => {
    vuelta.min = ida.value || fechaHoy;
    if (vuelta.value && vuelta.value < ida.value) vuelta.value = ida.value;
  });
});
