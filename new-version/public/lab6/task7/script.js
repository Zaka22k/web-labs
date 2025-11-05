"use strict";

const loadProfileBtn = document.getElementById("loadProfileBtn");
const profileCountSpan = document.getElementById("profileCount");
const currentProfileDiv = document.getElementById("currentProfile");

function loadProfilesFromStorage() {
  const saved = localStorage.getItem("userProfiles");
  return saved ? JSON.parse(saved) : [];
}

function saveProfilesToStorage(profiles) {
  localStorage.setItem("userProfiles", JSON.stringify(profiles));
  updateCount();
}

function updateCount() {
  profileCountSpan.textContent = loadProfilesFromStorage().length;
}

async function loadProfile() {
  try {
    const res = await fetch("https://randomuser.me/api/");
    if (!res.ok) throw new Error("Ошибка сети");
    const data = await res.json();
    const user = data.results[0];

    const profileData = {
      id: user.login.uuid,
      name: `${user.name.first} ${user.name.last}`,
      gender: user.gender,
      email: user.email,
      country: user.location.country,
      picture: user.picture.large,
    };

    displayProfile(profileData);
  } catch (err) {
    alert("Не удалось загрузить профиль");
    console.error(err);
  }
}

function displayProfile(profile) {
  currentProfileDiv.innerHTML = `
    <div class="profile">
      <img src="${profile.picture}" alt="${profile.name}" width="70">
      <div>
        <p><strong>${profile.name}</strong></p>
        <p>${profile.gender}, ${profile.email}</p>
        <p>${profile.country}</p>
        <button id="saveProfileBtn">Сохранить</button>
      </div>
    </div>
  `;

  document.getElementById("saveProfileBtn").addEventListener("click", () => {
    const profiles = loadProfilesFromStorage();
    profiles.push(profile);
    saveProfilesToStorage(profiles);
    alert("Профиль сохранён!");
    currentProfileDiv.innerHTML = "";
  });
}

loadProfileBtn.addEventListener("click", loadProfile);
window.addEventListener("DOMContentLoaded", updateCount);

window.addEventListener("storage", (e) => {
  if (e.key === "userProfiles") {
    updateCount();
  }
});
