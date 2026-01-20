const API_BASE = "/api/lab11";
const TOKEN_KEY = "lab11_task2_token";
const USER_KEY = "lab11_task2_user";

const els = {
  viewGuest: document.getElementById("view-guest"),
  viewUser: document.getElementById("view-user"),
  formLogin: document.getElementById("form-login"),
  loginInput: document.getElementById("login-input"),
  passInput: document.getElementById("pass-input"),
  btnLogout: document.getElementById("btn-logout"),
  displayLogin: document.getElementById("user-display-login"),
  displayRole: document.getElementById("user-display-role"),
  authMsg: document.getElementById("auth-msg"),

  adminPanel: document.getElementById("admin-panel"),
  formTitle: document.getElementById("form-title"),
  formCRUD: document.getElementById("form-user-crud"),
  crudMsg: document.getElementById("crud-msg"),
  submitButton: document.getElementById("submit-button"),

  userIdField: document.getElementById("user-id-field"),
  crudLogin: document.getElementById("crud-login"),
  crudPassword: document.getElementById("crud-password"),
  passwordGroup: document.getElementById("password-group"),
  passwordLabel: document.getElementById("password-label"),
  crudRole: document.getElementById("crud-role"),
  btnGeneratePassword: document.getElementById("btn-generate-password"),
  btnCancelEdit: document.getElementById("btn-cancel-edit"),

  btnRefresh: document.getElementById("btn-refresh"),
  table: document.getElementById("users-table"),
  listMsg: document.getElementById("list-msg"),
};

function getState() {
  const token = localStorage.getItem(TOKEN_KEY);
  const userStr = localStorage.getItem(USER_KEY);
  let user = null;
  try {
    user = JSON.parse(userStr);
  } catch (e) {}
  return { token, user };
}

function saveState(token, user) {
  if (token) {
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  } else {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  }
  renderStatus();
  fetchUsers();
}

function showMsg(el, type, text) {
  el.className = `msg ${type}`;
  el.textContent = text;
  setTimeout(() => {
    el.style.display = "none";
    el.className = "msg";
  }, 5000);
}

