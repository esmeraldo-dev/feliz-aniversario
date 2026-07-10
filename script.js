/* =====================================================================
   1) EFEITO DE DIGITAÇÃO NO TERMINAL DO HERO
===================================================================== */
(function typeTerminal() {
  const el = document.getElementById("terminal-body");
  const lines = [
    { text: "> iniciando protocolo_aniversario.exe", delay: 25 },
    { text: "> carregando memórias compartilhadas... 100%", delay: 15 },
    { text: "> vulnerabilidade crítica encontrada em: coração.sys", delay: 20 },
    { text: "> status: sem correção disponível (e eu nem quero)", delay: 20 },
  ];

  let lineIndex = 0,
    charIndex = 0;
  const colors = ["text-mist", "text-mist", "text-rose", "text-mint"];

  function typeNextChar() {
    if (lineIndex >= lines.length) return;
    const current = lines[lineIndex];

    if (charIndex === 0) {
      const p = document.createElement("p");
      p.className = colors[lineIndex] + " mb-1";
      p.id = "tline-" + lineIndex;
      el.appendChild(p);
    }

    const p = document.getElementById("tline-" + lineIndex);
    charIndex++;
    p.textContent = current.text.slice(0, charIndex);

    if (charIndex < current.text.length) {
      setTimeout(typeNextChar, current.delay);
    } else {
      p.classList.remove("caret");
      lineIndex++;
      charIndex = 0;
      if (lineIndex < lines.length) {
        setTimeout(typeNextChar, 350);
      } else {
        p.classList.add("caret");
      }
    }
  }
  typeNextChar();
})();

/* =====================================================================
   2) REVEAL ON SCROLL (fade-in suave)
===================================================================== */
(function scrollReveal() {
  const items = document.querySelectorAll(".reveal");
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 },
  );
  items.forEach((item) => io.observe(item));
})();

/* =====================================================================
   3) BADGES / EASTER EGGS — clique para fixar em telas touch
===================================================================== */
document.querySelectorAll(".egg-badge").forEach((badge) => {
  badge.addEventListener("click", (e) => {
    e.stopPropagation();
    document.querySelectorAll(".egg-badge").forEach((b) => {
      if (b !== badge) b.classList.remove("is-open");
    });
    badge.classList.toggle("is-open");
  });
});
document.addEventListener("click", () => {
  document
    .querySelectorAll(".egg-badge")
    .forEach((b) => b.classList.remove("is-open"));
});

/* =====================================================================
   4) GERADOR DE MOTIVOS
   ██ EDITE O ARRAY ABAIXO COM SEUS 10 MOTIVOS ██
===================================================================== */
const MOTIVOS = [
  "Porque você faz até segunda-feira parecer uma boa ideia.",
  "Porque seu jeito de rir é o meu efeito colateral favorito.",
  "Porque você lembra dos detalhes que eu nem sabia que importavam.",
  "Porque com você o silêncio também é confortável.",
  "Porque você acredita em mim até nos dias em que eu não acredito.",
  "Porque cada plano comum vira aventura quando é com você.",
  "Porque seu abraço resolve 90% dos meus problemas (e escuta os outros 10%).",
  "Porque você é a pessoa que eu escolheria de novo, todos os dias.",
  "Porque seu jeito de cuidar de mim não cabe em uma frase só.",
  "Porque simplesmente: é você. Sempre foi.",
];

let lastIndex = -1;
const btnCompilar = document.getElementById("btn-compilar");
const output = document.getElementById("motivo-output");

btnCompilar.addEventListener("click", () => {
  let next;
  do {
    next = Math.floor(Math.random() * MOTIVOS.length);
  } while (next === lastIndex && MOTIVOS.length > 1);
  lastIndex = next;

  output.classList.add("fade-out");
  setTimeout(() => {
    output.textContent = MOTIVOS[next];
    output.classList.remove("fade-out");
  }, 300);
});

/* =====================================================================
   5) PLAYER DE ÁUDIO CUSTOMIZADO
===================================================================== */
(function audioPlayer() {
  const audio = document.getElementById("player");
  const btn = document.getElementById("btn-play");
  const iconPlay = document.getElementById("icon-play");
  const iconPause = document.getElementById("icon-pause");
  const seek = document.getElementById("seek");

  btn.addEventListener("click", () => {
    if (audio.paused) {
      audio.play().catch(() => {});
      iconPlay.classList.add("hidden");
      iconPause.classList.remove("hidden");
    } else {
      audio.pause();
      iconPlay.classList.remove("hidden");
      iconPause.classList.add("hidden");
    }
  });

  audio.addEventListener("timeupdate", () => {
    if (audio.duration) seek.value = (audio.currentTime / audio.duration) * 100;
  });
  seek.addEventListener("input", () => {
    if (audio.duration) audio.currentTime = (seek.value / 100) * audio.duration;
  });
  audio.addEventListener("ended", () => {
    iconPlay.classList.remove("hidden");
    iconPause.classList.add("hidden");
    seek.value = 0;
  });
})();

/* =====================================================================
   6) PARTÍCULAS ELEGANTES (canvas nativo, sem libs) — seção final
===================================================================== */
(function particles() {
  const canvas = document.getElementById("particles");
  const ctx = canvas.getContext("2d");
  const section = canvas.parentElement;
  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  let particlesArr = [];
  const colors = [
    "rgba(155,140,255,",
    "rgba(255,127,174,",
    "rgba(124,242,199,",
  ];

  function resize() {
    canvas.width = section.offsetWidth;
    canvas.height = section.offsetHeight;
  }

  function createParticles() {
    const count = Math.floor(canvas.width / 40);
    particlesArr = Array.from({ length: count }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 2 + 0.6,
      speed: Math.random() * 0.4 + 0.1,
      drift: (Math.random() - 0.5) * 0.3,
      color: colors[Math.floor(Math.random() * colors.length)],
      alpha: Math.random() * 0.5 + 0.15,
    }));
  }

  function tick() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particlesArr.forEach((p) => {
      p.y -= p.speed;
      p.x += p.drift;
      if (p.y < -10) {
        p.y = canvas.height + 10;
        p.x = Math.random() * canvas.width;
      }
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.color + p.alpha + ")";
      ctx.fill();
    });
    if (!reduceMotion) requestAnimationFrame(tick);
  }

  window.addEventListener("resize", () => {
    resize();
    createParticles();
  });
  resize();
  createParticles();
  tick();
})();
