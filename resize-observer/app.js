const observer = document.getElementById("observe");
const unobserver = document.getElementById("unobserve");
const disconnect = document.getElementById("disconnect");
const container = document.getElementById("container");
const title = document.getElementById("title");
const para = document.getElementById("para");
const slider = document.getElementById("slider");

const observerObject = new ResizeObserver((entries) => {
  const width = entries[0]?.contentBoxSize[0].inlineSize;
  const factor = (width - 600) / 28;
  if (width > 600) {
    title.style.fontSize = factor * 1.5 + 32 + "px";
    para.style.fontSize = factor + 20 + "px";
  } else {
    title.style.fontSize = "32px";
    para.style.fontSize = "20px";
  }
});

observer.addEventListener("click", () => {
  observerObject.observe(container);
});

unobserver.addEventListener("click", () => {
  observerObject.unobserve(container);
});

disconnect.addEventListener("click", () => {
  observerObject.disconnect(container);
});

slider.addEventListener("input", () => {
  const value = slider?.value;
  container.style.width = value + "px";
});

// const observer1 = document.getElementById("observe1");
// const unobserver1 = document.getElementById("unobserve1");
// const observer2 = document.getElementById("observe2");
// const unobserver2 = document.getElementById("unobserve2");
// const disconnect = document.getElementById("disconnect");
// const textarea1 = document.getElementById("textarea1");
// const textarea2 = document.getElementById("textarea2");

// const observer = new ResizeObserver((entries, ob) => {
//   console.log(entries);
//   console.log(ob);
// });

// observer1.addEventListener("click", () => {
//   observer.observe(textarea1);
// });

// observer2.addEventListener("click", () => {
//   observer.observe(textarea2);
// });

// unobserver1.addEventListener("click", () => {
//   observer.unobserve(textarea1);
// });

// unobserver2.addEventListener("click", () => {
//   observer.unobserve(textarea2);
// });
