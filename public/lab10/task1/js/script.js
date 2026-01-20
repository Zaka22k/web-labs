const API_BASE = "/api/lab10/task1";
const AUTH_API_LOGIN = "/api/lab11/login";

function checkAdminAuthAndRender() {
  const token = localStorage.getItem("lab101_token");
  const userJson = localStorage.getItem("lab101_user");

  const loginForm = document.getElementById("loginForm");
  const loggedInContainer = document.getElementById("loggedInContainer");
  const adminLink = document.getElementById("adminLink");

  if (!loginForm || !loggedInContainer || !adminLink) {
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
      adminLink.classList.remove("hidden");
    } else {
      adminLink.classList.add("hidden");
    }
  } else {
    loginForm.classList.remove("hidden");
    loggedInContainer.classList.add("hidden");
    adminLink.classList.add("hidden");
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

    localStorage.setItem("lab101_token", data.token);
    localStorage.setItem(
      "lab101_user",
      JSON.stringify({
        id: data.user.id,
        login: data.user.login,
        role: data.user.role,
      })
    );

    alert(`Успешный вход! Роль: ${data.user.role}`);

    checkAdminAuthAndRender();
    updateCartCount();
    loadProducts();
  } catch (error) {
    console.error("Ошибка аутентификации:", error);
    alert(`Не удалось войти: ${error.message}`);
  }
}

function logout() {
  localStorage.removeItem("lab101_token");
  localStorage.removeItem("lab101_user");
  alert("Вы вышли из системы.");
  checkAdminAuthAndRender();
  loadProducts();
}

function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart") || "{}");
  const count = Object.values(cart).reduce((s, i) => s + i, 0);
  const cartCountElement = document.getElementById("cart-count");
  if (cartCountElement) {
    cartCountElement.textContent = count;
  }
}

window.showProductDetails = async (id) => {
  try {
    const res = await fetch(`${API_BASE}/product/${id}`);
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(
        errorData.error || "Не удалось получить данные о товаре."
      );
    }

    const product = await res.json();

    const details = `
Товар: ${product.title}
--------------------------
Полная цена: ${(product.price / 100).toFixed(2)} ₽
В наличии: ${product.amount} шт.
Категория: ${product.category_name || "Неизвестно"}
        `;
    alert(details.trim());
  } catch (error) {
    console.error("Ошибка при получении данных о товаре:", error);
    alert(
      `Не удалось загрузить полную информацию о товаре. Ошибка: ${error.message}`
    );
  }
};

async function loadProducts() {
  const res = await fetch(`${API_BASE}/products`);

  const isUserAuthenticated = !!localStorage.getItem("lab101_token");

  if (!res.ok) {
    const errorData = await res.json();
    console.error("Ошибка загрузки товаров:", errorData);
    document.getElementById(
      "products"
    ).innerHTML = `<div class="product error">Ошибка загрузки товаров: ${
      errorData.error || res.statusText
    }</div>`;
    return;
  }

  const products = await res.json();
  const productsArray = Array.isArray(products)
    ? products
    : products.data || [];

  if (productsArray.length === 0) {
    document.getElementById("products").innerHTML =
      '<div class="product">Товары не найдены</div>';
    return;
  }

  const html = productsArray
    .map((p) => {
      let buttonHtml = "";

      if (isUserAuthenticated) {
        buttonHtml = `<button onclick="addToCart(${p.id})" ${
          p.amount === 0 ? "disabled" : ""
        }>${p.amount === 0 ? "Нет в наличии" : "Добавить в корзину"}</button>`;
      } else {
        buttonHtml =
          '<p class="auth-required" style="color: var(--SystemFillColorCautionBrush);">Для покупки требуется вход</p>';
      }

      return `<div class="product">
                    <h3 onclick="showProductDetails(${
                      p.id
                    })" class="product-title-link">${p.title}</h3>
                    <p>Цена: ${(p.price / 100).toFixed(2)} ₽ | В наличии: ${
        p.amount
      }</p>
                    ${buttonHtml}
                </div>`;
    })
    .join("");
  document.getElementById("products").innerHTML = html;
}

window.addToCart = (id) => {
  let cart = JSON.parse(localStorage.getItem("cart") || "{}");
  cart[id] = (cart[id] || 0) + 1;
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
};

document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");
  const logoutButton = document.getElementById("logoutButton");

  if (loginForm) {
    loginForm.addEventListener("submit", login);
  }
  if (logoutButton) {
    logoutButton.addEventListener("click", logout);
  }

  loadProducts();
  updateCartCount();
  checkAdminAuthAndRender();
});
