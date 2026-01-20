"use strict";

const historyList = document.getElementById("historyList");
const clearBtn = document.getElementById("clearBtn");

function formatDateTime(date = new Date()) {
  return date.toLocaleString("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

function loadHistory() {
  const saved = localStorage.getItem("visitHistory");
  if (!saved) return [];
  return JSON.parse(saved);
}

function saveHistory(history) {
  localStorage.setItem("visitHistory", JSON.stringify(history));
}

function addVisit() {
  const history = loadHistory();
  const now = new Date();
  history.push({ time: now.toISOString() });
  saveHistory(history);
  renderHistory();
}

function renderHistory() {
  const history = loadHistory();
  historyList.innerHTML = "";
  const lastFive = history.slice(-5).reverse();
  lastFive.forEach((entry) => {
    const li = document.createElement("li");
    li.textContent = formatDateTime(new Date(entry.time));
    historyList.appendChild(li);
  });
}

clearBtn.addEventListener("click", () => {
  localStorage.removeItem("visitHistory");
  renderHistory();
});

window.addEventListener("DOMContentLoaded", () => {
  addVisit();
});
