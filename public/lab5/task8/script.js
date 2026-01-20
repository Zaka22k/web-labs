"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("registrationForm");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (!form.checkValidity()) {
      form.reportValidity();

      const firstInvalid = form.querySelector(":invalid");
      if (firstInvalid) firstInvalid.focus();
    } else {
      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries());

      console.log("Данные формы:", data);
      alert("Регистрация успешно завершена!");
    }
  });
});
