// ========== Section Scroll Highlight ==========
const sections = document.querySelectorAll("section");
const header = document.querySelector("header");
const linkNav = document.querySelectorAll(".navigation a");

function scrollActive() {
  sections.forEach((section) => {
    const top = window.scrollY;
    const offset = section.offsetTop - 150;
    const height = section.offsetHeight;
    const id = section.getAttribute("id");

    if (top >= offset && top < offset + height) {
      linkNav.forEach((link) => {
        link.classList.remove("active");
        const currentLink = document.querySelector(`.navigation a[href*=${id}]`);
        if (currentLink) currentLink.classList.add("active");
      });
    }
  });
}
window.addEventListener("scroll", scrollActive);

// ========== Sticky Header on Scroll ==========
function handleScroll() {
  header.classList.toggle("active", window.scrollY > 1000);
}
window.addEventListener("scroll", handleScroll);

// ========== Burger Menu Toggle ==========
const burgerBtn = document.getElementById("burger-menu");
const navMenu = document.querySelector(".navigation");

burgerBtn.addEventListener("click", () => {
  navMenu.classList.toggle("active");
  burgerBtn.classList.toggle("bx-x");
});

linkNav.forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("active");
    burgerBtn.classList.remove("bx-x");
  });
});

window.addEventListener("resize", () => {
  if (window.innerWidth >= 1024) {
    navMenu.classList.remove("active");
    burgerBtn.classList.remove("bx-x");
  }
});

// ========== Swiper Slider ==========
const mySwiper = new Swiper(".swiper", {
  loop: true,
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});

// ========== Background Music Toggle ==========
document.addEventListener("DOMContentLoaded", () => {
  const audio = document.getElementById("bgm");
  const button = document.getElementById("playMusicBtn");

  if (!audio || !button) return;

  // Show button always
  button.style.display = "block";

  function isAudioPlaying(audioEl) {
    return !audioEl.paused && !audioEl.ended && audioEl.currentTime > 0;
  }

  button.addEventListener("click", () => {
    if (isAudioPlaying(audio)) {
      audio.pause();
      button.textContent = "🔊 Play Music";
    } else {
      audio.play().then(() => {
        button.textContent = "⏸️ Pause Music";
      }).catch((err) => {
        console.error("Playback error:", err);
        button.textContent = "❌ Failed to Play";
      });
    }
  });
});
