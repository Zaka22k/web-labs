async function loadCat() {
  const status = document.getElementById("status");
  const img = document.getElementById("cat");
  status.textContent = "Загружается...";

  try {
    const res = await fetch("https://api.thecatapi.com/v1/images/search");
    if (!res.ok) throw new Error("HTTP " + res.status);

    const data = await res.json();
    img.src = data[0].url;
    status.textContent = "Готово!";
  } catch (err) {
    status.textContent = "Не удалось загрузить картинку";
  }
}

document.getElementById("load").addEventListener("click", loadCat);
