
// Safe black background during first paint
document.documentElement.style.backgroundColor = "#050505";
if (document.body) {
  document.body.style.backgroundColor = "#050505";
}

window.addEventListener("load", () => {
  const loader = document.getElementById("siteLoader");
  setTimeout(() => {
    loader.classList.add("hide");
  }, 550);
});

const menuToggle = document.getElementById("menuToggle");
const siteNav = document.getElementById("siteNav");

menuToggle.addEventListener("click", () => {
  siteNav.classList.toggle("open");
});

document.querySelectorAll(".site-nav a").forEach((link) => {
  link.addEventListener("click", () => {
    siteNav.classList.remove("open");
  });
});







// Reliable background music player
document.addEventListener("DOMContentLoaded", () => {
  const bgMusic = document.getElementById("bgMusic");
  const musicToggle = document.getElementById("musicToggle");
  const musicIcon = document.getElementById("musicIcon");
  const musicLabel = document.getElementById("musicLabel");
  const musicPlayer = document.getElementById("musicPlayer");

  if (!bgMusic || !musicToggle) {
    console.log("Music player elements were not found.");
    return;
  }

  bgMusic.volume = 0.45;

  function setPlayingState(isPlaying) {
    if (musicPlayer) musicPlayer.classList.toggle("is-playing", isPlaying);
    if (musicIcon) musicIcon.textContent = isPlaying ? "♫" : "▶";
    if (musicLabel) musicLabel.textContent = isPlaying ? "Music On" : "Play Music";
    musicToggle.setAttribute("aria-label", isPlaying ? "Pause background music" : "Play background music");
  }

  async function playMusic() {
    try {
      bgMusic.muted = false;
      bgMusic.currentTime = bgMusic.currentTime || 0;
      await bgMusic.play();
      setPlayingState(true);
      console.log("Music playing.");
    } catch (err) {
      setPlayingState(false);
      console.log("Music play failed:", err);
    }
  }

  function pauseMusic() {
    bgMusic.pause();
    setPlayingState(false);
  }

  // Try autoplay. Many browsers will block this, but the click button will work.
  window.addEventListener("load", () => {
    playMusic();
  });

  // Button click should always work because it is a direct user action.
  musicToggle.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();

    if (bgMusic.paused) {
      playMusic();
    } else {
      pauseMusic();
    }
  });

  // First click anywhere on the page also unlocks the music once.
  const unlockOnce = () => {
    if (bgMusic.paused) playMusic();
    document.removeEventListener("click", unlockOnce);
    document.removeEventListener("touchstart", unlockOnce);
  };

  document.addEventListener("click", unlockOnce);
  document.addEventListener("touchstart", unlockOnce);

  bgMusic.addEventListener("play", () => setPlayingState(true));
  bgMusic.addEventListener("pause", () => setPlayingState(false));
  bgMusic.addEventListener("error", () => {
    console.log("Audio file could not be loaded. Check the MP3 path:", bgMusic.currentSrc);
    if (musicLabel) musicLabel.textContent = "Audio Error";
  });

  setPlayingState(false);
});


// Crown & Cross cinematic intro
document.addEventListener("DOMContentLoaded", () => {
  const studioIntro = document.getElementById("studioIntro");
  const skipIntro = document.getElementById("skipIntro");

  if (!studioIntro) return;

  const closeIntro = () => {
    studioIntro.classList.add("hide");
    setTimeout(() => {
      studioIntro.style.display = "none";
    }, 1300);
  };

  setTimeout(closeIntro, 5900);

  if (skipIntro) {
    skipIntro.addEventListener("click", closeIntro);
  }
});


// Custom cinematic cursor
document.addEventListener("DOMContentLoaded", () => {
  const cursor = document.getElementById("customCursor");
  const ring = document.getElementById("cursorRing");
  const glow = document.getElementById("cursorGlow");

  if (!cursor || !ring || !glow) return;

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let ringX = mouseX;
  let ringY = mouseY;
  let glowX = mouseX;
  let glowY = mouseY;

  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    cursor.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
  });

  function animateCursor() {
    ringX += (mouseX - ringX) * 0.55;
    ringY += (mouseY - ringY) * 0.55;
    glowX += (mouseX - glowX) * 0.22;
    glowY += (mouseY - glowY) * 0.22;

    ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
    glow.style.transform = `translate(${glowX}px, ${glowY}px) translate(-50%, -50%)`;

    requestAnimationFrame(animateCursor);
  }

  animateCursor();

  const hoverTargets = "a, button, .btn, .character-card, .video-card, .music-toggle, .skip-intro";

  document.querySelectorAll(hoverTargets).forEach((el) => {
    el.addEventListener("mouseenter", () => document.body.classList.add("cursor-hover"));
    el.addEventListener("mouseleave", () => document.body.classList.remove("cursor-hover"));
  });

  document.addEventListener("mousedown", () => document.body.classList.add("cursor-click"));
  document.addEventListener("mouseup", () => document.body.classList.remove("cursor-click"));

  document.addEventListener("mouseleave", () => {
    cursor.style.opacity = "0";
    ring.style.opacity = "0";
    glow.style.opacity = "0";
  });

  document.addEventListener("mouseenter", () => {
    cursor.style.opacity = "1";
    ring.style.opacity = "1";
    glow.style.opacity = "0.85";
  });
});


// Cinematic slideshow
document.addEventListener("DOMContentLoaded", () => {
  const slider = document.getElementById("cinematicSlider");
  if (!slider) return;

  const slides = Array.from(slider.querySelectorAll(".cinematic-slide"));
  const dots = Array.from(document.querySelectorAll(".slide-dot"));
  const prev = document.getElementById("sliderPrev");
  const next = document.getElementById("sliderNext");

  if (!slides.length) return;

  let currentSlide = 0;
  let timer;

  const showSlide = (index) => {
    currentSlide = (index + slides.length) % slides.length;

    slides.forEach((slide, i) => {
      slide.classList.toggle("active", i === currentSlide);
    });

    dots.forEach((dot, i) => {
      dot.classList.toggle("active", i === currentSlide);
    });
  };

  const nextSlide = () => showSlide(currentSlide + 1);
  const prevSlide = () => showSlide(currentSlide - 1);

  const startTimer = () => {
    clearInterval(timer);
    timer = setInterval(nextSlide, 7000);
  };

  if (next) {
    next.addEventListener("click", () => {
      nextSlide();
      startTimer();
    });
  }

  if (prev) {
    prev.addEventListener("click", () => {
      prevSlide();
      startTimer();
    });
  }

  dots.forEach((dot) => {
    dot.addEventListener("click", () => {
      showSlide(Number(dot.dataset.slide));
      startTimer();
    });
  });

  slider.addEventListener("mouseenter", () => clearInterval(timer));
  slider.addEventListener("mouseleave", startTimer);

  showSlide(0);
  startTimer();
});
