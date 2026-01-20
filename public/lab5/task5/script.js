"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const display = document.getElementById("display");
  const resultEl = document.getElementById("result");
  const roundCheckbox = document.getElementById("roundResult");
  const logBaseContainer = document.getElementById("logBaseContainer");
  const logBaseInput = document.getElementById("logBase");

  let currentInput = "";
  let operator = null;
  let operand1 = null;

  document.querySelectorAll(".num").forEach((btn) => {
    btn.addEventListener("click", () => {
      currentInput += btn.textContent;
      display.value = currentInput;
    });
  });

  document.getElementById("dot").addEventListener("click", () => {
    if (!currentInput.includes(".")) {
      currentInput += ".";
      display.value = currentInput;
    }
  });

  document.getElementById("clear").addEventListener("click", () => {
    currentInput = "";
    operator = null;
    operand1 = null;
    display.value = "";
    resultEl.textContent = "";
    logBaseContainer.style.display = "none";
    logBaseInput.value = "";
  });

  document.querySelectorAll(".op").forEach((btn) => {
    btn.addEventListener("click", () => {
      if (btn.id === "sqrt") {
        operand1 = parseFloat(currentInput);
        operator = "sqrt";
        currentInput = "";
        logBaseContainer.style.display = "none";
        calculate();
        return;
      }
      if (btn.id === "log") {
        operand1 = parseFloat(currentInput);
        operator = "log";
        currentInput = "";
        logBaseContainer.style.display = "block";
        display.value = operand1;
        return;
      }

      if (btn.textContent === "-" && currentInput === "") {
        currentInput = "-";
        display.value = currentInput;
        return;
      }

      if (currentInput === "") return;
      if (operand1 !== null && operator) calculate();
      else operand1 = parseFloat(currentInput);
      operator = btn.textContent;
      currentInput = "";
      logBaseContainer.style.display = "none";
    });
  });

  document.getElementById("equals").addEventListener("click", calculate);

  function calculate() {
    let res;
    const op2 = parseFloat(currentInput);

    switch (operator) {
      case "+":
        if (isNaN(op2)) return showError("Введите второй операнд!");
        res = operand1 + op2;
        break;
      case "-":
        if (isNaN(op2)) return showError("Введите второй операнд!");
        res = operand1 - op2;
        break;
      case "*":
        if (isNaN(op2)) return showError("Введите второй операнд!");
        res = operand1 * op2;
        break;
      case "/":
        if (isNaN(op2)) return showError("Введите второй операнд!");
        if (op2 === 0) return showError("Делить на ноль нельзя!");
        res = operand1 / op2;
        break;
      case "sqrt":
        if (operand1 < 0)
          return showError("Нельзя взять корень из отрицательного!");
        res = Math.sqrt(operand1);
        break;
      case "log":
        const base = parseFloat(logBaseInput.value);
        if (operand1 <= 0)
          return showError("Логарифм определён для числа > 0!");
        if (isNaN(base) || base <= 0 || base === 1)
          return showError("Некорректное основание!");
        res = Math.log(operand1) / Math.log(base);
        break;
      default:
        return;
    }

    if (roundCheckbox.checked) res = Math.round(res * 1000) / 1000;

    resultEl.textContent = `Результат: ${res}`;
    display.value = res;
    currentInput = "";
    operand1 = null;
    operator = null;
    logBaseContainer.style.display = "none";
    logBaseInput.value = "";
  }

  function showError(msg) {
    resultEl.textContent = msg;
  }
});
