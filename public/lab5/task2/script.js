"use strict";

const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

function formatDateTime() {
  const now = new Date();
  return now.toLocaleString("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

function addTask(text) {
  if (!text.trim()) return;
  const li = document.createElement("li");
  li.classList.add("task-item");
  li.innerHTML = `
    <div class="task-content">
      <strong>${formatDateTime()}</strong>: ${text}
    </div>
    <div class="task-actions">
      <button class="copy-task" data-action="copy">Копировать в буфер</button>
      <button class="delete-task" data-action="delete">Удалить задачу</button>
    </div>
  `;
  taskList.prepend(li);
  taskInput.value = "";
}

async function copyToClipboard(text) {
  if (!text) return false;

  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    const tempInput = document.createElement("textarea");
    tempInput.value = text;
    tempInput.style.position = "fixed";
    tempInput.style.opacity = "0";
    document.body.appendChild(tempInput);
    tempInput.focus();
    tempInput.select();
    try {
      document.execCommand("copy");
      return true;
    } catch (err2) {
      return false;
    } finally {
      document.body.removeChild(tempInput);
    }
  }
}

document.addEventListener("click", async (e) => {
  const action = e.target.dataset.action;
  if (!action) return;

  if (action === "add") {
    addTask(taskInput.value);
  } else if (action === "copy") {
    const taskItem = e.target.closest(".task-item");
    if (!taskItem) return;

    const taskText = taskItem.querySelector(".task-content").textContent.trim();
    const success = await copyToClipboard(taskText);
    alert(
      success ? "Задача скопирована в буфер обмена!" : "Ошибка при копировании"
    );
  } else if (action === "delete") {
    e.target.closest(".task-item").remove();
  }
});
