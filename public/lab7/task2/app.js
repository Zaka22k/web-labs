const lastnameEl = document.getElementById("lastname");
const firstnameEl = document.getElementById("firstname");
const middlenameEl = document.getElementById("middlename");
const participateEl = document.getElementById("participate");
const projectNameEl = document.getElementById("projectName");
const resultEl = document.getElementById("result");

participateEl.addEventListener("change", () => {
  projectNameEl.classList.toggle("visible", participateEl.checked);
});

projectNameEl.classList.toggle("visible", participateEl.checked);

document.getElementById("saveBtn").addEventListener("click", async () => {
  resultEl.className = "";
  resultEl.textContent = "Обработка...";

  const lastname = lastnameEl.value.trim();
  const firstname = firstnameEl.value.trim();
  const middlename = middlenameEl.value.trim();
  const participate = participateEl.checked;

  if (!lastname || !firstname || !middlename) {
    resultEl.textContent = "Заполните все поля ФИО";
    resultEl.className = "error";
    return;
  }

  try {
    const initialsResp = await fetch(
      `/api/lab7/task2/makeInitials?lastname=${encodeURIComponent(
        lastname
      )}&firstname=${encodeURIComponent(
        firstname
      )}&middlename=${encodeURIComponent(middlename)}`
    );
    const initials = await initialsResp.json();

    const projectResp = await fetch(
      `/api/lab7/task2/makeProjectStatus?lastname=${encodeURIComponent(
        lastname
      )}&firstname=${encodeURIComponent(
        firstname
      )}&middlename=${encodeURIComponent(
        middlename
      )}&participate=${participate}`
    );
    const projectStatus = await projectResp.json();

    resultEl.className = "success";
    resultEl.textContent = `Инициалы: ${initials.lastname} ${initials.firstnameLetter}.${initials.surnameLetter}.\nСтатус участия: ${projectStatus.projectParticipant}`;
  } catch (err) {
    resultEl.className = "error";
    resultEl.textContent = "Ошибка соединения с сервером";
    console.error(err);
  }
});
