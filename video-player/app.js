const media = document.getElementById("video");
const playPauseButton = document.getElementById("play-pause");
const stopButton = document.getElementById("stop");
const fullscreenButton = document.getElementById("fullscreen");
const volumeButton = document.getElementById("volume");

document.addEventListener("DOMContentLoaded", () => {
  playPauseButton.querySelector("img").src = playIcon;
  stopButton.querySelector("img").src = stopIcon;
  fullscreenButton.querySelector("img").src = fullscreenIcon;
  volumeButton.querySelector("img").src = volumeIcon;

  media.volume = 0.5;
});

playPauseButton.addEventListener("click", (event) => {
  if (media.paused) {
    media.play();
    playPauseButton.querySelector("img").src = pauseIcon;
  } else {
    media.pause();
    playPauseButton.querySelector("img").src = playIcon;
  }
});
