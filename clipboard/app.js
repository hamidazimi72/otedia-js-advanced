const imageEl = document.getElementById("image");
const copyButton = document.getElementById("copy");
const pasteButton = document.getElementById("paste");
const inputEl = document.getElementById("input");

copyButton.addEventListener("click", async () => {
  try {
    const data = await fetch("image.png");
    const blob = data.blob();
    const image = new ClipboardItem({ "image/png": blob });
    await navigator.clipboard.write([image]);
  } catch (err) {
    console.log(err);
  }
});

pasteButton.addEventListener("click", async () => {
  try {
    const items = await navigator.clipboard.read();
    const item = items[0];
    const image = await item.getType("image/png");
    const src = URL.createObjectURL(image);
    imageEl.src = src;
  } catch (err) {
    alert(err);
  }
});

inputEl.addEventListener("paste", () => {
  pasteButton.click();
});

// const textarea = document.querySelector("textarea");
// const copyButton = document.getElementById("copy");
// const pasteButton = document.getElementById("paste");

// copyButton.addEventListener("click", async () => {
//   try {
//     await navigator.clipboard.writeText(textarea.value);
//     console.log(textarea.value);
//   } catch (err) {
//     console.log("copy Failed!");
//   }
// });

// pasteButton.addEventListener("click", async () => {
//   try {
//     const value = await navigator.clipboard.readText();
//     textarea.value = value;
//   } catch (err) {
//     console.log(err);
//     console.log("paste Failed!");
//   }
// });

// textarea.addEventListener("copy", (e) => {
//   e.preventDefault();
//   const selectedText = textarea.value.substring(
//     textarea.selectionStart,
//     textarea.selectionEnd
//   );
//   e.clipboardData.setData("text/plain", selectedText);
// });

// textarea.addEventListener("paste", (e) => {
//   e.preventDefault();
//   const pastedValue = e.clipboardData.getData("text/plain") || "";
//   textarea.value = pastedValue.repeat(2);
// });
