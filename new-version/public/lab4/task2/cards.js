"use strict";

const $ = (id) => document.getElementById(id);

const digitsOnly = (s) => s.replace(/\D+/g, "");

function detectBrandByFirstDigits(num) {
  const clean = num.replace(/\s+/g, "");
  const first6 = clean.slice(0, 6);
  const first4 = clean.slice(0, 4);
  const first3 = clean.slice(0, 3);
  const first2 = clean.slice(0, 2);
  const first1 = clean.slice(0, 1);

  if (/^220/.test(first3)) return "mir";

  if (/^35/.test(first2)) return "jcb";

  if (/^(50|56|57|58|60|62|63|67)/.test(first2)) return "maestro";

  if (
    /^5[1-5]/.test(first2) ||
    /^(2221|2222|2223|2224|2225|2226|2227|2228|2229|22[3-9]|2[3-6]\d|27[01]\d|2720)/.test(
      first6
    )
  )
    return "mc";

  if (
    ["4026", "417500", "4405", "4508", "4844", "4913", "4917"].includes(
      first4
    ) ||
    first6 === "417500"
  )
    return "visael";

  if (/^4/.test(first1)) return "visa";

  return null;
}

function isValidLuhn(num) {
  let sum = 0;
  let shouldDouble = false;

  for (let i = num.length - 1; i >= 0; i--) {
    let digit = parseInt(num.charAt(i), 10);

    if (shouldDouble) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }

    sum += digit;
    shouldDouble = !shouldDouble;
  }

  return sum % 10 === 0;
}

function formatCardNumber(num) {
  return num.replace(/(\d{4})(?=\d)/g, "$1 ").trim();
}

function clearHighlight() {
  const active = document.querySelector("#cards img.hl");
  if (active) active.classList.remove("hl");
}

document.addEventListener("DOMContentLoaded", () => {
  const input = $("cardNumber");
  const button = $("cardCheck");
  const out = $("result");

  input.addEventListener("input", () => clearHighlight());

  button.addEventListener("click", () => {
    clearHighlight();
    const raw = String(input.value);
    const num = digitsOnly(raw);

    if (num.length < 13 || num.length > 19) {
      out.textContent = "Некорректная длина номера карты";
      return;
    }

    if (!isValidLuhn(num)) {
      out.textContent = "Номер карты некорректен (ошибка Луна)";
      input.value = formatCardNumber(num);
      return;
    }

    out.textContent = "Номер карты корректен ✅";

    const brandId = detectBrandByFirstDigits(num);
    if (brandId) {
      const img = $(brandId);
      if (img) img.classList.add("hl");
    }

    input.value = formatCardNumber(num);
  });
});

// Visa: 4000 0566 5566 5556

// MasterCard: 5187 5868 6613 9472

// Visa Electron: 4026 0990 5501 3548

// Maestro: 6759 9724 5445 5825

// JCB: 3544 0242 2761 6437

// МИР: 2204 8427 1084 1045
