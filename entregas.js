document.addEventListener("DOMContentLoaded", () => {
  const track = document.getElementById("entregasTrack");
  const prevBtn = document.getElementById("entregasPrev");
  const nextBtn = document.getElementById("entregasNext");
  const dotsContainer = document.getElementById("entregasDots");

  if (!track || !prevBtn || !nextBtn || !dotsContainer) return;

  const cards = Array.from(track.querySelectorAll(".entrega-card"));
  if (!cards.length) return;

  let currentIndex = 0;
  let cardsPerView = getCardsPerView();
  let maxIndex = Math.max(0, cards.length - cardsPerView);

  function getCardsPerView() {
    if (window.innerWidth <= 768) return 1;
    if (window.innerWidth <= 1024) return 2;
    return 3;
  }

  function getGap() {
    const styles = window.getComputedStyle(track);
    return parseInt(styles.gap) || 0;
  }

  function updateSizes() {
    cardsPerView = getCardsPerView();
    maxIndex = Math.max(0, cards.length - cardsPerView);

    if (currentIndex > maxIndex) {
      currentIndex = maxIndex;
    }

    updateCarousel();
    createDots();
    updateDots();
  }

  function updateCarousel() {
    const firstCard = cards[0];
    if (!firstCard) return;

    const cardWidth = firstCard.offsetWidth;
    const gap = getGap();
    const moveX = currentIndex * (cardWidth + gap);

    track.style.transform = `translateX(-${moveX}px)`;
  }

  function createDots() {
    dotsContainer.innerHTML = "";

    const totalPages = Math.max(1, cards.length - cardsPerView + 1);

    for (let i = 0; i < totalPages; i++) {
      const dot = document.createElement("button");
      dot.className = "dot";
      dot.type = "button";
      dot.setAttribute("aria-label", `Ir a la entrega ${i + 1}`);

      dot.addEventListener("click", () => {
        currentIndex = i;
        updateCarousel();
        updateDots();
      });

      dotsContainer.appendChild(dot);
    }
  }

  function updateDots() {
    const dots = dotsContainer.querySelectorAll(".dot");
    dots.forEach((dot, index) => {
      dot.classList.toggle("active", index === currentIndex);
    });
  }

  nextBtn.addEventListener("click", () => {
    if (currentIndex >= maxIndex) {
      currentIndex = 0;
    } else {
      currentIndex++;
    }
    updateCarousel();
    updateDots();
  });

  prevBtn.addEventListener("click", () => {
    if (currentIndex <= 0) {
      currentIndex = maxIndex;
    } else {
      currentIndex--;
    }
    updateCarousel();
    updateDots();
  });

  window.addEventListener("resize", updateSizes);

  createDots();
  updateDots();
  updateCarousel();
});