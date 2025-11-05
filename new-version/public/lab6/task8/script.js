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
  const now = Date.now();
  const diff = now - data[city].timestamp;
  if (diff > 10 * 60 * 1000) return null;
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
  if (history.length > 5) history = history.slice(0, 5);
  localStorage.setItem("weatherHistory", JSON.stringify(history));
  renderHistory();
}

function renderHistory() {
  const saved = localStorage.getItem("weatherHistory");
  const history = saved ? JSON.parse(saved) : [];
  historyBtnsDiv.innerHTML = "";
  history.forEach((city) => {
    const btn = document.createElement("button");
    btn.textContent = city;
    btn.addEventListener("click", () => {
      cityInput.value = city;
      showWeather();
    });
    historyBtnsDiv.appendChild(btn);
  });
}

clearCacheBtn.addEventListener("click", () => {
  localStorage.removeItem("weatherData");
  localStorage.removeItem("weatherHistory");
  historyBtnsDiv.innerHTML = "";
  weatherResult.textContent = "Кэш очищен.";
});

async function fetchWeather(city) {
  const url = `https://api.weatherbit.io/v2.0/current?city=${encodeURIComponent(
    city
  )}&lang=ru&key=${API_KEY}`;
  const response = await fetch(url);
  if (!response.ok) throw new Error("Ошибка получения данных от Weatherbit");
  const data = await response.json();
  if (!data.data || data.data.length === 0) throw new Error("Город не найден");

  const info = data.data[0];
  return {
    temp: info.temp,
    wind: `${info.wind_spd.toFixed(1)} м/с`,
    windDir: `${info.wind_dir}°`,
    description: info.weather.description,
  };
}

async function showWeather() {
  const city = cityInput.value.trim();
  if (!city) return;

  const cached = getWeatherFromStorage(city);
  if (cached) {
    weatherResult.innerHTML = `
      <p>Источник: <strong>localStorage</strong></p>
      <p>Температура: ${cached.temp} °C</p>
      <p>Ветер: ${cached.wind}, ${cached.windDir}</p>
      <p>Погода: ${cached.description}</p>
    `;
    return;
  }

  try {
    const weather = await fetchWeather(city);
    saveWeatherToStorage(city, weather);
    weatherResult.innerHTML = `
      <p>Источник: <strong>Weatherbit API</strong></p>
      <p>Температура: ${weather.temp} °C</p>
      <p>Ветер: ${weather.wind}, ${weather.windDir}</p>
      <p>Погода: ${weather.description}</p>
    `;
  } catch (err) {
    weatherResult.textContent = "Не удалось получить данные о погоде.";
    console.error(err);
  }
}

getWeatherBtn.addEventListener("click", showWeather);
window.addEventListener("DOMContentLoaded", renderHistory);
