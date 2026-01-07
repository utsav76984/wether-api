
const API_KEY = "5f2ff3ccf27a45d9a5b132242260401";

const cityInput = document.getElementById("cityInput");
const suggestions = document.getElementById("suggestions");
const weatherBox = document.getElementById("weatherResult");

cityInput.addEventListener("input", async () => {
  const query = cityInput.value.trim();

  if (query.length < 2) {
    suggestions.innerHTML = "";
    return;
  }

  const res = await fetch(
    `https://api.weatherapi.com/v1/search.json?key=${API_KEY}&q=${query}`
  );
  const data = await res.json();

  suggestions.innerHTML = "";

  data.forEach(city => {
    const li = document.createElement("li");
    li.textContent = `${city.name}, ${city.country}`;
    li.onclick = () => selectCity(`${city.name}, ${city.country}`);
    suggestions.appendChild(li);
  });
});


async function selectCity(city) {
  cityInput.value = city;
  suggestions.innerHTML = "";

  const res = await fetch(
    `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}`
  );
  const data = await res.json();

  displayWeather(data);
}

function displayWeather(data) {
  weatherBox.classList.remove("hidden");

  document.getElementById("cityName").innerText =
    `${data.location.name}, ${data.location.country}`;

  document.getElementById("temp").innerText =
    `${data.current.temp_c}°C`;

  document.getElementById("condition").innerText =
    data.current.condition.text;

  document.getElementById("humidity").innerText =
    `${data.current.humidity}%`;

  document.getElementById("wind").innerText =
    `${data.current.wind_kph} km/h`;

  document.getElementById("icon").src =
    `https:${data.current.condition.icon}`;

  changeBackground(data.current.temp_c, data.current.is_day);
}

function changeBackground(temp, isDay) {
  if (!isDay) {
    document.body.style.background =
      "linear-gradient(135deg, #0f2027, #203a43)";
  } else if (temp < 15) {
    document.body.style.background =
      "linear-gradient(135deg, #2193b0, #6dd5ed)";
  } else if (temp < 30) {
    document.body.style.background =
      "linear-gradient(135deg, #56ab2f, #a8e063)";
  } else {
    document.body.style.background =
      "linear-gradient(135deg, #f12711, #f5af19)";
  }
}
