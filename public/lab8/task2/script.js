const out = document.getElementById("output");

async function request(url) {
  out.textContent = "Загрузка...";
  try {
    const res = await fetch(url);
    const data = await res.json();
    out.textContent = JSON.stringify(data, null, 2);
  } catch (err) {
    out.textContent = "Ошибка: " + err.message;
  }
}

document.getElementById("parse").onclick = () =>
  request("/api/lab8/task2/parse");
document.getElementById("groups").onclick = () =>
  request("/api/lab8/task2/groups");
document.getElementById("stadiums").onclick = () =>
  request("/api/lab8/task2/stadiums");
