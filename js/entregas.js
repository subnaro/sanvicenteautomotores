document.addEventListener("DOMContentLoaded", () => {
  const track = document.getElementById("entregasTrack");
  if (!track) return;

  const entregas = [
    { imagen: "entregas/entrega1.png", texto: "Entrega realizada con éxito." },
    { imagen: "entregas/entrega2.png", texto: "Cliente feliz con su nuevo auto." },
    { imagen: "entregas/entrega3.png", texto: "Otro sueño cumplido." },
    { imagen: "entregas/entrega4.png", texto: "Gracias por confiar en nosotros." },
    { imagen: "entregas/entrega5.png", texto: "Seguimos entregando oportunidades." },
    { imagen: "entregas/entrega6.png", texto: "Salio otra entrega." },
    { imagen: "entregas/entrega7.png", texto: "Meta alcanzada." },
    { imagen: "entregas/entrega8.png", texto: "Disfruta tu nuevo Polo." }
  ];

  function renderEntregas() {
    track.innerHTML = "";

    entregas.forEach((entrega) => {
      const card = document.createElement("article");
      card.className = "entrega-card";

      card.innerHTML = `
        <img src="${entrega.imagen}" class="entrega-img">
        <p class="entrega-texto">${entrega.texto}</p>
      `;

      track.appendChild(card);
    });
  }

  renderEntregas();

  const clone = track.innerHTML;
  track.innerHTML += clone;

  let scrollAmount = 0;
  let speed = 0.3; 

  function autoScroll() {
    scrollAmount += speed;
    track.style.transform = `translateX(-${scrollAmount}px)`;

    if (scrollAmount >= track.scrollWidth / 2) {
      scrollAmount = 0;
    }

    requestAnimationFrame(autoScroll);
  }

  autoScroll();

  track.addEventListener("mouseenter", () => {
    speed = 0;
  });

  track.addEventListener("mouseleave", () => {
    speed = 0.3;
  });
});
