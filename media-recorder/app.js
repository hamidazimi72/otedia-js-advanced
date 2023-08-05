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

  if (seconds >= 3600) {
    return new Date(seconds).toISOString().slice(11, 19);
  } else {
    return new Date(seconds).toISOString().slice(14, 19);
  }
};

getMicButton.addEventListener("click", async () => {
  stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  console.log(stream);
});

startButton.addEventListener("click", () => {
  if (!stream || !stream?.active) {
    alert("استریم موجود یا فعال نیست!");
    return;
  }

  mediaRecorder = new MediaRecorder(stream, { audioBitsPerSecond: 32000 });
  let currentTime = Date.now();

  mediaRecorder.addEventListener("dataavailable", (event) => {
    console.log(event?.data);
    chunks.push(event.data);

    const seconds = Date.now() - currentTime;
    timeBoxEl.innerText = convertTimeHandler(seconds);
  });

  mediaRecorder.addEventListener('stop', () => {
    stream.getTracks().
  })

  mediaRecorder.start(1000);
});

stopButton.addEventListener("click", () => {
  if (!mediaRecorder) return;

  mediaRecorder.stop();
});
