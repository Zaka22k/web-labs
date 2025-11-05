const passwordInput = document.getElementById("password");
const button = document.getElementById("check");
const result = document.getElementById("result");

button.addEventListener("click", () => {
  const pwd = passwordInput.value.trim();
  result.innerHTML = "";
  let total = 0;
  const criteria = [];

  if (pwd.length < 5) {
    criteria.push(
      "1 — длина менее 5 символов → 0 баллов (остальные не учитываются)"
    );
    total = 0;
    result.innerHTML = `<div class='criterion'>${criteria.join(
      "<br>"
    )}</div><br><b>Итог: ${total} / 10</b>`;
    return;
  }

  if (pwd.length >= 5 && pwd.length <= 9) {
    total += 1;
    criteria.push("2 — длина 5–9 символов → +1");
  } else if (pwd.length >= 10 && pwd.length <= 12) {
    total += 2;
    criteria.push("3 — длина 10–12 символов → +2");
  } else if (pwd.length > 12) {
    total += 3;
    criteria.push("4 — длина свыше 12 символов → +3");
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
    criteria.push(`5(${typeBonus}) — разные виды символов → +${typeBonus}`);
  }

  const hasUpper = /[A-ZА-Я]/.test(pwd);
  const hasLower = /[a-zа-я]/.test(pwd);
  if (hasUpper && hasLower) {
    total += 1;
    criteria.push("6 — разные регистры → +1");
  }

  const specials = (pwd.match(/[^a-zA-Zа-яА-Я0-9]/g) || []).length;
  if (specials / pwd.length > 0.3) {
    total += 2;
    criteria.push("7 — более 30% спецсимволов → +2");
  }

  const noLongSeq = !(/[a-zA-Z]{3,}/.test(pwd) || /\d{3,}/.test(pwd));
  if (noLongSeq) {
    total += 2;
    criteria.push("8 — нет буквенных или цифровых цепочек длиной ≥3 → +2");
  }

  if (total > 10) total = 10;

  result.innerHTML = `
    <div class='criterion'><b>Критерии:</b> ${criteria.join("; ")}</div>
    <br><b>Оценка: ${total} / 10</b>
  `;
});
