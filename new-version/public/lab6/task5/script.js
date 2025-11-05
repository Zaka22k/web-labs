"use strict";

const loadBtn = document.getElementById("loadBtn");
const favBtn = document.getElementById("favBtn");
const animalImg = document.getElementById("animalImg");
const favoritesList = document.getElementById("favoritesList");

let currentUrl = "";

function loadFavorites() {
  const saved = localStorage.getItem("favorites");
  if (!saved) return [];
  return JSON.parse(saved);
}

function saveFavorites(favs) {
  localStorage.setItem("favorites", JSON.stringify(favs));
}

function renderFavorites() {
  const favs = loadFavorites();
  favoritesList.innerHTML = "";
  favs.forEach((item) => {
    const li = document.createElement("li");
    const date = new Date(item.added).toLocaleString();
    li.innerHTML = `<img src="${item.url}" alt="" style="max-width:100px;"> Добавлено: ${date}`;
    favoritesList.appendChild(li);
  });
}

async function loadAnimal() {
  const type = document.querySelector('input[name="animal"]:checked').value;
  favBtn.disabled = true;
  animalImg.src = "";
  currentUrl = "";

  let apiUrl = "";
  if (type === "dog") {
    apiUrl = "https://dog.ceo/api/breeds/image/random";
  } else {
    apiUrl = "https://api.thecatapi.com/v1/images/search";
  }

  try {
    const res = await fetch(apiUrl);
    if (!res.ok) throw new Error("Ошибка сети");
    const data = await res.json();
    if (type === "dog") {
      currentUrl = data.message;
    } else {
      currentUrl = data[0].url;
    }
    animalImg.src = currentUrl;
    favBtn.disabled = false;
  } catch (err) {
    alert("Не удалось загрузить картинку");
  }
}

function addFavorite() {
  if (!currentUrl) return;
  const favs = loadFavorites();
  favs.push({ url: currentUrl, added: new Date().toISOString() });
  saveFavorites(favs);
  renderFavorites();
  favBtn.disabled = true;
}

loadBtn.addEventListener("click", loadAnimal);
favBtn.addEventListener("click", addFavorite);

window.addEventListener("DOMContentLoaded", renderFavorites);
