"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const lengthInput = document.getElementById("length");
  const lowercase = document.getElementById("lowercase");
  const uppercase = document.getElementById("uppercase");
  const numbers = document.getElementById("numbers");
  const symbols = document.getElementById("symbols");
  const generateBtn = document.getElementById("generate");
  const passwordOutput = document.getElementById("password");
  const copyBtn = document.getElementById("copy");

  const SYMBOLS = "!@#$%^&*()-_=+[]{}|;:,.<>?/`~";

  generateBtn.addEventListener("click", () => {
    const length = parseInt(lengthInput.value);
    if (isNaN(length) || length < 6 || length > 32) {
      alert("Введите длину от 6 до 32!");
      return;
    }

    const charTypes = [];
    if (lowercase.checked) charTypes.push("lower");
    if (uppercase.checked) charTypes.push("upper");
    if (numbers.checked) charTypes.push("number");
    if (symbols.checked) charTypes.push("symbol");

    if (charTypes.length === 0) {
      alert("Выберите хотя бы один тип символов!");
      return;
    }

    passwordOutput.value = generatePassword(length, charTypes);
  });

  copyBtn.addEventListener("click", async () => {
    const text = passwordOutput.value;
    if (!text) return;

    try {
      await navigator.clipboard.writeText(text);
      alert("Пароль скопирован в буфер!");
    } catch (err) {
      try {
        passwordOutput.select();
        passwordOutput.setSelectionRange(0, text.length);
        document.execCommand("copy");
        alert("Пароль скопирован (через резервный метод)!");
      } catch (fallbackErr) {
        alert("Не удалось скопировать пароль :(");
      }
    }
  });

  function generatePassword(length, types) {
    let password = "";
    const funcs = {
      lower: () => String.fromCharCode(97 + Math.floor(Math.random() * 26)),
      upper: () => String.fromCharCode(65 + Math.floor(Math.random() * 26)),
      number: () => String.fromCharCode(48 + Math.floor(Math.random() * 10)),
      symbol: () => SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
    };

    types.forEach((type) => {
      password += funcs[type]();
    });

    for (let i = password.length; i < length; i++) {
      const type = types[Math.floor(Math.random() * types.length)];
      password += funcs[type]();
    }
    return shuffleString(password);
  }

  function shuffleString(str) {
    return str
      .split("")
      .sort(() => Math.random() - 0.5)
      .join("");
  }
});
