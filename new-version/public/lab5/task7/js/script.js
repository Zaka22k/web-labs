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

    if (isNaN(rows) || rows < 1 || rows > 20) {
      alert("Введите корректное количество строк (1–20)");
      return;
    }
    if (isNaN(cols) || cols < 1 || cols > 20) {
      alert("Введите корректное количество столбцов (1–20)");
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
        td.dataset.row = r;
        td.dataset.col = c;

        td.addEventListener("click", (e) => {
          cellInfo.textContent = `Строка: ${r}, Столбец: ${c}, Результат: ${
            r * c
          }`;
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
    if (e.target === modal) modal.style.display = "none";
  });
});
