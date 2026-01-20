const API_BASE = "/api/lab10/task2/crud";

const DAY_NAMES = {
  1: "Пн",
  2: "Вт",
  3: "Ср",
  4: "Чт",
  5: "Пт",
  6: "Сб",
  7: "Вс",
};
let allReferences = {};

function getDayName(dayIndex) {
  return DAY_NAMES[dayIndex] || "НД";
}

function escapeQuote(str) {
  return (str || "").toString().replace(/'/g, "\\'");
}

function fillSelect(selectId, data, labelKey, valueKey) {
  const select = document.getElementById(selectId);
  if (!select) return;

  const initialOption =
    select.options.length > 0 ? select.options[0].cloneNode(true) : null;
  select.innerHTML = "";

  if (initialOption && initialOption.value === "") {
    select.appendChild(initialOption);
  }

  data.forEach((item) => {
    const option = document.createElement("option");
    const value = valueKey && typeof item === "object" ? item[valueKey] : item;
    const label = labelKey && typeof item === "object" ? item[labelKey] : item;

    option.value = value;
    option.textContent = label;
    select.appendChild(option);
  });
}

function resetForm(type) {
  const formId = `${type}-form`;
  const submitBtnId = `${type}-submit`;
  const cancelBtnId = `${type}-cancel`;

  document.getElementById(formId).reset();
  const idInput = document.getElementById(`${type}-id`);
  if (idInput) idInput.value = "";
  document.getElementById(submitBtnId).textContent = "Создать";
  document.getElementById(cancelBtnId).style.display = "none";

  const loadFunction =
    window[`load${type.charAt(0).toUpperCase() + type.slice(1)}`];
  if (loadFunction) loadFunction();
}
window.resetForm = resetForm;

async function fetchCrud(url, method = "GET", data = null) {
  const options = {
    method: method,
    headers: {},
  };

  if (method === "POST" || method === "PUT") {
    options.headers["Content-Type"] = "application/json";

    const cleanData = {};
    for (const key in data) {
      const val = data[key];
      if (val === undefined || val === null || val === "") continue;

      if (
        key.endsWith("_id") ||
        key === "course" ||
        key === "day_of_week" ||
        key === "capacity"
      ) {
        cleanData[key] = parseInt(val);
        if (isNaN(cleanData[key])) {
          throw new Error(`Недопустимое значение для числового поля: ${key}`);
        }
      } else {
        cleanData[key] = val;
      }
    }
    options.body = JSON.stringify(cleanData);
  }

  try {
    const response = await fetch(url, options);
    const result = await response.json();

    if (!response.ok) {
      alert("Ошибка: " + (result.details || `Статус: ${response.status}`));
      throw new Error(
        result.details || `Ошибка ${method} ${url}: ${response.status}`
      );
    }
    return result;
  } catch (error) {
    console.error("CRUD Error:", error);
    return null;
  }
}

async function deleteItem(table, id) {
  if (
    !confirm(
      `Вы уверены, что хотите удалить запись ID ${id} из ${table}? Это может вызвать ошибки целостности данных.`
    )
  )
    return;
  const result = await fetchCrud(`${API_BASE}/${table}/${id}`, "DELETE");
  if (result) {
    const loadFunctionName = `load${
      table.charAt(0).toUpperCase() + table.slice(1)
    }`;
    const loadFunction = window[loadFunctionName];

    if (loadFunction) {
      loadFunction();
    }

    if (table !== "schedule") {
      loadAllReferences();
    }
  }
}
window.deleteItem = deleteItem;

function renderCrudList(table, data, headers, keys, editFnName) {
  const listDiv = document.getElementById(`${table}-list`);
  if (data.length === 0) {
    listDiv.innerHTML = `<p>Нет созданных записей в ${table}.</p>`;
    return;
  }

  const headerRow = headers.map((h) => `<th>${h}</th>`).join("");

  const bodyRows = data
    .map((item) => {
      const cellData = keys
        .map((key) => `<td>${item[key] || ""}</td>`)
        .join("");

      let editArgs;
      if (table === "groups") {
        editArgs = `${item.id}, '${escapeQuote(item.name)}', ${item.course}`;
      } else if (table === "persons") {
        const middleName = item.middle_name
          ? `'${escapeQuote(item.middle_name)}'`
          : "null";
        const email = item.email ? `'${escapeQuote(item.email)}'` : "null";
        editArgs = `${item.id}, '${escapeQuote(
          item.last_name
        )}', '${escapeQuote(item.first_name)}', ${middleName}, ${email}`;
      } else if (["classrooms", "teachers", "schedule"].includes(table)) {
        editArgs = `${item.id}`;
      } else {
        editArgs = `${item.id}, '${escapeQuote(item.name)}'`;
      }

      return `
            <tr data-id="${item.id}">
                ${cellData}
                <td class="actions">
                    <button class="btn-edit" onclick="${editFnName}(${editArgs})">Редактировать</button>
                    <button class="btn-danger" onclick="deleteItem('${table}', ${item.id})">Удалить</button>
                </td>
            </tr>
        `;
    })
    .join("");

  listDiv.innerHTML = `<table><thead><tr>${headerRow}<th>Действия</th></tr></thead><tbody>${bodyRows}</tbody></table>`;
}

const simpleTables = [
  {
    name: "departments",
    headers: ["ID", "Название"],
    keys: ["id", "name"],
    editableKeys: ["name"],
  },
  {
    name: "positions",
    headers: ["ID", "Название"],
    keys: ["id", "name"],
    editableKeys: ["name"],
  },
  {
    name: "buildings",
    headers: ["ID", "Название"],
    keys: ["id", "name"],
    editableKeys: ["name"],
  },
  {
    name: "subjects",
    headers: ["ID", "Название"],
    keys: ["id", "name"],
    editableKeys: ["name"],
  },
];

async function handleSimpleSubmit(e, table, editableKeys) {
  e.preventDefault();
  const id = document.getElementById(`${table}-id`).value;
  const data = {};

  editableKeys.forEach((key) => {
    data[key] = document.getElementById(`${table}-${key}`).value;
  });

  let result;
  if (id) {
    result = await fetchCrud(`${API_BASE}/${table}/${id}`, "PUT", data);
  } else {
    result = await fetchCrud(`${API_BASE}/${table}`, "POST", data);
  }

  if (result) {
    resetForm(table);
    window[`load${table.charAt(0).toUpperCase() + table.slice(1)}`]();
    loadAllReferences();
  }
}

simpleTables.forEach((config) => {
  const tableName = config.name;
  const capName = tableName.charAt(0).toUpperCase() + tableName.slice(1);
  const form = document.getElementById(`${tableName}-form`);

  if (form) {
    form.addEventListener("submit", (e) =>
      handleSimpleSubmit(e, tableName, config.editableKeys)
    );

    window[`load${capName}`] = async function () {
      const data = await fetchCrud(`${API_BASE}/${tableName}`);
      if (data) {
        window[`edit${capName}`] = function (id, name) {
          document.getElementById(`${tableName}-id`).value = id;
          document.getElementById(`${tableName}-name`).value = name;
          document.getElementById(`${tableName}-submit`).textContent =
            "Сохранить изменения";
          document.getElementById(`${tableName}-cancel`).style.display =
            "inline-block";
        };
        renderCrudList(
          tableName,
          data,
          config.headers,
          config.keys,
          `edit${capName}`
        );
      }
    };
  }
});

const groupConfig = {
  headers: ["ID", "Название", "Курс"],
  keys: ["id", "name", "course"],
  editFnName: "editGroup",
};

async function loadGroups() {
  const groupsList = await fetchCrud(`${API_BASE}/groups`);
  if (!groupsList) return;
  renderCrudList(
    "groups",
    groupsList,
    groupConfig.headers,
    groupConfig.keys,
    groupConfig.editFnName
  );
}
window.loadGroups = loadGroups;

function editGroup(id, name, course) {
  document.getElementById("groups-id").value = id;
  document.getElementById("groups-name").value = name;
  document.getElementById("groups-course").value = course;
  document.getElementById("groups-submit").textContent = "Сохранить изменения";
  document.getElementById("groups-cancel").style.display = "inline-block";
}
window.editGroup = editGroup;

async function handleGroupSubmit(e) {
  e.preventDefault();
  const id = document.getElementById("groups-id").value;
  const name = document.getElementById("groups-name").value;
  const course = document.getElementById("groups-course").value;

  const data = { name, course };
  let result;

  if (id) {
    result = await fetchCrud(`${API_BASE}/groups/${id}`, "PUT", data);
  } else {
    result = await fetchCrud(`${API_BASE}/groups`, "POST", data);
  }

  if (result) {
    resetForm("groups");
    loadGroups();
    loadAllReferences();
  }
}
const groupForm = document.getElementById("groups-form");
if (groupForm) groupForm.addEventListener("submit", handleGroupSubmit);

const personConfig = {
  headers: ["ID", "Фамилия", "Имя", "Отчество", "Email"],
  keys: ["id", "last_name", "first_name", "middle_name", "email"],
  editFnName: "editPerson",
};

async function loadPersons() {
  const personsList = await fetchCrud(`${API_BASE}/persons`);
  if (!personsList) return;
  renderCrudList(
    "persons",
    personsList,
    personConfig.headers,
    personConfig.keys,
    personConfig.editFnName
  );
}
window.loadPersons = loadPersons;

function editPerson(id, last_name, first_name, middle_name, email) {
  document.getElementById("persons-id").value = id;
  document.getElementById("persons-last_name").value = last_name;
  document.getElementById("persons-first_name").value = first_name;
  document.getElementById("persons-middle_name").value =
    middle_name === "null" ? "" : middle_name;
  document.getElementById("persons-email").value =
    email === "null" ? "" : email;
  document.getElementById("persons-submit").textContent = "Сохранить изменения";
  document.getElementById("persons-cancel").style.display = "inline-block";
}
window.editPerson = editPerson;

async function handlePersonSubmit(e) {
  e.preventDefault();
  const id = document.getElementById("persons-id").value;
  const data = {
    last_name: document.getElementById("persons-last_name").value,
    first_name: document.getElementById("persons-first_name").value,
    middle_name: document.getElementById("persons-middle_name").value,
    email: document.getElementById("persons-email").value,
  };

  let result;
  if (id) {
    result = await fetchCrud(`${API_BASE}/persons/${id}`, "PUT", data);
  } else {
    result = await fetchCrud(`${API_BASE}/persons`, "POST", data);
  }

  if (result) {
    resetForm("persons");
    loadPersons();
    loadAllReferences();
  }
}
const personForm = document.getElementById("persons-form");
if (personForm) personForm.addEventListener("submit", handlePersonSubmit);

const classroomForm = document.getElementById("classrooms-form");
if (classroomForm)
  classroomForm.addEventListener("submit", handleClassroomSubmit);

const classroomConfig = {
  headers: ["ID", "Номер", "Корпус", "Вместимость"],
  keys: ["id", "number", "building_name", "capacity"],
  editFnName: "editClassroom",
};

async function loadClassrooms() {
  const classroomsList = await fetchCrud(`${API_BASE}/classrooms`);
  if (!classroomsList) return;

  const enrichedList = classroomsList.map((c) => ({
    ...c,
    building_name:
      (allReferences.buildings.find((b) => b.id === c.building_id) || {})
        .name || `ID ${c.building_id}`,
  }));

  renderCrudList(
    "classrooms",
    enrichedList,
    classroomConfig.headers,
    classroomConfig.keys,
    classroomConfig.editFnName
  );
}
window.loadClassrooms = loadClassrooms;

function editClassroom(id) {
  fetchCrud(`${API_BASE}/classrooms/${id}`).then((entry) => {
    if (!entry) return;
    document.getElementById("classrooms-id").value = id;
    document.getElementById("classrooms-number").value = entry.number;
    document.getElementById("classrooms-building_id").value = entry.building_id;
    document.getElementById("classrooms-capacity").value = entry.capacity;
    document.getElementById("classrooms-submit").textContent =
      "Сохранить изменения";
    document.getElementById("classrooms-cancel").style.display = "inline-block";
    showTab("classrooms");
  });
}
window.editClassroom = editClassroom;

async function handleClassroomSubmit(e) {
  e.preventDefault();
  const id = document.getElementById("classrooms-id").value;
  const data = {
    number: document.getElementById("classrooms-number").value,
    building_id: document.getElementById("classrooms-building_id").value,
    capacity: document.getElementById("classrooms-capacity").value,
  };

  let result;
  if (id) {
    result = await fetchCrud(`${API_BASE}/classrooms/${id}`, "PUT", data);
  } else {
    result = await fetchCrud(`${API_BASE}/classrooms`, "POST", data);
  }

  if (result) {
    resetForm("classrooms");
    loadClassrooms();
    loadAllReferences();
  }
}

const teacherForm = document.getElementById("teachers-form");
if (teacherForm) teacherForm.addEventListener("submit", handleTeacherSubmit);

const teacherConfig = {
  headers: ["ID", "Физ. лицо", "Кафедра", "Должность"],
  keys: ["id", "person_name", "department_name", "position_name"],
  editFnName: "editTeacher",
};

async function loadTeachers() {
  const teachersList = await fetchCrud(`${API_BASE}/teachers`);
  if (!teachersList) return;

  const enrichedList = teachersList.map((t) => {
    const person =
      allReferences.persons.find((p) => p.id === t.person_id) || {};
    const department =
      allReferences.departments.find((d) => d.id === t.department_id) || {};
    const position =
      allReferences.positions.find((p) => p.id === t.position_id) || {};

    return {
      ...t,
      person_name: `${person.last_name || ""} ${person.first_name || ""}`,
      department_name: department.name || `ID ${t.department_id}`,
      position_name: position.name || `ID ${t.position_id}`,
    };
  });

  renderCrudList(
    "teachers",
    enrichedList,
    teacherConfig.headers,
    teacherConfig.keys,
    teacherConfig.editFnName
  );
}
window.loadTeachers = loadTeachers;

function editTeacher(id) {
  fetchCrud(`${API_BASE}/teachers/${id}`).then((entry) => {
    if (!entry) return;
    document.getElementById("teachers-id").value = id;
    document.getElementById("teachers-person_id").value = entry.person_id;
    document.getElementById("teachers-department_id").value =
      entry.department_id;
    document.getElementById("teachers-position_id").value = entry.position_id;
    document.getElementById("teachers-submit").textContent =
      "Сохранить изменения";
    document.getElementById("teachers-cancel").style.display = "inline-block";
    showTab("teachers");
  });
}
window.editTeacher = editTeacher;

async function handleTeacherSubmit(e) {
  e.preventDefault();
  const id = document.getElementById("teachers-id").value;
  const data = {
    person_id: document.getElementById("teachers-person_id").value,
    department_id: document.getElementById("teachers-department_id").value,
    position_id: document.getElementById("teachers-position_id").value,
  };

  let result;
  if (id) {
    result = await fetchCrud(`${API_BASE}/teachers/${id}`, "PUT", data);
  } else {
    result = await fetchCrud(`${API_BASE}/teachers`, "POST", data);
  }

  if (result) {
    resetForm("teachers");
    loadTeachers();
    loadAllReferences();
  }
}

const scheduleForm = document.getElementById("schedule-form");
if (scheduleForm) scheduleForm.addEventListener("submit", handleScheduleSubmit);

async function loadScheduleList() {
  const scheduleData = await fetchCrud("/api/lab10/task2/schedule?course=4");
  if (!scheduleData) return;

  const schedule = scheduleData.schedule || [];
  const listDiv = document.getElementById("schedule-list");

  if (schedule.length === 0) {
    listDiv.innerHTML = "<p>Нет записей расписания (для 4 курса).</p>";
    return;
  }

  listDiv.innerHTML =
    "<table>" +
    "<thead><tr><th>ID</th><th>День</th><th>Время</th><th>Группа</th><th>Дисциплина</th><th>Преп.</th><th>Ауд.</th><th>Тип</th><th>Действия</th></tr></thead>" +
    "<tbody>" +
    schedule
      .map(
        (s) => `
            <tr data-id="${s.id}">
                <td>${s.id}</td>
                <td>${getDayName(s.day_of_week)}</td>
                <td>${s.start_time.slice(0, 5)}–${s.end_time.slice(0, 5)}</td>
                <td>${s.group_name}</td>
                <td>${s.subject_name}</td>
                <td>${s.teacher_full_name}</td>
                <td>${s.classroom_number}</td>
                <td><span class="badge lesson-type-${s.lesson_type.toLowerCase()}">${
          s.lesson_type
        }</span></td>
                <td class="actions">
                    <button class="btn-edit" onclick="editSchedule(${
                      s.id
                    })">Редактировать</button>
                    <button class="btn-danger" onclick="deleteItem('schedule', ${
                      s.id
                    })">Удалить</button>
                </td>
            </tr>
        `
      )
      .join("") +
    "</tbody></table>";
}
window.loadScheduleList = loadScheduleList;

async function editSchedule(id) {
  const entry = await fetchCrud(`${API_BASE}/schedule/${id}`);
  if (!entry) return;

  document.getElementById("schedule-id").value = id;
  document.getElementById("schedule-teacher").value = entry.teacher_id;
  document.getElementById("schedule-group").value = entry.group_id;
  document.getElementById("schedule-subject").value = entry.subject_id;
  document.getElementById("schedule-classroom").value = entry.classroom_id;
  document.getElementById("schedule-day").value = entry.day_of_week;
  document.getElementById("schedule-type").value = entry.lesson_type;
  document.getElementById("schedule-start").value = entry.start_time.slice(
    0,
    5
  );
  document.getElementById("schedule-end").value = entry.end_time.slice(0, 5);

  document.getElementById("schedule-submit").textContent =
    "Сохранить изменения";
  document.getElementById("schedule-cancel").style.display = "inline-block";
  showTab("schedule");
}
window.editSchedule = editSchedule;

async function handleScheduleSubmit(e) {
  e.preventDefault();
  const id = document.getElementById("schedule-id").value;

  const data = {
    teacher_id: document.getElementById("schedule-teacher").value,
    group_id: document.getElementById("schedule-group").value,
    subject_id: document.getElementById("schedule-subject").value,
    classroom_id: document.getElementById("schedule-classroom").value,
    day_of_week: document.getElementById("schedule-day").value,
    lesson_type: document.getElementById("schedule-type").value,
    start_time: document.getElementById("schedule-start").value,
    end_time: document.getElementById("schedule-end").value,
  };

  let result;
  if (id) {
    result = await fetchCrud(`${API_BASE}/schedule/${id}`, "PUT", data);
  } else {
    result = await fetchCrud(`${API_BASE}/schedule`, "POST", data);
  }

  if (result) {
    resetForm("schedule");
    loadScheduleList();
  }
}

async function loadAllReferences() {
  allReferences.groups = (await fetchCrud(`${API_BASE}/groups`)) || [];
  allReferences.subjects = (await fetchCrud(`${API_BASE}/subjects`)) || [];
  allReferences.classrooms = (await fetchCrud(`${API_BASE}/classrooms`)) || [];
  allReferences.teachers = (await fetchCrud(`${API_BASE}/teachers`)) || [];
  allReferences.persons = (await fetchCrud(`${API_BASE}/persons`)) || [];
  allReferences.departments =
    (await fetchCrud(`${API_BASE}/departments`)) || [];
  allReferences.positions = (await fetchCrud(`${API_BASE}/positions`)) || [];
  allReferences.buildings = (await fetchCrud(`${API_BASE}/buildings`)) || [];

  const formattedTeachers = allReferences.teachers.map((t) => {
    const p = allReferences.persons.find((p) => p.id === t.person_id) || {};
    return { id: t.id, name: `${p.last_name || ""} ${p.first_name || ""}` };
  });
  const formattedGroups = allReferences.groups.map((g) => ({
    id: g.id,
    name: `${g.name} (${g.course} курс)`,
  }));
  const formattedSubjects = allReferences.subjects.map((s) => ({
    id: s.id,
    name: s.name,
  }));
  const formattedClassrooms = allReferences.classrooms.map((c) => {
    const b = allReferences.buildings.find((b) => b.id === c.building_id) || {};
    return { id: c.id, name: `${c.number} (${b.name || "НД"})` };
  });

  fillSelect("schedule-teacher", formattedTeachers, "name", "id");
  fillSelect("schedule-group", formattedGroups, "name", "id");
  fillSelect("schedule-subject", formattedSubjects, "name", "id");
  fillSelect("schedule-classroom", formattedClassrooms, "name", "id");

  fillSelect("classrooms-building_id", allReferences.buildings, "name", "id");

  const formattedPersons = allReferences.persons.map((p) => ({
    id: p.id,
    name: `${p.last_name} ${p.first_name}`,
  }));
  fillSelect("teachers-person_id", formattedPersons, "name", "id");
  fillSelect("teachers-department_id", allReferences.departments, "name", "id");
  fillSelect("teachers-position_id", allReferences.positions, "name", "id");

  loadClassrooms();
  loadTeachers();
}
window.loadAllReferences = loadAllReferences;

document.addEventListener("DOMContentLoaded", () => {
  loadDepartments();
  loadPositions();
  loadBuildings();
  loadSubjects();
  loadPersons();
  loadGroups();

  loadAllReferences();
  loadScheduleList();
});
