const canShare = document.getElementById("can-share");
const share = document.getElementById("share");
const result = document.getElementById("result");

const data = {
  title: "Title Test",
  url: "https://otedia.com",
  text: "lorem ipsum text example!",
  file: new File(["foo"], "foo.txt", {
    type: "text/plain",
  }),
};

canShare.addEventListener("click", () => {
  try {
    if (!navigator.canShare(data)) {
      result.textContent = "navigator.canShare() not supported.";
    }

    if (navigator.canShare(data)) {
      result.textContent =
        "navigator.canShare() supported. We can use navigator.share() to send the data.";
    }
  } catch (err) {
    result.textContent = "navigator.canShare() not supported.";
  }
});

share.addEventListener("click", async () => {
  try {
    await navigator.share(data);
    result.textContent = "MDN shared successfully";
  } catch (err) {
    alert(err);
  }
});
