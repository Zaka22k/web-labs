"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const rowsInput = document.getElementById("rows");
  const colsInput = document.getElementById("cols");
  const createBtn = document.getElementById("createTable");
  const tableContainer = document.getElementById("tableContainer");

  const modal = document.getElementById("modal");
  const cellInfo = document.getElementById("cellInfo");
  const closeModal = document.getElementById("closeModal");

  createBtn.addEventListener("click", () => {
    const rows = parseInt(rowsInput.value);
    const cols = parseInt(colsInput.value);

    if (
      isNaN(rows) ||
      rows < 1 ||
      rows > 20 ||
      isNaN(cols) ||
      cols < 1 ||
      cols > 20
    ) {
      alert("Пожалуйста, введите числа от 1 до 20");
      return;
    }

    generateTable(rows, cols);
  });

  function generateTable(rows, cols) {
    tableContainer.innerHTML = "";
    const table = document.createElement("table");

    for (let r = 1; r <= rows; r++) {
      const tr = document.createElement("tr");
      for (let c = 1; c <= cols; c++) {
        const td = document.createElement("td");
        td.textContent = r * c;

        td.addEventListener("click", () => {
          cellInfo.innerHTML = `<strong>Множитель 1:</strong> ${r}<br>
                                <strong>Множитель 2:</strong> ${c}<br>
                                <strong>Результат:</strong> ${r * c}`;
          modal.style.display = "block";
        });

        tr.appendChild(td);
      }
      table.appendChild(tr);
    }
    tableContainer.appendChild(table);
  }

  closeModal.addEventListener("click", () => {
    modal.style.display = "none";
  });

  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });

  generateTable(10, 10);
});
