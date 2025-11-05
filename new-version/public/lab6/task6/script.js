"use strict";

const form = document.getElementById("userForm");
const participateCheckbox = form.querySelector('input[name="participate"]');
const projectDiv = document.getElementById("projectDiv");
const saveBtn = document.getElementById("saveBtn");

let isSaved = false;

participateCheckbox.addEventListener("change", () => {
  projectDiv.style.display = participateCheckbox.checked ? "block" : "none";
  isSaved = false;
});

form.addEventListener("input", () => {
  isSaved = false;
});

function getFormData() {
  const data = {};
  const formData = new FormData(form);
  for (let [key, value] of formData.entries()) {
    data[key] = value;
  }
  data["participate"] = participateCheckbox.checked;
  return data;
}

saveBtn.addEventListener("click", () => {
  const data = getFormData();
  localStorage.setItem("formData", JSON.stringify(data));
  isSaved = true;
  alert("Данные сохранены!");
});

window.addEventListener("beforeunload", (e) => {
  const hasInput = Array.from(form.querySelectorAll("input, select")).some(
    (el) => {
      if (el.type === "radio" || el.type === "checkbox") return el.checked;
      return el.value.trim() !== "";
    }
  );

  if (hasInput && !isSaved) {
    e.preventDefault();
    e.returnValue = "";
  }
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = getFormData();
  localStorage.setItem("submittedData", JSON.stringify(data));
  window.open("result.html", "_blank");
});
