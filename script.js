var map;
var marker;
document.addEventListener("DOMContentLoaded", () => {
  let ip;
  const input = document.querySelector("input");
  const submit = document.querySelector(".image");
  const ipAddy = document.querySelector(".ip-address");
  const isp = document.querySelector(".isp");
  const location = document.querySelector(".location");
  const time = document.querySelector(".time");

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      var latitude = position.coords.latitude;
      var longitude = position.coords.longitude;

      map.setView([latitude, longitude]);
      L.marker([latitude, longitude]).addTo(map);
    });
  }

  var map = L.map("map", { zoomControl: false }).setView(
    [6.4059845, 7.5138956],
    12
  );

  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);

  submit.addEventListener("click", function () {
    let ip = input.value;
    input.value = "";
    ipAddy.textContent = ip;
    fetch(
      `https://geo.ipify.org/api/v1?apiKey=at_DX06hxUiyx1D6xSeI19AaKrxDzzsU&ipAddress=${ip}`
    )
      .then(function (response) {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Request failed with status: " + response.status);
        }
      })
      .then(function (data) {
        var latitude = parseFloat(data.location.lat);
        var longitude = parseFloat(data.location.lng);
        map.setView([latitude, longitude]);
        location.textContent = data.location.city;
        time.textContent = `UTC${data.location.timezone}`;
        isp.textContent = data.isp;
        input.clear;

        var marker = L.marker([latitude, longitude]).addTo(map);
      })
      .catch(function (error) {
        console.error(error);
      });
  });
});
