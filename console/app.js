const logButton = document.getElementById("log");
const assertButton = document.getElementById("assert");
const clearButton = document.getElementById("clear");
const countButton = document.getElementById("count");
const countResetButton = document.getElementById("count-reset");
const groupButton = document.getElementById("group");
const groupCollapsedButton = document.getElementById("group-collapsed");
const groupEndButton = document.getElementById("group-end");
const timeButton = document.getElementById("time");
const timeEndButton = document.getElementById("time-end");
const timeLogButton = document.getElementById("time-log");

logButton.addEventListener("click", () => {
  console.log("log test");
});

assertButton.addEventListener("click", () => {
  const a = 20;
  console.assert(a < 30, "a < 30");
  console.assert(a > 50, "a > 50");
});

clearButton.addEventListener("click", () => {
  console.clear();
});

countButton.addEventListener("click", () => {
  console.count("X");
});

countResetButton.addEventListener("click", () => {
  console.countReset("X");
});

groupButton.addEventListener("click", () => {
  console.group("G1");
});

groupCollapsedButton.addEventListener("click", () => {
  console.groupCollapsed("G1");
});

groupEndButton.addEventListener("click", () => {
  console.groupEnd();
});

timeButton.addEventListener("click", () => {
  console.time();
});

timeLogButton.addEventListener("click", () => {
  console.timeLog();
});

timeEndButton.addEventListener("click", () => {
  console.timeEnd();
});
