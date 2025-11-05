"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("orderForm");

  const login = document.getElementById("login");
  const password = document.getElementById("password");
  const confirmPassword = document.getElementById("confirmPassword");
  const age = document.getElementById("age");
  const city = document.getElementById("city");
  const delivery = document.getElementById("delivery");
  const addressLabel = document.getElementById("addressLabel");
  const address = document.getElementById("address");

  delivery.addEventListener("change", () => {
    addressLabel.style.display = delivery.checked ? "block" : "none";
  });

  function showError(input, message) {
    input.classList.add("invalid");
    input.nextElementSibling.textContent = message;
  }

  function clearError(input) {
    input.classList.remove("invalid");
    input.nextElementSibling.textContent = "";
  }

  function validateField() {
    let valid = true;

    if (!login.value || login.value.length < 5 || login.value.length > 20) {
      showError(login, "Логин должен быть от 5 до 20 символов");
      valid = false;
    } else {
      clearError(login);
    }

    if (
      !password.value ||
      password.value.length < 5 ||
      password.value.length > 12
    ) {
      showError(password, "Пароль должен быть от 5 до 12 символов");
      valid = false;
    } else {
      clearError(password);
    }

    if (confirmPassword.value !== password.value) {
      showError(confirmPassword, "Пароли не совпадают");
      valid = false;
    } else {
      clearError(confirmPassword);
    }

    const ageVal = parseInt(age.value);
    if (!age.value) {
      showError(age, "Возраст обязателен");
      valid = false;
    } else if (ageVal < 14) {
      showError(age, "Возраст слишком мал");
      valid = false;
    } else if (ageVal > 120) {
      showError(age, "Возраст слишком велик");
      valid = false;
    } else if (ageVal >= 14 && ageVal <= 18) {
      clearError(age);
      age.nextElementSibling.textContent = "Требуется согласие родителей";
    } else {
      clearError(age);
    }

    if (!city.value) {
      showError(city, "Выберите город");
      valid = false;
    } else {
      clearError(city);
    }

    if (delivery.checked) {
      if (!address.value.trim()) {
        showError(address, "Введите адрес доставки");
        valid = false;
      } else {
        clearError(address);
      }
    }

    return valid;
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (validateField()) {
      alert("Форма успешно отправлена!");
      form.reset();
      addressLabel.style.display = "none";
      age.nextElementSibling.textContent = "";
    }
  });
});
