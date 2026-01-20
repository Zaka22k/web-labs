const API_BASE = "/api/lab10/task2";
const AUTH_API_LOGIN = "/api/lab11/login";

const DAY_NAMES = {
  1: "Понедельник",
  2: "Вторник",
  3: "Среда",
  4: "Четверг",
  5: "Пятница",
  6: "Суббота",
  7: "Воскресенье",
};

let references = {};

function checkAdminAuthAndRender() {
  const token = localStorage.getItem("lab102_token");
  const userJson = localStorage.getItem("lab102_user");

  const loginForm = document.getElementById("loginForm");
  const loggedInContainer = document.getElementById("loggedInContainer");
  const crudLink = document.getElementById("crudLink");

  if (!loginForm || !loggedInContainer || !crudLink) {
    console.warn("Не найдены элементы формы/контейнера авторизации.");
    return;
  }

  let user = null;
  try {
    user = userJson ? JSON.parse(userJson) : null;
  } catch (e) {
    console.error("Ошибка парсинга lab11_user из localStorage:", e);
  }

  const isAuthenticated = !!(token && user);
  const isAdmin = isAuthenticated && user.role === "admin";

  if (isAuthenticated) {
    loginForm.classList.add("hidden");
    loggedInContainer.classList.remove("hidden");
    document.getElementById("loggedInUsername").textContent = user.login;

    if (isAdmin) {
      crudLink.classList.remove("hidden");
    } else {
      crudLink.classList.add("hidden");
    }
  } else {
    loginForm.classList.remove("hidden");
    loggedInContainer.classList.add("hidden");
    crudLink.classList.add("hidden");
  }
}

async function login(event) {
  event.preventDefault();

  const username = document.getElementById("loginUsername").value;
  const password = document.getElementById("loginPassword").value;

  try {
    const res = await fetch(AUTH_API_LOGIN, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ login: username, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || "Ошибка входа");
    }

    localStorage.setItem("lab102_token", data.token);
    localStorage.setItem(
      "lab102_user",
      JSON.stringify({
        id: data.user.id,
        login: data.user.login,
        role: data.user.role,
      })
    );

    alert(`Успешный вход! Роль: ${data.user.role}`);
    location.reload();
  } catch (error) {
    console.error("Ошибка аутентификации:", error);
    alert(`Не удалось войти: ${error.message}`);
  }
}

function logout() {
  localStorage.removeItem("lab102_token");
  localStorage.removeItem("lab102_user");
  alert("Вы вышли из системы.");
  location.reload();
}

async function loadReferences() {
  try {
    const res = await fetch(`${API_BASE}/references`);
    if (!res.ok) throw new Error("Ошибка при загрузке справочников");

    references = await res.json();

    fillSelect(
      "group",
      references.groups,
      "name",
      "name",
      (g) => g.course == document.getElementById("course").value
    );
    fillSelect("teacher", references.teachers, "full_name", "id");
    fillSelect(
      "subject",
      references.subjects,
      (n) => n,
      (n) => n
    );
    fillSelect("classroom", references.classrooms, "name", "number");
    fillSelect(
      "type",
      references.lessonTypes,
      (n) => n,
      (n) => n
    );

    loadSchedule();
  } catch (e) {
    console.error("Ошибка загрузки справочников:", e);
    const output = document.getElementById("schedule-output");
    if (output) {
      output.innerHTML =
        '<p class="error-message">Не удалось загрузить данные справочников.</p>';
    }
  }
}

function fillSelect(selectId, data, labelFn, valueFn, filterFn = () => true) {
  const select = document.getElementById(selectId);
  if (!select || !data) return;

  const initialOption = select.querySelector('option[value=""]');
  select.innerHTML = "";
  if (initialOption) {
    select.appendChild(initialOption.cloneNode(true));
  }

  const filteredData = data.filter(filterFn);

  filteredData.forEach((item) => {
    const option = document.createElement("option");
    const label = typeof labelFn === "function" ? labelFn(item) : item[labelFn];
    const value = typeof valueFn === "function" ? valueFn(item) : item[valueFn];

    option.value = value;
    option.textContent = label;
    select.appendChild(option);
  });
}

