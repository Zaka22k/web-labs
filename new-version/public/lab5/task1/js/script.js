"use strict";

const modal = document.getElementById("modal");
const modalOverlay = document.getElementById("modalOverlay");
const modalContent = document.getElementById("modalContent");
const emailInput = document.getElementById("emailInput");
const emailError = document.getElementById("emailError");
const result = document.getElementById("result");

setTimeout(() => {
  modal.style.display = "flex";
  modalOverlay.style.display = "block";
}, 7000);

function validateEmail() {
  emailInput.setCustomValidity("");
  if (emailInput.validity.valueMissing) {
    emailInput.setCustomValidity("Введите email.");
  } else if (emailInput.validity.typeMismatch) {
    emailInput.setCustomValidity("Похоже, это не email.");
  }
  emailError.textContent = emailInput.validationMessage;
  return emailInput.checkValidity();
}

function closeModal() {
  modal.style.display = "none";
  modalOverlay.style.display = "none";
}

modal.addEventListener("click", (e) => {
  const action = e.target.dataset.action;
  if (!action) return;

  if (action === "subscribe") {
    if (validateEmail()) {
      const email = emailInput.value;
      modalContent.innerHTML = `<p>Спасибо за подписку! На Ваш адрес ${email} будет направлено письмо</p>`;
      result.textContent = `Подписка выполнена на ${email}`;
      setTimeout(closeModal, 10000);
    } else {
      emailInput.focus();
    }
  } else if (action === "close") {
    closeModal();
    result.textContent = "Подписка не выполнена";
  }
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modal.style.display === "flex") {
    closeModal();
    result.textContent = "Подписка не выполнена";
  }
});

emailInput.addEventListener("input", validateEmail);
