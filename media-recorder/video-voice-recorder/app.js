const getMicButton = document.getElementById("request-mic");
const startButton = document.getElementById("start");
const stopButton = document.getElementById("stop");
const timeBoxEl = document.getElementById("time-box");
const resultEl = document.getElementById("result");
const liveVideoEl = document.getElementById("live");

let stream,
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

getMicButton.addEventListener("click", async () => {
  const recordedVideo = document.getElementById("finally-video") || null;
  const downloadLink = document.getElementById("dl-link") || null;

  if (recordedVideo) recordedVideo.remove();
  if (downloadLink) downloadLink.remove();

  liveVideoEl.style.display = "block";

  stream = await navigator.mediaDevices.getUserMedia({
    audio: true,
    video: true,
  });
  console.log(stream);

  liveVideoEl.srcObject = stream;
  liveVideoEl.play();
  liveVideoEl.muted = true;
});

startButton.addEventListener("click", () => {
  if (!stream) {
    alert("استریم موجود نیست!");
    return;
  }

  if (!stream?.active) {
    alert("استریم فعال نیست!");
    return;
  }

  chunks = [];

  getMicButton.disabled = true;
  startButton.disabled = true;
  stopButton.disabled = false;

  mediaRecorder = new MediaRecorder(stream, {
    audioBitsPerSecond: 32000,
    // videoBitsPerSecond: 500000,
  });
  let currentTime = Date.now();

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