async function loadSchedule() {
  const outputDiv = document.getElementById("schedule-output");
  if (!outputDiv) return;

  const course = document.getElementById("course").value;
  const selectedGroup = document.getElementById("group").value;

  fillSelect(
    "group",
    references.groups,
    "name",
    "name",
    (g) => g.course == course
  );

  const groupSelect = document.getElementById("group");
  if (
    selectedGroup &&
    Array.from(groupSelect.options).some((opt) => opt.value === selectedGroup)
  ) {
    groupSelect.value = selectedGroup;
  } else {
    groupSelect.value = "";
  }

  const filters = {
    course: course,
    group: document.getElementById("group").value,
    day: document.getElementById("day").value,
    teacher: document.getElementById("teacher").value,
    subject: document.getElementById("subject").value,
    type: document.getElementById("type").value,
    classroom: document.getElementById("classroom").value,
  };

  const params = new URLSearchParams();
  Object.keys(filters).forEach((key) => {
    if (filters[key]) {
      params.append(key, filters[key]);
    }
  });

  outputDiv.innerHTML = '<p class="loading-message">Загрузка расписания...</p>';

  try {
    const res = await fetch(`${API_BASE}/schedule?${params.toString()}`);
    const result = await res.json();
    const schedule = result.schedule || [];

    renderSchedule(schedule);
  } catch (e) {
    console.error("Ошибка загрузки расписания:", e);
    outputDiv.innerHTML =
      '<p class="error-message">Не удалось загрузить расписание.</p>';
  }
}

function renderSchedule(schedule) {
  const outputDiv = document.getElementById("schedule-output");
  outputDiv.innerHTML = "";

  if (schedule.length === 0) {
    outputDiv.innerHTML =
      '<p class="empty-message">Занятий по выбранным фильтрам не найдено.</p>';
    return;
  }

  let currentDay = null;
  let html = "";

  schedule.forEach((lesson) => {
    if (lesson.day_of_week !== currentDay) {
      if (currentDay !== null) {
        html += `</div></div>`;
      }
      currentDay = lesson.day_of_week;
      html += `
        <div class="day-section">
            <div class="day-header">${DAY_NAMES[currentDay]}</div>
            <div class="lessons-list">`;
    }

    const timeStart = lesson.start_time.slice(0, 5);
    const timeEnd = lesson.end_time.slice(0, 5);
    const typeClass = `lesson-type-${lesson.lesson_type.toLowerCase()}`;

    html += `
        <div class="lesson-card">
            <div class="time-block">
                ${timeStart} – ${timeEnd}
            </div>
            <div class="info-block">
                <h4>${lesson.subject_name}</h4>
                <p>Группа: <strong>${lesson.group_name}</strong></p>
                <p>Преподаватель: ${lesson.teacher_full_name}</p>
                <p>Аудитория: <strong>${lesson.classroom_number}</strong> (${lesson.building_name})</p>
            </div>
            <div class="type-info">
                <span class="badge ${typeClass}">${lesson.lesson_type}</span>
            </div>
        </div>
    `;
  });

  html += "</div></div>";
  outputDiv.innerHTML = html;
}

document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");
  const logoutButton = document.getElementById("logoutButton");
  const courseSelect = document.getElementById("course");

  if (loginForm) {
    loginForm.addEventListener("submit", login);
  }
  if (logoutButton) {
    logoutButton.addEventListener("click", logout);
  }

  if (courseSelect) {
    courseSelect.addEventListener("change", loadSchedule);
  }

  const selectors = ["group", "day", "teacher", "subject", "type", "classroom"];
  selectors.forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.addEventListener("change", loadSchedule);
  });

  checkAdminAuthAndRender();
  loadReferences();
});
