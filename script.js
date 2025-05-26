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
  sections.forEach((section) => {
    let top = window.scrollY;
    let offset = section.offsetTop - 150;
    let height = section.offsetHeight;
    let id = section.getAttribute("id");

    if (top >= offset && top < offset + height) {
      linkNav.forEach((link) => {
        link.classList.remove("active");
        document
          .querySelector(`.navigation a[href*="${id}"]`)
          .classList.add("active");
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

// ✅ Music player toggle
document.addEventListener("DOMContentLoaded", () => {
  const audio = document.getElementById("bgm");
  const button = document.getElementById("playMusicBtn");

  button.style.display = "block";

  function isAudioPlaying(audioElement) {
    return (
      !audioElement.paused &&
      !audioElement.ended &&
      audioElement.currentTime > 0
    );
  }

  button.addEventListener("click", () => {
    if (isAudioPlaying(audio)) {
      audio.pause();
      button.textContent = "🔊 Play Music";
      button.style.opacity = "1";
    } else {
      audio
        .play()
        .then(() => {
          button.textContent = "⏸️ Pause Music";
          button.style.opacity = "1";
        })
        .catch((err) => {
          console.error("Playback error:", err);
          button.textContent = "❌ Failed to Play";
        });
    }
  });
});


.footer-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.footer-box a {
  margin: 0.2rem 0;
  padding: 0.2rem 0;
  display: inline-block;
}