function generateRandomPassword(length = 12) {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";
  let password = "";
  for (let i = 0; i < length; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
}

function setFormMode(user = null) {
  els.crudMsg.className = "msg";

  els.btnGeneratePassword.style.display = "inline-block";

  if (user) {
    els.userIdField.value = user.id;
    els.formTitle.textContent = `Редактирование пользователя: ${user.login} (ID: ${user.id})`;
    els.crudLogin.value = user.login;
    els.crudRole.value = user.role;
    els.submitButton.textContent = "Сохранить изменения";

    els.crudPassword.removeAttribute("required");
    els.crudPassword.value = "";
    els.passwordLabel.textContent = "Пароль (оставьте пустым, чтобы не менять)";

    els.btnCancelEdit.style.display = "inline-block";

    const { user: currentUser } = getState();
    els.crudRole.disabled = user.id === currentUser.id;
  } else {
    els.userIdField.value = "";
    els.formTitle.textContent = "Создать нового пользователя";
    els.formCRUD.reset();
    els.submitButton.textContent = "Создать";

    els.crudPassword.setAttribute("required", "required");
    els.passwordLabel.textContent = "Пароль";

    els.btnCancelEdit.style.display = "none";

    els.crudRole.disabled = false;
  }
}

function renderStatus() {
  const { user } = getState();

  if (user) {
    els.viewGuest.style.display = "none";
    els.viewUser.style.display = "flex";

    els.displayLogin.textContent = user.login;
    els.displayRole.textContent = user.role.toUpperCase();

    if (user.role === "admin") {
      els.adminPanel.style.display = "block";
      setFormMode(null);
    } else {
      els.adminPanel.style.display = "none";
    }
  } else {
    els.viewGuest.style.display = "block";
    els.viewUser.style.display = "none";
    els.adminPanel.style.display = "none";
  }
}

els.formLogin.addEventListener("submit", async (e) => {
  e.preventDefault();
  const login = els.loginInput.value.trim();
  const password = els.passInput.value.trim();

  try {
    const res = await fetch(`${API_BASE}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ login, password }),
    });
    const data = await res.json();

    if (!res.ok) throw new Error(data.error || "Ошибка входа");

    saveState(data.token, data.user);
    showMsg(
      els.authMsg,
      "success",
      `Вход выполнен! Роль: ${data.user.role.toUpperCase()}`
    );

    els.loginInput.value = "";
    els.passInput.value = "";
  } catch (e) {
    showMsg(els.authMsg, "error", e.message);
  }
});

els.btnLogout.addEventListener("click", () => {
  saveState(null, null);
  showMsg(els.authMsg, "success", "Вы вышли из системы.");
});

async function fetchUsers() {
  const { token } = getState();
  const headers = token ? { Authorization: `Bearer ${token}` } : {};

  const tbody = els.table.querySelector("tbody");
  tbody.innerHTML = "<tr><td>Загрузка...</td></tr>";

  try {
    const res = await fetch(`${API_BASE}/users`, { headers });
    const data = await res.json();

    if (!res.ok) throw new Error(data.error || "Ошибка загрузки");

    renderTable(data.users, data.authStatus);
  } catch (e) {
    tbody.innerHTML = `<tr><td style="color: coral">Ошибка: ${e.message}</td></tr>`;
  }
}

function renderTable(users, serverRole) {
  const { user: localUser } = getState();
  const currentId = localUser ? localUser.id : null;

  const thead = els.table.querySelector("thead");
  const tbody = els.table.querySelector("tbody");
  tbody.innerHTML = "";

  let headersHTML = "";
  if (serverRole === "guest") {
    headersHTML = `<tr><th>Логин</th></tr>`;
  } else {
    headersHTML = `
                <tr>
                    <th style="width: 60px;">ID</th>
                    <th>Пользователь</th>
                    <th>Роль</th>
                    <th>Создан</th>
                    ${
                      serverRole === "admin"
                        ? '<th style="text-align: right;">Действия</th>'
                        : ""
                    }
                </tr>`;
  }
  thead.innerHTML = headersHTML;

  if (users.length === 0) {
    tbody.innerHTML = '<tr><td colspan="5">Список пуст</td></tr>';
    return;
  }

  users.forEach((u) => {
    const tr = document.createElement("tr");

    if (serverRole === "guest") {
      tr.innerHTML = `<td>${u.login}</td>`;
    } else {
      const isSelf = u.id === currentId;
      const roleStyle =
        u.role === "admin" ? `color: var(--AccentFillColorDefaultBrush)` : "";

      let rowContent = `
                    <td>${u.id}</td>
                    <td style="font-weight: 500">${u.login}</td>
                    <td><span class="role-badge" style="${roleStyle}">${u.role.toUpperCase()}</span></td>
                    <td style="color: var(--TextFillColorSecondaryBrush)">${new Date(
                      u.created_at
                    ).toLocaleDateString()}</td>
                `;

      if (serverRole === "admin") {
        rowContent += `<td style="text-align: right;">
                            <button onclick="editUserForm(${u.id}, '${
          u.login
        }', '${u.role}')" class="btn-secondary">Изменить</button>
                            ${
                              isSelf
                                ? '<span class="self-tag">Вы</span>'
                                : `<button onclick="deleteUser(${u.id}, '${u.login}')" class="btn-danger">Удалить</button>`
                            }
                        </td>`;
      }
      tr.innerHTML = rowContent;
    }
    tbody.appendChild(tr);
  });
}

function editUserForm(id, login, role) {
  setFormMode({ id, login, role });
  window.scrollTo({ top: els.adminPanel.offsetTop, behavior: "smooth" });
}

els.btnCancelEdit.addEventListener("click", () => {
  setFormMode(null);
});

els.btnGeneratePassword.addEventListener("click", () => {
  const newPassword = generateRandomPassword();
  els.crudPassword.value = newPassword;
  showMsg(
    els.crudMsg,
    "success",
    `Сгенерирован новый пароль. Нажмите "${els.submitButton.textContent}" для применения.`
  );

  if (!els.userIdField.value) {
    els.crudPassword.setCustomValidity("");
  }
});

els.formCRUD.addEventListener("submit", async (e) => {
  e.preventDefault();
  const userId = els.userIdField.value;
  const login = els.crudLogin.value;
  const roleName = els.crudRole.value;
  const password = els.crudPassword.value;

  let method, url, body;

  if (userId) {
    method = "PUT";
    url = `${API_BASE}/users/${userId}`;
    body = { login, roleName };

    if (password) body.password = password;
  } else {
    if (!login || !password) {
      showMsg(
        els.crudMsg,
        "error",
        "Логин и пароль обязательны для создания нового пользователя."
      );
      return;
    }
    method = "POST";
    url = `${API_BASE}/users`;
    body = { login, roleName, password };
  }

  try {
    const res = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getState().token}`,
      },
      body: JSON.stringify(body),
    });
    const data = await res.json();

    if (!res.ok) throw new Error(data.error || `Ошибка ${method}`);

    showMsg(
      els.crudMsg,
      "success",
      userId
        ? `Пользователь ${login} обновлен!`
        : `Пользователь ${login} создан!`
    );

    setFormMode(null);
    fetchUsers();
  } catch (e) {
    showMsg(els.crudMsg, "error", e.message);
  }
});

async function deleteUser(id, loginName) {
  if (
    !confirm(
      `Вы уверены, что хотите удалить пользователя ${loginName}? Это действие необратимо.`
    )
  )
    return;
  performAction(`${API_BASE}/users/${id}`, "DELETE");
}

async function performAction(url, method, body = null) {
  const { token } = getState();
  try {
    const opts = {
      method,
      headers: {},
      body: body ? JSON.stringify(body) : undefined,
    };

    if (method === "POST" || method === "PUT") {
      opts.headers["Content-Type"] = "application/json";
    }

    if (token) {
      opts.headers["Authorization"] = `Bearer ${token}`;
    }

    if (!body) {
      delete opts.body;
    }

    const res = await fetch(url, opts);
    const data = await res.json().catch(() => ({}));

    if (!res.ok)
      throw new Error(data.error || `Ошибка ${method} ${res.status}`);

    showMsg(els.listMsg, "success", data.message || "Готово");
    fetchUsers();
  } catch (e) {
    showMsg(els.listMsg, "error", e.message);
  }
}

els.btnRefresh.addEventListener("click", fetchUsers);

renderStatus();
fetchUsers();
