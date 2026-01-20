const API_BASE = "/api/lab11";
const TOKEN_KEY = "lab11_token";
const USER_KEY = "lab11_user";

const formRegister = document.getElementById("form-register");
const regLoginInput = document.getElementById("reg-login");
const regPasswordInput = document.getElementById("reg-password");
const regMessageEl = document.getElementById("reg-message");
const regErrorEl = document.getElementById("reg-error");

const formLogin = document.getElementById("form-login");
const loginLoginInput = document.getElementById("login-login");
const loginPasswordInput = document.getElementById("login-password");
const loginMessageEl = document.getElementById("login-message");
const loginErrorEl = document.getElementById("login-error");

const currentUserEl = document.getElementById("current-user");
const currentTokenEl = document.getElementById("current-token");
const btnLogout = document.getElementById("btn-logout");

const formChangePassword = document.getElementById("form-change-password");
const oldPasswordInput = document.getElementById("old-password");
const newPasswordInput = document.getElementById("new-password");
const btnChangePassword = document.getElementById("btn-change-password");
const passMessageEl = document.getElementById("pass-message");
const passErrorEl = document.getElementById("pass-error");

const btnProfile = document.getElementById("btn-profile");
const btnAdmin = document.getElementById("btn-admin");
const profileResultEl = document.getElementById("profile-result");
const adminResultEl = document.getElementById("admin-result");

const tabButtons = document.querySelectorAll(".tab-button");
const tabContents = document.querySelectorAll(".tab-content");

function getToken() {
  return localStorage.getItem(TOKEN_KEY) || "";
}

function setAuthState(token, user) {
  if (token) {
    localStorage.setItem(TOKEN_KEY, token);
  } else {
    localStorage.removeItem(TOKEN_KEY);
  }
  if (user) {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  } else {
    localStorage.removeItem(USER_KEY);
  }
  renderAuthState();
}

function getUser() {
  const raw = localStorage.getItem(USER_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function renderAuthState() {
  const token = getToken();
  const user = getUser();
  const hasToken = Boolean(token);

  if (user) {
    currentUserEl.innerHTML = `<strong>${user.login}</strong> (роль: ${user.role})`;
  } else {
    currentUserEl.textContent = "нет";
  }

  currentTokenEl.textContent = token || "нет токена";
  btnLogout.disabled = !hasToken;

  btnProfile.disabled = !hasToken;
  btnAdmin.disabled = !hasToken;
  btnChangePassword.disabled = !hasToken;
}

function renderJson(el, data) {
  el.innerHTML = "";
  const pre = document.createElement("pre");
  pre.textContent = JSON.stringify(data, null, 2);
  el.appendChild(pre);
}

function clearMessages(target) {
  if (target === "all" || target === "login") {
    loginMessageEl.textContent = "";
    loginErrorEl.textContent = "";
  }
  if (target === "all" || target === "reg") {
    regMessageEl.textContent = "";
    regErrorEl.textContent = "";
  }
  if (target === "all" || target === "pass") {
    passMessageEl.textContent = "";
    passErrorEl.textContent = "";
  }
  if (target === "all" || target === "secure") {
    profileResultEl.innerHTML = "";
    adminResultEl.innerHTML = "";
  }
}

function switchTab(tabId) {
  tabContents.forEach((content) => {
    content.classList.remove("active");
  });
  tabButtons.forEach((button) => {
    button.classList.remove("active");
  });

  document.getElementById(`tab-${tabId}`).classList.add("active");
  document.querySelector(`[data-tab="${tabId}"]`).classList.add("active");
  clearMessages("all");
}

tabButtons.forEach((button) => {
  button.addEventListener("click", () => {
    switchTab(button.dataset.tab);
  });
});

formRegister.addEventListener("submit", async (e) => {
  e.preventDefault();
  clearMessages("reg");

  const login = regLoginInput.value.trim();
  const password = regPasswordInput.value;

  if (!login || !password) {
    regErrorEl.textContent = "Заполните логин и пароль.";
    return;
  }

  try {
    const res = await fetch(API_BASE + "/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ login, password }),
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      regErrorEl.textContent = data.error || "Ошибка регистрации.";
      return;
    }

    regMessageEl.textContent = `Регистрация ${data.login} успешна.`;
  } catch (err) {
    regErrorEl.textContent = "Ошибка запроса: " + err.message;
  }
});

formLogin.addEventListener("submit", async (e) => {
  e.preventDefault();
  clearMessages("login");

  const login = loginLoginInput.value.trim();
  const password = loginPasswordInput.value;

  if (!login || !password) {
    loginErrorEl.textContent = "Заполните логин и пароль.";
    return;
  }

  try {
    const res = await fetch(API_BASE + "/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ login, password }),
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      loginErrorEl.textContent =
        data.error || "Ошибка логина (Неверный логин/пароль).";
      setAuthState("", null);
      return;
    }

    const token = data.token;
    const user = data.user;

    if (!token || !user) {
      loginErrorEl.textContent = "Сервер вернул неожиданный ответ.";
      return;
    }

    setAuthState(token, user);
    loginMessageEl.textContent = `Логин ${user.login} успешен.`;
    switchTab("secure");
  } catch (err) {
    loginErrorEl.textContent = "Ошибка запроса: " + err.message;
    setAuthState("", null);
  }
});

btnLogout.addEventListener("click", () => {
  setAuthState("", null);
  clearMessages("all");
  switchTab("auth");
});

formChangePassword.addEventListener("submit", async (e) => {
  e.preventDefault();
  clearMessages("pass");

  const oldPassword = oldPasswordInput.value;
  const newPassword = newPasswordInput.value;
  const token = getToken();

  if (!token) {
    passErrorEl.textContent = "Для смены пароля нужно войти.";
    return;
  }
  if (!oldPassword || !newPassword) {
    passErrorEl.textContent = "Введите старый и новый пароли.";
    return;
  }
  if (newPassword.length < 6) {
    passErrorEl.textContent = "Новый пароль должен быть не менее 6 символов.";
    return;
  }

  try {
    const res = await fetch(API_BASE + "/change-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({ oldPassword, newPassword }),
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      passErrorEl.textContent =
        data.error ||
        "Ошибка смены пароля (возможно, неверный текущий пароль).";
      return;
    }

    passMessageEl.textContent =
      "Пароль успешно изменен! Требуется повторный вход.";
    setAuthState("", null);
    oldPasswordInput.value = "";
    newPasswordInput.value = "";
    switchTab("auth");
  } catch (err) {
    passErrorEl.textContent = "Ошибка запроса: " + err.message;
  }
});

btnProfile.addEventListener("click", async () => {
  clearMessages("secure");
  const token = getToken();

  try {
    const res = await fetch(API_BASE + "/profile", {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    const data = await res.json().catch(() => ({ message: "Empty response" }));

    if (!res.ok) {
      renderJson(profileResultEl, { status: res.status, ...data });
      return;
    }
    renderJson(profileResultEl, data);
  } catch (err) {
    profileResultEl.textContent = "Ошибка запроса: " + err.message;
  }
});

btnAdmin.addEventListener("click", async () => {
  clearMessages("secure");
  const token = getToken();

  try {
    const res = await fetch(API_BASE + "/admin", {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    const data = await res.json().catch(() => ({ message: "Empty response" }));

    if (!res.ok) {
      renderJson(adminResultEl, { status: res.status, ...data });
      return;
    }
    renderJson(adminResultEl, data);
  } catch (err) {
    adminResultEl.textContent = "Ошибка запроса: " + err.message;
  }
});

renderAuthState();
