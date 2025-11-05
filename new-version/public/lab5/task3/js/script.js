"use strict";

const grid = document.getElementById("grid");
const colorizeBtn = document.getElementById("colorizeBtn");
const colorTableBody = document.getElementById("colorTableBody");

const colors = [
  { name: "Turquoise", hex: "#1abc9c" },
  { name: "Emerald", hex: "#2ecc71" },
  { name: "Peter River", hex: "#3498db" },
  { name: "Amethyst", hex: "#9b59b6" },
  { name: "Wet Asphalt", hex: "#34495e" },
  { name: "Green Sea", hex: "#16a085" },
  { name: "Nephritis", hex: "#27ae60" },
  { name: "Belize Hole", hex: "#2980b9" },
  { name: "Wisteria", hex: "#8e44ad" },
  { name: "Midnight Blue", hex: "#2c3e50" },
  { name: "Sun Flower", hex: "#f1c40f" },
  { name: "Carrot", hex: "#e67e22" },
  { name: "Alizarin", hex: "#e74c3c" },
  { name: "Clouds", hex: "#ecf0f1" },
  { name: "Concrete", hex: "#95a5a6" },
  { name: "Orange", hex: "#f39c12" },
  { name: "Pumpkin", hex: "#d35400" },
  { name: "Pomegranate", hex: "#c0392b" },
  { name: "Silver", hex: "#bdc3c7" },
  { name: "Asbestos", hex: "#7f8c8d" },
  { name: "White", hex: "#ffffff" },
  { name: "Black", hex: "#000000" },
];

function createGrid() {
  grid.innerHTML = "";
  for (let i = 0; i < 100; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.dataset.color = "#ffffff";
    grid.appendChild(cell);
  }
}

function getRandomColor() {
  const paletteColors = colors.slice(0, -2);
  return paletteColors[Math.floor(Math.random() * paletteColors.length)].hex;
}

function updateColorTable() {
  const colorCounts = colors.reduce((acc, color) => {
    acc[color.hex] = 0;
    return acc;
  }, {});
  document.querySelectorAll(".cell").forEach((cell) => {
    colorCounts[cell.dataset.color]++;
  });

  colorTableBody.innerHTML = "";
  colors.forEach((color) => {
    const row = document.createElement("tr");
    row.innerHTML = `
          <td><span class="color-block" style="background-color: ${
            color.hex
          };"></span></td>
          <td>${colorCounts[color.hex] || 0}</td>
        `;
    colorTableBody.appendChild(row);
  });
}

colorizeBtn.addEventListener("click", () => {
  document.querySelectorAll(".cell").forEach((cell) => {
    const newColor = getRandomColor();
    cell.style.backgroundColor = newColor;
    cell.dataset.color = newColor;
  });
  updateColorTable();
});

grid.addEventListener("mousedown", (e) => {
  if (!e.target.classList.contains("cell")) return;
  const cell = e.target;
  if (e.button === 0) {
    cell.style.backgroundColor = "#ffffff";
    cell.dataset.color = "#ffffff";
  } else if (e.button === 2) {
    cell.style.backgroundColor = "#000000";
    cell.dataset.color = "#000000";
  }
  updateColorTable();
});

grid.addEventListener("contextmenu", (e) => {
  if (e.target.classList.contains("cell")) {
    e.preventDefault();
  }
});

createGrid();
updateColorTable();
