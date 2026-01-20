"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("orderForm");
  const deliveryCheckbox = document.getElementById("delivery");
  const addressBlock = document.getElementById("addressLabel");

  deliveryCheckbox.addEventListener("change", () => {
    addressBlock.style.display = deliveryCheckbox.checked ? "flex" : "none";
  });

  const validate = () => {
    let isValid = true;

    const setError = (id, message, isWarning = false) => {
      const el = document.getElementById(id + "Error");
      el.textContent = message;
      el.className = isWarning ? "warning-msg" : "error-msg";
      if (!isWarning) isValid = false;
    };

    document
      .querySelectorAll(".error-msg, .warning-msg")
      .forEach((span) => (span.textContent = ""));

    const login = document.getElementById("login").value.trim();
    if (login.length < 5 || login.length > 20) {
      setError("login", "Логин должен содержать от 5 до 20 символов");
    }

    const pass = document.getElementById("password").value;
    const confirmPass = document.getElementById("confirmPassword").value;
    if (pass.length < 5 || pass.length > 12) {
      setError("password", "Пароль должен содержать от 5 до 12 символов");
    }
    if (pass !== confirmPass) {
      setError("confirmPassword", "Пароли не совпадают");
    }

    const age = parseInt(document.getElementById("age").value);
    if (isNaN(age) || age < 14 || age > 120) {
      setError("age", "Возраст должен быть от 14 до 120 лет");
    } else if (age < 18) {
      setError("age", "Требуется согласие родителей", true);
    }

    if (!document.getElementById("city").value) {
      setError("city", "Пожалуйста, выберите город");
    }

    if (deliveryCheckbox.checked) {
      const address = document.getElementById("address").value.trim();
      if (address.length < 10) {
        setError("address", "Введите полный адрес (минимум 10 символов)");
      }
    }

    return isValid;
  };

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (validate()) {
      alert("Заказ успешно оформлен!");
      console.log("Данные успешно валидированы");
    }
  });
});
