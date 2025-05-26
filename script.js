// ✅ Section Scroll Tracking & Navigation
const sections = document.querySelectorAll("section");
const header = document.querySelector("header");
const btnBurger = document.querySelector("#burger-menu");
const nav = document.querySelector(".navigation");
const linkNav = document.querySelectorAll(".navigation a");

// ✅ Toggle Mobile Menu
btnBurger.addEventListener("click", () => {
  nav.classList.toggle("show");
  btnBurger.classList.toggle("bx-x");
});

// ✅ Close Mobile Menu on Link Click
linkNav.forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("show");
    btnBurger.classList.remove("bx-x");
  });
});

// ✅ Close Menu on Scroll
window.addEventListener("scroll", () => {
  nav.classList.remove("show");
  btnBurger.classList.remove("bx-x");
});

// ✅ Header Animation on Scroll (Desktop Only)
const handleScroll = () => {
  header.classList.toggle("active", window.scrollY > 1000);
};

if (window.innerWidth >= 1024) {
  window.addEventListener("scroll", handleScroll);
}

window.addEventListener("resize", () => {
  if (window.innerWidth >= 1024) {
    window.addEventListener("scroll", handleScroll);
  } else {
    window.removeEventListener("scroll", handleScroll);
  }
});

// ✅ Scroll Spy – Highlight Active Section
const scrollActive = () => {
  sections.forEach((section) => {
    let top = window.scrollY;
    let offset = section.offsetTop - 150;
    let height = section.offsetHeight;
    let id = section.getAttribute("id");

    if (top >= offset && top < offset + height) {
      linkNav.forEach((link) => {
        link.classList.remove("active");
        const activeLink = document.querySelector(`.navigation a[href*="${id}"]`);
        if (activeLink) activeLink.classList.add("active");
      });
    }
  });
};

window.addEventListener("scroll", scrollActive);

// ✅ Swiper Carousel
var mySwiper = new Swiper(".swiper", {
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

// ✅ Music Player Toggle
document.addEventListener('DOMContentLoaded', () => {
  const audio = document.getElementById('bgm');
  const button = document.getElementById('playMusicBtn');

  if (!audio || !button) return;

  button.style.display = 'block';

  function isAudioPlaying(audioElement) {
    return !audioElement.paused && !audioElement.ended && audioElement.currentTime > 0;
  }

  button.addEventListener('click', () => {
    if (isAudioPlaying(audio)) {
      audio.pause();
      button.textContent = '🔊 Play Music';
    } else {
      audio.play().then(() => {
        button.textContent = '⏸️ Pause Music';
      }).catch(err => {
        console.error('Playback error:', err);
        button.textContent = '❌ Failed to Play';
      });
    }
  });
});
