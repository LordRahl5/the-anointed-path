document.addEventListener("DOMContentLoaded", () => {
  const audio = document.getElementById("bgm");
  const button = document.getElementById("playMusicBtn");

  if (!audio || !button) {
    console.error("Music or button not found");
    return;
  }

  button.style.display = "block";

  function isAudioPlaying(audioElement) {
    return (
      !audioElement.paused &&
      !audioElement.ended &&
      audioElement.currentTime > 0
    );
  }

  button.addEventListener("click", () => {
    console.log("Button clicked");
    if (isAudioPlaying(audio)) {
      console.log("Pausing audio...");
      audio.pause();
      button.textContent = "🔊 Play Music";
      button.style.opacity = "1";
    } else {
      console.log("Playing audio...");
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

  // Optional: Update text if user pauses it via other means
  audio.addEventListener("pause", () => {
    button.textContent = "🔊 Play Music";
  });

  audio.addEventListener("play", () => {
    button.textContent = "⏸️ Pause Music";
  });
});
