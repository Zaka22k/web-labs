const btnAdd = document.getElementById("add");
const btnRemove = document.getElementById("remove");
const input = document.getElementById("userInput");
const checkboxDeny = document.getElementById("deny");

btnAdd.addEventListener("click", () => {
  if (checkboxDeny.checked) {
    alert("Cookie сохранять запрещено.");
    return;
  }

  const name = input.value.trim();
  if (!name) {
    alert("Введите имя!");
    return;
  }

  const safeName = encodeURIComponent(name);
  document.cookie = `userName=${safeName};max-age=1800;path=/`;
  alert("Имя сохранено в cookie.");
});

btnRemove.addEventListener("click", () => {
  document.cookie = `userName=;expires=${new Date(0).toUTCString()};path=/`;
  alert("Cookie удалена.");
});

function getCookie(name) {
  const cookies = document.cookie.split("; ");
  for (const cookie of cookies) {
    const [key, value] = cookie.split("=");
    if (key === name) return decodeURIComponent(value);
  }
  return null;
}

window.addEventListener("DOMContentLoaded", () => {
  const savedName = getCookie("userName");
  if (savedName) {
    input.value = savedName;
  }
});
