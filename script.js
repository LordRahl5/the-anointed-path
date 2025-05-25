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


const audio = document.getElementById("bg-music");
const toggleBtn = document.getElementById("music-toggle");
let isPlaying = false;

// Attempt to play after first interaction
document.addEventListener("click", function initPlayOnce() {
  audio.volume = 0.5;
  audio.play().then(() => {
    isPlaying = true;
    toggleBtn.textContent = "🔊";
  }).catch(err => {
    console.log("Autoplay blocked until user interacts.");
  });
  document.removeEventListener("click", initPlayOnce);
});

// Manual toggle
toggleBtn.addEventListener("click", () => {
  if (!isPlaying) {
    audio.play().then(() => {
      isPlaying = true;
      toggleBtn.textContent = "🔊";
    }).catch(err => console.log("Play failed:", err));
  } else {
    audio.pause();
    isPlaying = false;
    toggleBtn.textContent = "🔈";
  }
});
