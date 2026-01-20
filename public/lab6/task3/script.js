"use strict";

const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

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

function saveTasks() {
  const tasks = [];
  document.querySelectorAll(".task-item").forEach((item) => {
    const text = item.dataset.text;
    const createdAt = item.dataset.time;
    tasks.push({ text, createdAt });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  const saved = localStorage.getItem("tasks");
  if (!saved) return;
  const tasks = JSON.parse(saved);
  tasks.forEach((task) => addTask(task.text, false, task.createdAt, false)); // append
}

function addTask(text, save = true, createdAt = null, prepend = true) {
  if (!text.trim()) return;

  const time = createdAt || new Date().toISOString();
  const li = document.createElement("li");
  li.classList.add("task-item");
  li.dataset.text = text;
  li.dataset.time = time;
  li.innerHTML = `
    <div class="task-content">
      <strong>${formatDateTime(new Date(time))}</strong>: ${text}
    </div>
    <div class="task-actions">
      <button class="copy-task" data-action="copy">Копировать в буфер</button>
      <button class="delete-task" data-action="delete">Удалить задачу</button>
    </div>
  `;

  if (prepend) {
    taskList.prepend(li);
  } else {
    taskList.appendChild(li);
  }

  taskInput.value = "";
  if (save) saveTasks();
}

async function copyToClipboard(text) {
  if (!text) return false;

  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
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
    } catch {
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
    const taskText = taskItem.dataset.text;
    const success = await copyToClipboard(taskText);
    alert(success ? "Задача скопирована!" : "Ошибка при копировании");
  } else if (action === "delete") {
    e.target.closest(".task-item").remove();
    saveTasks();
  }
});

window.addEventListener("DOMContentLoaded", loadTasks);
