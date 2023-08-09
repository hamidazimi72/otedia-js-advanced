const getScreenButton = document.getElementById("request-screen");
const getMicButton = document.getElementById("request-mic");
const startButton = document.getElementById("start");
const stopButton = document.getElementById("stop");
const timeBoxEl = document.getElementById("time-box");
const resultEl = document.getElementById("result");
const liveVideoEl = document.getElementById("live");

let stream,
  screenStream,
  voiceStream,
  mediaRecorder,
  chunks = [];

const convertTimeHandler = (seconds = 0) => {
  if (!seconds) return;

  seconds = parseInt(seconds);
  let toISOStringValue = new Date(seconds * 1000).toISOString();

  if (seconds >= 3600) {
    return toISOStringValue.slice(11, 19);
  } else {
    return toISOStringValue.slice(14, 19);
  }
};

getScreenButton.addEventListener("click", async () => {
  screenStream = await navigator.mediaDevices.getDisplayMedia({
    video: true,
  });
  console.log(screenStream);
});

getMicButton.addEventListener("click", async () => {
  voiceStream = await navigator.mediaDevices.getUserMedia({
    audio: true,
  });
  console.log(voiceStream);
});

startButton.addEventListener("click", () => {
  if (!(voiceStream && screenStream)) {
    alert("استریم موجود نیست!");
    return;
  }

  if (!(voiceStream?.active && screenStream?.active)) {
    alert("استریم فعال نیست!");
    return;
  }

  chunks = [];

  getMicButton.disabled = true;
  getScreenButton.disabled = true;
  startButton.disabled = true;
  stopButton.disabled = false;

  stream = new MediaStream(screenStream);
  stream.addTrack(voiceStream.getAudioTracks()[0]);

  mediaRecorder = new MediaRecorder(stream, {
    audioBitsPerSecond: 32000,
    // videoBitsPerSecond: 500000,
  });
  let currentTime = Date.now();

  const recordedVideo = document.getElementById("finally-video") || null;
  const downloadLink = document.getElementById("dl-link") || null;

  if (recordedVideo) recordedVideo.remove();
  if (downloadLink) downloadLink.remove();

  liveVideoEl.style.display = "block";

  liveVideoEl.srcObject = stream;
  liveVideoEl.play();
  liveVideoEl.muted = true;

  mediaRecorder.addEventListener("dataavailable", (event) => {
    console.log(event?.data);
    chunks.push(event?.data);

    const seconds = (Date.now() - currentTime) / 1000;
    timeBoxEl.innerText = convertTimeHandler(seconds);
  });

  mediaRecorder.addEventListener("stop", () => {
    const blob = new Blob(chunks, { type: chunks[0].type });

    const url = URL.createObjectURL(blob);

    const video = document.createElement("video");
    video.setAttribute("id", "finally-video");
    video.setAttribute("width", "800");
    video.controls = true;
    video.src = url;

    const link = document.createElement("a");
    link.setAttribute("id", "dl-link");
    link.download = `video.mp4`;
    link.href = url;
    link.innerText = "دانلود";

    liveVideoEl.style.display = "none";
    resultEl.appendChild(video);
    resultEl.appendChild(link);

    getMicButton.disabled = false;
    startButton.disabled = false;
    stopButton.disabled = true;
  });

  mediaRecorder.start(1000);
});

stopButton.addEventListener("click", () => {
  if (!mediaRecorder) return;

  const tracks = stream.getTracks();
  for (const track of tracks) {
    track.stop();
  }

  mediaRecorder.stop();
});
