const getMicButton = document.getElementById("request-mic");
const startButton = document.getElementById("start");
const stopButton = document.getElementById("stop");
const timeBoxEl = document.getElementById("time-box");
const resultEl = document.getElementById("result");

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
  stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  // console.log(stream);
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

  mediaRecorder = new MediaRecorder(stream, { audioBitsPerSecond: 32000 });
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

    const audio = document.createElement("audio");
    audio.controls = true;
    audio.src = url;

    const link = document.createElement("a");
    link.download = `sound.mp3`;
    link.href = url;
    link.innerText = "دانلود";

    resultEl.innerHTML = "";
    resultEl.appendChild(audio);
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
