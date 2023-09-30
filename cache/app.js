const openButton = document.getElementById("open");
const addButton = document.getElementById("add");
const putButton = document.getElementById("put");
const match = document.getElementById("match");
const matchAll = document.getElementById("match-all");
const deleteButton = document.getElementById("delete");
const deleteAllButton = document.getElementById("delete-all");

let c1;

openButton.addEventListener("click", async () => {
  c1 = await caches.open("c1");
  console.log(c1);
});

addButton.addEventListener("click", async () => {
  if (!c1) {
    console.log("c1 cache storage is not ready!");
    return;
  }
  const result = await c1.addAll(["test1.txt", "test2.txt"]);
  console.log(result);
});

putButton.addEventListener("click", async () => {
  if (!c1) {
    console.log("c1 cache storage is not ready!");
    return;
  }

  const response = await fetch("test3.txt");
  try {
    const result = await c1.put("test3.txt", response);
    console.log(result);
  } catch (err) {
    console.log(err);
  }
});

match.addEventListener("click", async () => {
  if (!c1) {
    console.log("c1 cache storage is not ready!");
    return;
  }

  try {
    const result = await c1.match("test1.txt");
    const res = await result.text();
    console.log(res);
  } catch (err) {
    console.log(err);
  }
});

matchAll.addEventListener("click", async () => {
  if (!c1) {
    console.log("c1 cache storage is not ready!");
    return;
  }

  try {
    const result = await c1.matchAll();
    for (const item of result) {
      const res = await item.text();
      console.log(res, Date.now());
    }
  } catch (err) {
    console.log(err);
  }
});

deleteButton.addEventListener("click", async () => {
  if (!c1) {
    console.log("c1 cache storage is not ready!");
    return;
  }

  try {
    const result = await c1.delete("test1.txt");
    console.log(result);
  } catch (err) {
    console.log(err);
  }
});

deleteAllButton.addEventListener("click", async () => {
  if (!c1) {
    console.log("c1 cache storage is not ready!");
    return;
  }

  const result = await caches.delete("c1");
  console.log(result);
});
