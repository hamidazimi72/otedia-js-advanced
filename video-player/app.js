const media = document.getElementById("video");
const playPauseButton = document.getElementById("play-pause");
const stopButton = document.getElementById("stop");
const fullscreenButton = document.getElementById("fullscreen");
const volumeButton = document.getElementById("volume");
const volumeBar = document.getElementById("volume-bar");
const progressBar = document.getElementById("progress-bar");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration-time");

const convertToTime = (second) => {
  if (!second) return;

  if (second >= 3600) {
    return new Date(second * 1000).toISOString().slice(11, 19);
  } else {
    return new Date(second * 1000).toISOString().slice(14, 19);
  }
};

document.addEventListener("DOMContentLoaded", () => {
  playPauseButton.querySelector("img").src = playIcon;
  stopButton.querySelector("img").src = stopIcon;
  fullscreenButton.querySelector("img").src = fullscreenIcon;
  volumeButton.querySelector("img").src = volumeIcon;

  media.volume = 0.5;
});

// Element Events
playPauseButton.addEventListener("click", () => {
  if (media.paused) {
    media.play();
    playPauseButton.querySelector("img").src = pauseIcon;
  } else {
    media.pause();
    playPauseButton.querySelector("img").src = playIcon;
  }
});

stopButton.addEventListener("click", () => {
  media.pause();
  media.currentTime = 0;
  playPauseButton.querySelector("img").src = playIcon;
});

fullscreenButton.addEventListener("click", () => {
  if (document.fullscreenEnabled) {
    if (!document.fullscreenElement) {
      document.body.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  }
});

volumeButton.addEventListener("click", () => {
  if (media.muted) {
    media.muted = false;
    volumeButton.querySelector("img").src = volumeIcon;
    if (!media?.lastVolumeValue) {
      media.volume = 0.5;
    } else {
      media.volume = media?.lastVolumeValue;
    }
  } else {
    media.lastVolumeValue = media.volume;
    media.muted = true;
    media.volume = 0;
    volumeButton.querySelector("img").src = mutedIcon;
  }
});

volumeBar.addEventListener("input", () => {
  media.volume = volumeBar.value / 100;
});

progressBar.addEventListener("input", () => {
  media.currentTime = (progressBar.value * media.duration) / 100;
});

// Media Events
media.addEventListener("play", () => {
  playPauseButton.querySelector("img").src = pauseIcon;
});

media.addEventListener("canplay", () => {
  durationEl.innerText = convertToTime(media.duration);
});

media.addEventListener("pause", () => {
  playPauseButton.querySelector("img").src = playIcon;
});

media.addEventListener("ended", () => {
  media.currentTime = 0;
});

media.addEventListener("volumechange", () => {
  volumeBar.value = media.volume * 100;

  if (media.volume === 0) {
    volumeButton.querySelector("img").src = mutedIcon;
    media.muted = true;
  } else {
    volumeButton.querySelector("img").src = volumeIcon;
  }
});

media.addEventListener("timeupdate", () => {
  const percent = ((media.currentTime * 100) / media.duration).toFixed();
  progressBar.value = percent;

  currentTimeEl.innerHTML = media.currentTime
    ? convertToTime(media.currentTime)
    : "00:00";
});
