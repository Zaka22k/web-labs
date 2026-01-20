"use strict";

const API_KEY = "fd0270956b324f0d80f54ab3df28dd0d";
const cityInput = document.getElementById("cityInput");
const getWeatherBtn = document.getElementById("getWeatherBtn");
const clearCacheBtn = document.getElementById("clearCacheBtn");
const weatherResult = document.getElementById("weatherResult");
const historyBtnsDiv = document.getElementById("historyBtns");

function getWeatherFromStorage(city) {
  const saved = localStorage.getItem("weatherData");
  if (!saved) return null;
  const data = JSON.parse(saved);
  if (!data[city]) return null;

  // Кэш валиден 10 минут
  if (Date.now() - data[city].timestamp > 10 * 60 * 1000) return null;
  return data[city].weather;
}

function saveWeatherToStorage(city, weather) {
  const saved = localStorage.getItem("weatherData");
  const data = saved ? JSON.parse(saved) : {};
  data[city] = { weather, timestamp: Date.now() };
  localStorage.setItem("weatherData", JSON.stringify(data));
  saveCityToHistory(city);
}

function saveCityToHistory(city) {
  const saved = localStorage.getItem("weatherHistory");
  let history = saved ? JSON.parse(saved) : [];
  history = history.filter((c) => c.toLowerCase() !== city.toLowerCase());
  history.unshift(city);
  localStorage.setItem("weatherHistory", JSON.stringify(history.slice(0, 5)));
  renderHistory();
}

function renderHistory() {
  const saved = localStorage.getItem("weatherHistory");
  const history = saved ? JSON.parse(saved) : [];
  historyBtnsDiv.innerHTML = "";
  history.forEach((city) => {
    const btn = document.createElement("div");
    btn.className = "history-item";
    btn.textContent = city;
    btn.onclick = () => {
      cityInput.value = city;
      showWeather();
    };
    historyBtnsDiv.appendChild(btn);
  });
}

async function fetchWeather(city) {
  const url = `https://api.weatherbit.io/v2.0/current?city=${encodeURIComponent(
    city
  )}&lang=ru&key=${API_KEY}`;
  const response = await fetch(url);
  if (!response.ok) throw new Error("Ошибка API");
  const data = await response.json();
  if (!data.data?.[0]) throw new Error("Город не найден");

  const info = data.data[0];
  return {
    temp: Math.round(info.temp),
    wind: info.wind_spd.toFixed(1),
    description: info.weather.description,
    city: info.city_name,
  };
}

async function showWeather() {
  const city = cityInput.value.trim();
  if (!city) return;

  weatherResult.innerHTML =
    '<p style="text-align:center; margin-top:30px;">Загрузка...</p>';

  const cached = getWeatherFromStorage(city);
  if (cached) {
    displayWeather(cached, true);
    return;
  }

  try {
    const weather = await fetchWeather(city);
    saveWeatherToStorage(city, weather);
    displayWeather(weather, false);
  } catch (err) {
    weatherResult.innerHTML = `<p style="color: var(--SystemFillColorCriticalBrush); text-align: center; margin-top: 30px;">${err.message}</p>`;
  }
}

function displayWeather(data, isCached) {
  weatherResult.innerHTML = `
    <p style="font-size: 12px; color: gray;">${
      isCached ? "Данные из кэша" : "Актуальные данные"
    }</p>
    <p style="font-weight: 600; font-size: 18px;">${data.city}</p>
    <div class="temp">${data.temp}°C</div>
    <p>${data.description}</p>
    <p style="color: var(--TextFillColorSecondaryBrush)">Ветер: ${
      data.wind
    } м/с</p>
  `;
}

getWeatherBtn.addEventListener("click", showWeather);
clearCacheBtn.addEventListener("click", () => {
  localStorage.removeItem("weatherData");
  localStorage.removeItem("weatherHistory");
  renderHistory();
  weatherResult.innerHTML =
    '<p style="text-align:center; margin-top:30px;">Кэш очищен</p>';
});

window.addEventListener("DOMContentLoaded", renderHistory);
