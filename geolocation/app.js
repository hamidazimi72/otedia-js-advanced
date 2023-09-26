// const button = document.getElementById("geo");
const start = document.getElementById("start");
const end = document.getElementById("end");
const current = document.getElementById("current");
const result = document.getElementById("result");

// button.addEventListener("click", () => {
//   navigator.geolocation.getCurrentPosition(
//     (res) => {
//       console.log(res?.coords);
//       const coords = res?.coords;
//       result.innerHTML += `<p>دقت: ${coords?.accuracy} متر</p>`;
//       result.innerHTML += `<p>ارتفاع: ${coords?.altitude} متر</p>`;
//       result.innerHTML += `<p>دقت ارتفاع: ${coords?.altitudeAccuracy} متر</p>`;
//       result.innerHTML += `<p>عرض جغرافیایی: ${coords?.latitude}</p>`;
//       result.innerHTML += `<p>طول جغرافیایی: ${coords?.longitude}</p>`;
//       result.innerHTML += `<p>جهت: ${coords?.heading ?? "-"}</p>`;
//       result.innerHTML += `<p>سرعت: ${coords?.speed ?? "-"}</p>`;
//     },
//     (err) => console.log(err),
//     { enableHighAccuracy: true, maximumAge: 1000 }
//   );
// });

let watcherId, map, count, marker;
let lat = 35.7;
let long = 51.4;

document.addEventListener("DOMContentLoaded", () => {
  map = L.map("map").setView([lat, long], 12);

  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
  }).addTo(map);
});

start.addEventListener("click", () => {
  count = 0;
  interval = navigator.geolocation.watchPosition(
    (res) => {
      start.disabled = true;
      end.disabled = false;
      console.log(res?.coords);

      const coords = res?.coords;
      lat = coords?.latitude;
      long = coords?.longitude;

      result.innerHTML = "";
      result.innerHTML += `<p>دقت: ${coords?.accuracy} متر</p>`;
      result.innerHTML += `<p>ارتفاع: ${coords?.altitude} متر</p>`;
      result.innerHTML += `<p>دقت ارتفاع: ${coords?.altitudeAccuracy} متر</p>`;
      result.innerHTML += `<p>عرض جغرافیایی: ${lat} درجه</p>`;
      result.innerHTML += `<p>طول جغرافیایی: ${long} درجه</p>`;
      result.innerHTML += `<p>جهت: ${coords?.heading ?? "-"}</p>`;
      result.innerHTML += `<p>سرعت: ${coords?.speed ?? "-"}</p>`;

      if (marker) marker.remove();

      marker = L.marker([lat, long]).addTo(map);

      if (!count) map.setView([lat, long], 15);

      count++;
      console.log(`count: `, count);
    },
    (err) => console.log(err)
  );
});

end.addEventListener("click", () => {
  start.disabled = false;
  end.disabled = true;
  navigator.geolocation.clearWatch(interval);
  count = 0;
});

current.addEventListener("click", () => {
  map.setView([lat, long], 15);
});
