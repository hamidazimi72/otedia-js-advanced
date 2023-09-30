const requestButton = document.getElementById("request");
const showButton = document.getElementById("show");
const result = document.getElementById("result");

requestButton.addEventListener("click", async () => {
  Notification.requestPermission((permission) => {
    if (permission === "granted") {
      result.innerText = "permission is granted!";
    } else {
      result.innerText = "permission is denied!";
    }
  });
});

showButton.addEventListener("click", () => {
  const notification = new Notification("The First Notification", {
    body: "The test body ...",
    icon: "icon.png",
    image: "image.jpg",
    tag: "first",
    renotify: false,
    data: { a: 20 },
  });

  notification.addEventListener("click", (e) => {
    console.log(e.target.data);
  });
});
