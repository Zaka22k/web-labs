const passwordInput = document.getElementById("password");
const button = document.getElementById("check");
const result = document.getElementById("result");

button.addEventListener("click", () => {
  const pwd = passwordInput.value.trim();
  result.innerHTML = "";
  let total = 0;
  const criteria = [];

  if (pwd.length < 5) {
    criteria.push("Длина менее 5 символов (0 баллов)");
    result.innerHTML = `
      <div class="criteria-list">
        <div class="criterion error">${criteria[0]}</div>
      </div>
      <div class="total-score">Итог: <span>0</span> / 10</div>`;
    return;
  }

  if (pwd.length >= 5 && pwd.length <= 9) {
    total += 1;
    criteria.push("Длина 5–9 символов (+1)");
  } else if (pwd.length >= 10 && pwd.length <= 12) {
    total += 2;
    criteria.push("Длина 10–12 символов (+2)");
  } else if (pwd.length > 12) {
    total += 3;
    criteria.push("Длина свыше 12 символов (+3)");
  }

  const hasLetters = /[a-zA-Zа-яА-Я]/.test(pwd);
  const hasDigits = /\d/.test(pwd);
  const hasSpecial = /[^a-zA-Zа-яА-Я0-9]/.test(pwd);

  let typeCount = 0;
  if (hasLetters) typeCount++;
  if (hasDigits) typeCount++;
  if (hasSpecial) typeCount++;

  const typeBonus = Math.min(typeCount - 1, 2);
  if (typeBonus > 0) {
    total += typeBonus;
    criteria.push(`Использование разных типов символов (+${typeBonus})`);
  }

  if (/[A-ZА-Я]/.test(pwd) && /[a-zа-я]/.test(pwd)) {
    total += 1;
    criteria.push("Смешанный регистр (+1)");
  }

  if (hasLetters && hasDigits && hasSpecial) {
    total += 2;
    criteria.push("Комбинация: буквы, цифры и спецсимволы (+2)");
  }

  if (!/(.)\1/.test(pwd)) {
    total += 2;
    criteria.push("Отсутствие повторяющихся подряд символов (+2)");
  }

  result.innerHTML = `
    <div class="criteria-list">
      ${criteria
        .map((c) => `<div class="criterion success">${c}</div>`)
        .join("")}
    </div>
    <div class="total-score">Итог: <span>${total}</span> / 10</div>
  `;
});
