"use strict";

const $ = (id) => document.getElementById(id);

document.addEventListener("DOMContentLoaded", () => {
  const op1 = $("operand1");
  const op2 = $("operand2");
  const opSelect = $("operator");
  const baseInput = $("base");
  const roundCheckbox = $("roundResult");
  const btn = $("doCalc");
  const result = $("result");

  opSelect.addEventListener("change", () => {
    const op = opSelect.value;

    if (op === "sqrt" || op === "log") {
      op2.disabled = true;
      op2.value = "";
      if (op === "log") {
        baseInput.style.display = "inline-block";
      } else {
        baseInput.style.display = "none";
        baseInput.value = "";
      }
    } else {
      op2.disabled = false;
      baseInput.style.display = "none";
      baseInput.value = "";
    }
  });

  btn.addEventListener("click", () => {
    const operator = opSelect.value;
    let a = parseFloat(op1.value);
    let b = parseFloat(op2.value);
    let base = parseFloat(baseInput.value);
    let res;

    if (isNaN(a)) {
      result.textContent = "Введите первый операнд!";
      return;
    }

    switch (operator) {
      case "+":
        if (isNaN(b)) return (result.textContent = "Введите второй операнд!");
        res = a + b;
        break;
      case "-":
        if (isNaN(b)) return (result.textContent = "Введите второй операнд!");
        res = a - b;
        break;
      case "*":
        if (isNaN(b)) return (result.textContent = "Введите второй операнд!");
        res = a * b;
        break;
      case "/":
        if (isNaN(b)) return (result.textContent = "Введите второй операнд!");
        if (b === 0) return (result.textContent = "Делить на ноль нельзя!");
        res = a / b;
        break;
      case "sqrt":
        if (a < 0)
          return (result.textContent =
            "Нельзя взять корень из отрицательного!");
        res = Math.sqrt(a);
        break;
      case "log":
        if (a <= 0 || base <= 0 || base === 1)
          return (result.textContent = "Некорректные значения для логарифма!");
        res = Math.log(a) / Math.log(base);
        break;
      default:
        result.textContent = "Неизвестная операция";
        return;
    }

    if (roundCheckbox.checked) res = Math.round(res * 1000) / 1000;

    result.textContent = `Результат: ${res}`;
  });
});
