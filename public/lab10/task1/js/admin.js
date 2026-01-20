const API_BASE = "/api/lab10/task1";
let categoriesCache = [];

async function loadCategories() {
  const listContainer = document.getElementById("categories-list");

  if (!listContainer) {
    console.error("Критическая ошибка: Контейнер 'categories-list' не найден.");
    return;
  }

  listContainer.innerHTML = '<p class="message-box">Загрузка...</p>';

  try {
    const res = await fetch(`${API_BASE}/categories`);

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(
        errorData.error || `Ошибка загрузки категорий (статус: ${res.status})`
      );
    }

    const result = await res.json();
    categoriesCache = result.data || [];

    if (categoriesCache.length === 0) {
      listContainer.innerHTML =
        '<p class="message-box">Категории не найдены.</p>';
      return;
    }

    const html = categoriesCache
      .map(
        (c) => `
                <div class="list-item" data-id="${c.id}">
                    <div class="item-info">
                        <strong>${c.name}</strong> 
                        <span>(ID: ${c.id})</span>
                    </div>
                    <div class="item-actions">
                        <button class="btn-danger" onclick="deleteCategory(${c.id})">Удалить</button>
                    </div>
                </div>
            `
      )
      .join("");

    listContainer.innerHTML = html;

    renderProductForm();
  } catch (e) {
    console.error("Ошибка загрузки категорий:", e);
    listContainer.innerHTML = `<p class="message-box error-message">Ошибка: ${e.message}</p>`;
  }
}

async function addCategory() {
  const nameInput = document.getElementById("category-name");
  if (!nameInput) {
    console.error("Критическая ошибка: Поле ввода 'category-name' не найдено.");
    return;
  }

  const name = nameInput.value.trim();

  if (!name) {
    alert("Введите название категории.");
    return;
  }

  try {
    const res = await fetch(`${API_BASE}/categories`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error || "Не удалось добавить категорию");
    }

    nameInput.value = "";
    loadCategories();
  } catch (e) {
    console.error("Ошибка добавления категории:", e);
    alert(`Ошибка добавления категории: ${e.message}`);
  }
}

async function deleteCategory(id) {
  if (!confirm(`Вы уверены, что хотите удалить категорию ID ${id}?`)) {
    return;
  }

  try {
    const res = await fetch(`${API_BASE}/categories/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      const errorData = await res.json();
      if (errorData.error && errorData.error.includes("товары")) {
        throw new Error(errorData.error);
      }
      throw new Error("Не удалось удалить категорию");
    }

    loadCategories();
  } catch (e) {
    console.error("Ошибка удаления категории:", e);
    alert(`Ошибка удаления: ${e.message}`);
  }
}

function renderProductForm(product = {}) {
  const formContainer = document.getElementById("product-form-container");

  if (!formContainer) {
    console.error(
      "Критическая ошибка: Контейнер 'product-form-container' не найден."
    );
    return;
  }

  const isEditing = !!product.id;

  const categoryOptions = categoriesCache
    .map(
      (c) =>
        `<option value="${c.id}" ${
          product.category_id == c.id ? "selected" : ""
        }>${c.name}</option>`
    )
    .join("");

  formContainer.innerHTML = `
        <h3>${isEditing ? "Редактировать товар" : "Добавить новый товар"}</h3>
        <div class="form-control">
            <input type="text" id="product-title" placeholder="Название товара" value="${
              product.title || ""
            }">
        </div>
        <div class="form-control">
            <select id="product-category">
                <option value="">Выберите категорию</option>
                ${categoryOptions}
            </select>
            <input type="number" id="product-price" min="0" placeholder="Цена (в копейках, например 10000)" value="${
              product.price || ""
            }">
            <input type="number" id="product-amount" min="0" placeholder="Количество" value="${
              product.amount || ""
            }">
        </div>
        <button id="save-product-btn" class="btn-success" 
            onclick="${
              isEditing ? `saveProduct(${product.id})` : "addProduct()"
            }">
            ${isEditing ? "Сохранить изменения" : "Добавить товар"}
        </button>
        ${
          isEditing
            ? `<button class="btn-primary" onclick="renderProductForm({})">Отмена</button>`
            : ""
        }
    `;
}

async function addProduct() {
  const data = getProductFormData();
  if (!data) return;

  try {
    const res = await fetch(`${API_BASE}/products`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error || "Не удалось добавить товар");
    }

    alert("Товар успешно добавлен!");
    loadProductsAdmin();
    renderProductForm({});
  } catch (e) {
    console.error("Ошибка добавления товара:", e);
    alert(`Ошибка добавления товара: ${e.message}`);
  }
}

function getProductFormData() {
  const titleInput = document.getElementById("product-title");
  const categoryInput = document.getElementById("product-category");
  const priceInput = document.getElementById("product-price");
  const amountInput = document.getElementById("product-amount");

  if (!titleInput || !categoryInput || !priceInput || !amountInput) {
    alert("Ошибка: Не найдены все поля формы товара.");
    return null;
  }

  const title = titleInput.value.trim();
  const category_id = parseInt(categoryInput.value);
  const price = parseInt(priceInput.value);
  const amount = parseInt(amountInput.value);

  if (
    !title ||
    !category_id ||
    isNaN(price) ||
    isNaN(amount) ||
    price < 0 ||
    amount < 0
  ) {
    alert(
      "Пожалуйста, заполните все обязательные поля корректными числовыми значениями (Цена и Количество)."
    );
    return null;
  }

  return { title, category_id, price, amount };
}

async function updateProductAmount(id, value) {
  const parsedAmount = parseFloat(value);
  const newAmount = parseInt(value);

  if (isNaN(parsedAmount) || newAmount < 0) {
    alert("Количество должно быть неотрицательным числом.");
    return false;
  }

  try {
    const res = await fetch(`${API_BASE}/products/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: newAmount }),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(
        errorData.error || "Не удалось обновить количество товара"
      );
    }

    console.log(`Количество товара ID ${id} обновлено до ${newAmount}.`);
    return true;
  } catch (e) {
    console.error("Ошибка обновления количества товара:", e);
    alert(`Ошибка обновления: ${e.message}`);
    return false;
  }
}

