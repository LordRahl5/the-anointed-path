// Section scroll tracking
const sections = document.querySelectorAll("section");
const header = document.querySelector("header");
const btnBurger = document.querySelector("#burger-menu");
const nav = document.querySelector(".navigation");
const linkNav = document.querySelectorAll(".navigation a");

// ✅ Toggle mobile menu
btnBurger.addEventListener("click", () => {
  nav.classList.toggle("show");
  btnBurger.classList.toggle("bx-x");
});

// ✅ Close mobile menu when link is clicked
linkNav.forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("show");
    btnBurger.classList.remove("bx-x");
  });
});

// ✅ Close on scroll
window.addEventListener("scroll", () => {
  nav.classList.remove("show");
  btnBurger.classList.remove("bx-x");
});

// ✅ Desktop header animation
const handleScroll = () => {
  header.classList.toggle("active", window.scrollY > 1000);
};

// ✅ Initialize scroll event listener based on initial window size
if (window.innerWidth >= 1024) {
  window.addEventListener("scroll", handleScroll);
}

// ✅ Enable scroll animation for large screens only
window.addEventListener("resize", () => {
  if (window.innerWidth >= 1024) {
    window.addEventListener("scroll", handleScroll);
  } else {
    window.removeEventListener("scroll", handleScroll);
  }
});

// ✅ Scroll spy – highlight active nav link
const scrollActive = () => {
  const scrollPosition = window.scrollY;
  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 150; // Offset to trigger early
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute("id");

    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      linkNav.forEach((link) => {
        link.classList.remove("active");
      });
      const activeLink = document.querySelector(`.navigation a[href*="${sectionId}"]`);
      if (activeLink) {
        activeLink.classList.add("active");
      }
    }
  });
};

// Ensure scrollActive runs on page load and scroll
document.addEventListener("DOMContentLoaded", () => {
  scrollActive(); // Run once on load to set initial active state
  window.addEventListener("scroll", scrollActive); // Attach scroll event
});

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

// ✅ Music player toggle
document.addEventListener('DOMContentLoaded', () => {
  const audio = document.getElementById('bgm');
  const button = document.getElementById('playMusicBtn');

  button.style.display = 'block';

  audio.addEventListener('error', () => {
    console.error('Audio file failed to load');
    button.textContent = '❌ Audio Not Found';
  });

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
