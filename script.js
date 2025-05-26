document.addEventListener("DOMContentLoaded", () => {
  const audio = document.getElementById("bgm");
  const button = document.getElementById("playMusicBtn");

  if (!audio || !button) return;

  button.style.display = "block";

  // Track toggle state manually to avoid unreliable audio.paused checks on mobile
  let isPlaying = false;

  button.addEventListener("click", async () => {
    if (!isPlaying) {
      try {
        await audio.play();
        isPlaying = true;
        button.textContent = "⏸️ Pause Music";
      } catch (err) {
        console.error("Music failed to play:", err);
        button.textContent = "❌ Failed to Play";
      }
    } else {
      audio.pause();
      isPlaying = false;
      button.textContent = "🔊 Play Music";
    }
  });

  // Optional: reset button if audio is stopped elsewhere
  audio.addEventListener("ended", () => {
    isPlaying = false;
    button.textContent = "🔊 Play Music";
  });
});
