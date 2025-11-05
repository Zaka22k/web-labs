const input = document.getElementById("datetime");
const button = document.getElementById("checkBtn");
const result = document.getElementById("result");

button.addEventListener("click", () => {
  const value = input.value.trim();

  const regex = /^(\d{2})-(\d{2})-(\d{4}) (\d{2}):(\d{2}):(\d{2})$/;
  const match = value.match(regex);

  if (!match) {
    result.textContent = "Формат некорректен, данные не проверяются";
    return;
  }

  const [_, d, m, y, h, min, s] = match.map(Number);

  const date = new Date(y, m - 1, d, h, min, s);
  const validDate =
    date.getFullYear() === y &&
    date.getMonth() === m - 1 &&
    date.getDate() === d &&
    h >= 0 &&
    h < 24 &&
    min >= 0 &&
    min < 60 &&
    s >= 0 &&
    s < 60;

  if (!validDate) {
    result.textContent = "Формат корректен, данные некорректны";
  } else {
    result.textContent = "Формат корректен, данные корректны";
  }
});
