const audio = document.getElementById("bgm");
const button = document.getElementById("playMusicBtn");

if (button && audio) {
  button.style.display = "block";

  function isAudioPlaying(audioElement) {
    return !audioElement.paused;
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
}
