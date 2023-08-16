const media = document.getElementById("video");
const playPauseButton = document.getElementById("play-pause");
const stopButton = document.getElementById("stop");
const fullscreenButton = document.getElementById("fullscreen");
const pipButton = document.getElementById("pip");
const volumeButton = document.getElementById("volume");
const volumeBar = document.getElementById("volume-bar");
const speedBox = document.getElementById("speed-box");
const speedList = document.getElementById("speed-list");
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

const switchFullscreenHandler = () => {
  if (document.pictureInPictureElement) return;
  if (document.fullscreenEnabled) {
    if (!document.fullscreenElement) {
      document.getElementById("player-box").requestFullscreen();
      screen.orientation
        .lock("landscape")
        .then(() => {})
        .catch((err) => console.log(err));
    } else {
      document.exitFullscreen();
      screen.orientation.unlock();
    }
  }
};

const playPauseHandler = () => {
  if (document.pictureInPictureElement) return;
  if (media.paused) {
    media.play();
    playPauseButton.querySelector("img").src = pauseIcon;
  } else {
    media.pause();
    playPauseButton.querySelector("img").src = playIcon;
  }
};

const stopHandler = () => {
  media.pause();
  media.currentTime = 0;
  playPauseButton.querySelector("img").src = playIcon;
};

document.addEventListener("DOMContentLoaded", () => {
  playPauseButton.querySelector("img").src = playIcon;
  stopButton.querySelector("img").src = stopIcon;
  fullscreenButton.querySelector("img").src = fullscreenIcon;
  pipButton.querySelector("img").src = pipIcon;

  if (!document.pictureInPictureEnabled) pipButton.remove();

  const config_ls = localStorage.getItem("custom-video-player")
    ? JSON.parse(localStorage.getItem("custom-video-player"))
    : null;

  if (config_ls) {
    media.muted = config_ls?.muted;
    media.volume = config_ls?.volume;
    media.playbackRate = config_ls?.playbackRate;
  }

  if (config_ls && config_ls?.muted) {
    volumeButton.querySelector("img").src = pipIcon;
  } else {
    volumeButton.querySelector("img").src = volumeIcon;
  }

  if (config_ls && config_ls?.playbackRate) {
    document.getElementById(
      "speed-value"
    ).innerText = `${config_ls?.playbackRate}X`;
  } else {
    document.getElementById("speed-value").innerText = `1X`;
  }

  if (config_ls && config_ls?.src && config_ls?.src === media?.src) {
    media.currentTime = config_ls?.currentTime || 0;
  }

  let initConfig_ls = {
    src: "",
    muted: false,
    volume: 0.5,
    currentTime: 0,
    playbackRate: 1,
  };
  if (!config_ls)
    localStorage.setItem("custom-video-player", JSON.stringify(initConfig_ls));
});

// Element Events
playPauseButton.addEventListener("click", playPauseHandler);

stopButton.addEventListener("click", stopHandler);

fullscreenButton.addEventListener("click", switchFullscreenHandler);

pipButton.addEventListener("click", () => {
  if (!document.pictureInPictureElement) {
    media.requestPictureInPicture();
  } else {
    media.exitPictureInPicture();
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

speedBox.addEventListener("mouseenter", () => {
  speedList.classList.replace("hidden", "flex");
});

speedBox.addEventListener("mouseleave", () => {
  speedList.classList.replace("flex", "hidden");
});

speedList.addEventListener("click", (e) => {
  const speed = e?.target?.dataset?.speed || null;

  media.playbackRate = speed;
  document.getElementById("speed-value").innerText = `${speed}X`;
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

media.addEventListener("dblclick", switchFullscreenHandler);

media.addEventListener("click", playPauseHandler);

media.addEventListener("enterpictureinpicture", () => {
  document.getElementById("controls").style.display = "none";
});

media.addEventListener("leavepictureinpicture", () => {
  document.getElementById("controls").style.display = "flex";
});

document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "hidden") {
    media.lastPausedState = media.paused;
    media.pause();
    playPauseButton.querySelector("img").src = playIcon;
  }

  if (!media.lastPausedState && document.visibilityState === "visible") {
    media.play();
    playPauseButton.querySelector("img").src = pauseIcon;
  }
});

window.addEventListener("beforeunload", () => {
  let config_ls = {
    src: media.src,
    muted: media.muted,
    volume: media.volume,
    currentTime: media.currentTime,
    playbackRate: media.playbackRate,
  };
  localStorage.setItem("custom-video-player", JSON.stringify(config_ls));
});
