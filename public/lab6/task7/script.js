"use strict";

const loadProfileBtn = document.getElementById("loadProfileBtn");
const profileCountSpan = document.getElementById("profileCount");
const currentProfileDiv = document.getElementById("currentProfile");

function loadProfilesFromStorage() {
  const saved = localStorage.getItem("userProfiles");
  return saved ? JSON.parse(saved) : [];
}

function updateCount() {
  profileCountSpan.textContent = loadProfilesFromStorage().length;
}

async function loadProfile() {
  currentProfileDiv.innerHTML =
    '<p style="text-align:center; font-size:14px; color:gray;">Загрузка...</p>';
  try {
    const res = await fetch("https://randomuser.me/api/");
    if (!res.ok) throw new Error("Ошибка сети");
    const data = await res.json();
    const user = data.results[0];

    const profileData = {
      id: user.login.uuid,
      name: `${user.name.first} ${user.name.last}`,
      gender: user.gender === "male" ? "Мужчина" : "Женщина",
      email: user.email,
      country: user.location.country,
      picture: user.picture.large,
    };

    displayProfile(profileData);
  } catch (err) {
    currentProfileDiv.innerHTML = "";
    alert("Не удалось загрузить профиль");
  }
}

function displayProfile(profile) {
  currentProfileDiv.innerHTML = `
    <div class="profile-card">
      <img src="${profile.picture}" alt="${profile.name}">
      <div class="profile-info">
        <strong>${profile.name}</strong>
        <p>${profile.gender}</p>
        <p>${profile.email}</p>
        <p>${profile.country}</p>
        <button id="saveProfileBtn">Сохранить профиль</button>
      </div>
    </div>
  `;

  document.getElementById("saveProfileBtn").addEventListener("click", () => {
    const profiles = loadProfilesFromStorage();
    if (profiles.find((p) => p.id === profile.id)) {
      alert("Этот профиль уже сохранен");
      return;
    }
    profiles.push(profile);
    localStorage.setItem("userProfiles", JSON.stringify(profiles));
    updateCount();
    alert("Профиль сохранен!");
  });
}

loadProfileBtn.addEventListener("click", loadProfile);
window.addEventListener("DOMContentLoaded", updateCount);
