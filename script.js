const sections = document.querySelectorAll("section");
const header = document.querySelector("header");
const btnBurger = document.querySelector("#burger-menu");
const nav = document.querySelector(".navigation");
const linkNav = document.querySelectorAll(".navigation a");


btnBurger.addEventListener("click", () => {
  nav.classList.toggle("active");
  btnBurger.classList.toggle("bx-x");
});

linkNav.forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("active");
    btnBurger.classList.remove("bx-x");
  });
});

window.addEventListener("scroll", () => {
  nav.classList.remove("active");
  btnBurger.classList.remove("bx-x");
});

const handleScroll = () => {
  header.classList.toggle("active", window.scrollY > 1000);
};

window.addEventListener("resize", () => {
  if (window.innerWidth >= 1024) {
    window.addEventListener("scroll", handleScroll);
  } else {
    window.removeEventListener("scroll", handleScroll);
  }
});

const scrollActive = () => {
  sections.forEach((section) => {
    let top = window.scrollY;
    let offset = section.offsetTop - 150;
    let height = section.offsetHeight;
    let id = section.getAttribute("id");

    if (top >= offset && top < offset + height) {
      linkNav.forEach((links) => {
        links.classList.remove("active");
        document
          .querySelector(`.navigation a[href*=${id}]`)
          .classList.add("active");
      });
    }
  });
};


window.addEventListener("scroll", scrollActive);

var mySwiper = new Swiper(".swiper", {
  loop: true, // Active la boucle infinie
  autoplay: {
    delay: 3000, 
    disableOnInteraction: false,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});

<script>
  document.addEventListener('DOMContentLoaded', () => {
    const audio = document.getElementById('bgm');
    const button = document.getElementById('playMusicBtn');

    // Always show the button
    button.style.display = 'block';

    // Accurate check: is the music currently playing?
    function isAudioPlaying(audioElement) {
      return !audioElement.paused && !audioElement.ended && audioElement.currentTime > 0;
    }

    // Button click toggles play/pause
    button.addEventListener('click', () => {
      if (isAudioPlaying(audio)) {
        audio.pause();
        button.textContent = '🔊 Play Music';
        button.style.opacity = '1';
      } else {
        audio.play().then(() => {
          button.textContent = '⏸️ Pause Music';
          button.style.opacity = '1';
        }).catch(err => {
          console.error('Playback error:', err);
          button.textContent = '❌ Failed to Play';
        });
      }
    });
  });
</script>


const menuBtn = document.querySelector('.bx-menu');
const mobileMenu = document.querySelector('.mobile-nav');

menuBtn.addEventListener('click', () => {
  mobileMenu.classList.toggle('active');
});

