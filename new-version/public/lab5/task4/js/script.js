"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const lastNameInput = document.getElementById("lastName");
  const firstNameInput = document.getElementById("firstName");
  const ageInput = document.getElementById("age");
  const phoneInput = document.getElementById("phone");
  const addBtn = document.getElementById("addBtn");

  const tableBody = document.querySelector("#contactsTable tbody");

  const filterLastName = document.getElementById("filterLastName");
  const filterFirstName = document.getElementById("filterFirstName");
  const filterAge = document.getElementById("filterAge");
  const filterPhone = document.getElementById("filterPhone");
  const filterBtn = document.getElementById("filterBtn");

  function createRow(lastName, firstName, age, phone) {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${lastName}</td>
      <td>${firstName}</td>
      <td>${age}</td>
      <td>${phone}</td>
    `;
    return tr;
  }

  function validateContact() {
    let valid = true;

    if (!lastNameInput.value.trim()) {
      lastNameInput.classList.add("invalid");
      valid = false;
    } else {
      lastNameInput.classList.remove("invalid");
    }

    if (!firstNameInput.value.trim()) {
      firstNameInput.classList.add("invalid");
      valid = false;
    } else {
      firstNameInput.classList.remove("invalid");
    }

    const age = ageInput.value.trim();
    if (!age || isNaN(age) || age < 0 || age > 120) {
      ageInput.classList.add("invalid");
      valid = false;
    } else {
      ageInput.classList.remove("invalid");
    }

    const phone = phoneInput.value.trim();
    if (!phone || !/^\d{5,}$/.test(phone)) {
      phoneInput.classList.add("invalid");
      valid = false;
    } else {
      phoneInput.classList.remove("invalid");
    }

    return valid;
  }

  addBtn.addEventListener("click", () => {
    if (!validateContact()) return;

    const row = createRow(
      lastNameInput.value.trim(),
      firstNameInput.value.trim(),
      ageInput.value.trim(),
      phoneInput.value.trim()
    );

    tableBody.appendChild(row);

    lastNameInput.value = "";
    firstNameInput.value = "";
    ageInput.value = "";
    phoneInput.value = "";
  });

  filterBtn.addEventListener("click", () => {
    const lastNameFilter = filterLastName.value.trim().toLowerCase();
    const firstNameFilter = filterFirstName.value.trim().toLowerCase();
    const ageFilter = filterAge.value.trim();
    const phoneFilter = filterPhone.value.trim();

    const rows = tableBody.querySelectorAll("tr");
    rows.forEach((row) => {
      const cells = row.querySelectorAll("td");
      const lastName = cells[0].textContent.toLowerCase();
      const firstName = cells[1].textContent.toLowerCase();
      const age = cells[2].textContent;
      const phone = cells[3].textContent;

      const match =
        lastName.includes(lastNameFilter) &&
        firstName.includes(firstNameFilter) &&
        age.includes(ageFilter) &&
        phone.includes(phoneFilter);

      row.style.display = match ? "" : "none";
    });
  });
});
