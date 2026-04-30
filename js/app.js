document.addEventListener("DOMContentLoaded", () => {
  const track = document.getElementById("modelsTrack");
  const dotsContainer = document.getElementById("carouselDots");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");

  if (!track) return;

  if (!Array.isArray(window.MODELOS) || window.MODELOS.length === 0) {
    track.innerHTML = `
      <div class="model-empty-state">
        No hay modelos cargados todavía.
      </div>
    `;
    return;
  }

  const modelos = window.MODELOS;
  let currentIndex = 0;
  let autoSlide;

  function crearMensajeWhatsApp(modelo) {
    const mensajeBase =
      modelo.mensaje && modelo.mensaje.trim() !== ""
        ? modelo.mensaje
        : `Hola, quiero consultar por ${modelo.nombre}.`;

    return `https://wa.me/541121701235?text=${encodeURIComponent(mensajeBase)}`;
  }

  function renderCards() {
    track.innerHTML = modelos
      .map((modelo) => {
        return `
          <article class="model-card">
            <div class="model-image-wrap">
              <img src="${modelo.imagen}" alt="${modelo.nombre}" />
            </div>

            <h3 class="model-name">${modelo.nombre}</h3>
            <p class="model-price">Desde ${modelo.desde}</p>

            <a
              class="model-btn"
              href="${crearMensajeWhatsApp(modelo)}"
              target="_blank"
              rel="noopener noreferrer"
            >
              Consultar por WhatsApp
            </a>
          </article>
        `;
      })
      .join("");
  }

  function renderDots() {
    if (!dotsContainer) return;

    dotsContainer.innerHTML = modelos
      .map((_, index) => {
        return `
          <button
            class="dot ${index === currentIndex ? "active" : ""}"
            data-index="${index}"
            aria-label="Ir al modelo ${index + 1}"
          ></button>
        `;
      })
      .join("");

    const dots = dotsContainer.querySelectorAll(".dot");
    dots.forEach((dot) => {
      dot.addEventListener("click", () => {
        currentIndex = Number(dot.dataset.index);
        updateCarousel();
        restartAutoSlide();
      });
    });
  }

  function getVisibleCards() {
    const screenWidth = window.innerWidth;

    if (screenWidth <= 640) return 1;
    if (screenWidth <= 1024) return 2;
    return 3;
  }

  function updateCarousel() {
    const visibleCards = getVisibleCards();
    const maxIndex = Math.max(modelos.length - visibleCards, 0);

    if (currentIndex > maxIndex) {
      currentIndex = 0;
    }

    const firstCard = track.querySelector(".model-card");
    if (!firstCard) return;

    const cardWidth = firstCard.offsetWidth;
    const gap = 20;
    const offset = currentIndex * (cardWidth + gap);

    track.style.transform = `translateX(-${offset}px)`;

    if (dotsContainer) {
      const dots = dotsContainer.querySelectorAll(".dot");
      dots.forEach((dot, index) => {
        dot.classList.toggle("active", index === currentIndex);
      });
    }
  }

  function nextSlide() {
    const visibleCards = getVisibleCards();
    const maxIndex = Math.max(modelos.length - visibleCards, 0);

    if (currentIndex >= maxIndex) {
      currentIndex = 0;
    } else {
      currentIndex++;
    }

    updateCarousel();
  }

  function prevSlide() {
    const visibleCards = getVisibleCards();
    const maxIndex = Math.max(modelos.length - visibleCards, 0);

    if (currentIndex <= 0) {
      currentIndex = maxIndex;
    } else {
      currentIndex--;
    }

    updateCarousel();
  }

  function startAutoSlide() {
    stopAutoSlide();
    autoSlide = setInterval(() => {
      nextSlide();
    }, 3500);
  }

  function stopAutoSlide() {
    if (autoSlide) {
      clearInterval(autoSlide);
    }
  }

  function restartAutoSlide() {
    stopAutoSlide();
    startAutoSlide();
  }

  renderCards();
  renderDots();
  updateCarousel();
  startAutoSlide();

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      nextSlide();
      restartAutoSlide();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      prevSlide();
      restartAutoSlide();
    });
  }

  window.addEventListener("resize", () => {
    updateCarousel();
    restartAutoSlide();
  });
});
