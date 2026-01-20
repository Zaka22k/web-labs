let searchTimeout;

function onSearchInput() {
  clearTimeout(searchTimeout);
  searchTimeout = setTimeout(() => {
    const query = document.getElementById("search").value.trim();
    loadProducts(query);
  }, 300);
}

async function loadStock() {
  try {
    const res = await fetch("/api/lab9/task1/stock");
    const data = await res.json();
    document.getElementById("total-products").textContent = data.total_products;
    document.getElementById("total-items").textContent = data.total_items;
    document.getElementById("total-value").textContent =
      (data.total_value / 100).toLocaleString("ru-RU", {
        minimumFractionDigits: 2,
      }) + " ₽";
  } catch (err) {
    console.error("Статистика недоступна");
  }
}

async function loadProducts(q = "") {
  const tbody = document.getElementById("products-list-body");
  try {
    const url = q
      ? `/api/lab9/task1/products?q=${encodeURIComponent(q)}`
      : "/api/lab9/products";
    const res = await fetch(url);
    const products = await res.json();

    if (products.length === 0) {
      tbody.innerHTML =
        '<tr><td colspan="5" style="text-align:center; padding: 40px">Товары не найдены</td></tr>';
      return;
    }

    tbody.innerHTML = products
      .map(
        (p) => `
      <tr>
        <td>${p.id}</td>
        <td><strong>${p.title}</strong></td>
        <td>${(p.price / 100).toFixed(2)} ₽</td>
        <td>${p.amount} шт.</td>
        <td style="text-align:right">
          <button class="delete-btn" onclick="deleteProduct(${
            p.id
          })">Удалить</button>
        </td>
      </tr>
    `
      )
      .join("");
  } catch (err) {
    tbody.innerHTML =
      '<tr><td colspan="5" style="color:red">Ошибка загрузки списка</td></tr>';
  }
}

async function addProduct() {
  const title = document.getElementById("title").value.trim();
  const priceRub = parseFloat(document.getElementById("price").value);
  const amount = parseInt(document.getElementById("amount").value);

  if (!title || isNaN(priceRub) || amount < 0) {
    alert("Заполните корректно все поля");
    return;
  }

  try {
    await fetch("/api/lab9/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        price: Math.round(priceRub * 100),
        amount,
      }),
    });
    document.getElementById("title").value = "";
    document.getElementById("price").value = "";
    document.getElementById("amount").value = "0";
    loadProducts();
    loadStock();
  } catch (err) {
    alert("Ошибка при сохранении");
  }
}

async function deleteProduct(id) {
  if (!confirm(`Удалить товар #${id}?`)) return;
  await fetch(`/api/lab9/products/${id}`, { method: "DELETE" });
  loadProducts();
  loadStock();
}

loadProducts();
loadStock();
