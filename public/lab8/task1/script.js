const API_BASE = "/api/lab8/task1";
const form = document.getElementById("userForm");
const projectCheck = document.getElementById("projectCheck");
const projectNameGroup = document.getElementById("projectNameGroup");
const recordsList = document.getElementById("recordsList");

projectCheck.addEventListener("change", () => {
  projectNameGroup.classList.toggle("hidden", !projectCheck.checked);
  projectNameGroup.querySelector("input").required = projectCheck.checked;
});

async function loadRecords() {
  try {
    const res = await fetch(`${API_BASE}/records`);
    const records = await res.json();
    recordsList.innerHTML = records
      .map(
        (r) => `
          <div class="record">
            <strong>ID: ${r.id}</strong><br>
            Инициалы: ${r.lastname} ${r.firstnameLetter}.${r.surnameLetter}.<br>
            Проект: ${r.projectParticipant || "—"} 
            ${r.projectName ? `<em>(${r.projectName})</em>` : ""}
          </div>
        `
      )
      .join("");
  } catch (err) {
    recordsList.innerHTML = "<p>Ошибка загрузки данных</p>";
  }
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());

  const isParticipant = projectCheck.checked;
  const url = isParticipant
    ? `${API_BASE}/makeProjectStatus`
    : `${API_BASE}/makeInitials`;

  const params = new URLSearchParams();
  params.append("lastname", data.lastname);
  params.append("firstname", data.firstname);
  params.append("surname", data.surname);
  if (isParticipant) {
    params.append("projectParticipant", "true");
    params.append("projectName", data.projectName);
  } else {
    params.append("projectParticipant", "false");
  }

  try {
    const res = await fetch(`${url}?${params}`, { method: "GET" });
    if (res.ok) {
      form.reset();
      projectCheck.checked = false;
      projectNameGroup.classList.add("hidden");
      loadRecords();
    } else {
      const err = await res.json();
      alert(`Ошибка: ${err.message || "Неверные данные"}`);
    }
  } catch (err) {
    alert("Ошибка сети");
  }
});

loadRecords();