async function saveProductAmount(id) {
  const inputElement = document.getElementById(`amount-${id}`);
  if (!inputElement) {
    console.error(`Input element for product ID ${id} not found.`);
    return;
  }

  const success = await updateProductAmount(id, inputElement.value);
  if (success) {
    inputElement.style.borderColor = "green";
    setTimeout(() => (inputElement.style.borderColor = ""), 2000);
  } else {
    loadProductsAdmin();
  }
}

async function loadProductsAdmin() {
  const listContainer = document.getElementById("products-admin-list");

  if (!listContainer) {
    console.error(
      "Критическая ошибка: Контейнер 'products-admin-list' не найден."
    );
    return;
  }

  listContainer.innerHTML = '<p class="message-box">Загрузка...</p>';

  try {
    const res = await fetch(`${API_BASE}/products`);

    if (!res.ok) throw new Error("Ошибка загрузки товаров");

    const result = await res.json();

    const products = Array.isArray(result) ? result : result.data || [];

    if (products.length === 0) {
      listContainer.innerHTML = '<p class="message-box">Товары не найдены.</p>';
      return;
    }

    const html = products
      .map(
        (p) => `
                <div class="list-item" data-id="${p.id}">
                    <div class="item-info">
                        <strong>${p.title}</strong> 
                        <span>(${p.category_name || "Без категории"}) - 
                            ${(p.price / 100).toFixed(2)} ₽
                        </span>
                    </div>
                    <div class="item-quantity-control">
                        <label for="amount-${p.id}">Кол-во:</label>
                        <input type="number" 
                               min="0" 
                               id="amount-${p.id}" 
                               value="${p.amount || 0}" />
                        <button class="btn-primary" onclick="saveProductAmount(${
                          p.id
                        })">Сохранить</button>
                    </div>
                    <div class="item-actions">
                        <button class="btn-danger" onclick="deleteProduct(${
                          p.id
                        })">Удалить</button>
                    </div>
                </div>
            `
      )
      .join("");

    listContainer.innerHTML = html;
  } catch (e) {
    console.error("Ошибка загрузки товаров:", e);
    listContainer.innerHTML = `<p class="message-box error-message">Ошибка: ${e.message}</p>`;
  }
}

async function deleteProduct(id) {
  if (!confirm(`Вы уверены, что хотите удалить товар ID ${id}?`)) {
    return;
  }

  try {
    const res = await fetch(`${API_BASE}/products/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error || "Не удалось удалить товар");
    }

    loadProductsAdmin();
  } catch (e) {
    console.error("Ошибка удаления товара:", e);
    alert(`Ошибка удаления: ${e.message}`);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  loadCategories();
  loadProductsAdmin();
});
