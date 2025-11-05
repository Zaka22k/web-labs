const form = document.getElementById("registrationForm");
form.addEventListener("submit", (e) => {
  if (!form.checkValidity()) {
    e.preventDefault();
    form.reportValidity();
  } else {
    alert("Форма успешно отправлена!");
  }
});
