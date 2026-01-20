let pendingChanges = {};

window.loadStock = async () => {
  const res = await fetch("/api/lab9/task1/stock");
  const s = await res.json();
  document.getElementById("stock").innerHTML = `На складе: ${
    s.total_items
  } ед. | Общая стоимость: ${(s.total_value / 100).toFixed(2)} ₽`;
};

window.loadProducts = async () => {
  const res = await fetch("/api/lab9/products");
  const products = await res.json();
  const rows = products
    .map(
      (p) => `
    <tr data-id="${p.id}">
      <td><strong>#${p.id}</strong></td>
      <td contenteditable="true" onblur="updateTitle(${
        p.id
      }, this.textContent)">${p.title}</td>
      <td contenteditable="true" onblur="updatePrice(${
        p.id
      }, this.textContent)">${(p.price / 100).toFixed(2)}</td>
      <td>
        <div class="amount-controls">
          <button onclick="changeAmount(${p.id}, -1)">−</button>
          <span id="amt-${p.id}">${p.amount}</span>
          <button onclick="changeAmount(${p.id}, 1)">+</button>
        </div>
      </td>
      <td><button class="btn-danger" onclick="deleteProduct(${
        p.id
      })">Удалить</button></td>
    </tr>
  `
    )
    .join("");
  document.querySelector("#products-table tbody").innerHTML =
    rows || '<tr><td colspan="5">Склад пуст</td></tr>';
};

window.updateTitle = (id, val) => {
  if (!pendingChanges[id]) pendingChanges[id] = {};
  pendingChanges[id].title = val;
};

window.updatePrice = (id, val) => {
  if (!pendingChanges[id]) pendingChanges[id] = {};
  pendingChanges[id].price = Math.round(parseFloat(val) * 100);
};

window.changeAmount = (id, delta) => {
  const span = document.getElementById(`amt-${id}`);
  let current = parseInt(span.textContent) + delta;
  if (current < 0) current = 0;
  span.textContent = current;
  if (!pendingChanges[id]) pendingChanges[id] = {};
  pendingChanges[id].amount = current;
};

window.addProduct = async () => {
  const title = document.getElementById("new-title").value;
  const price = Math.round(
    parseFloat(document.getElementById("new-price").value) * 100
  );
  const amount = parseInt(document.getElementById("new-amount").value);
  await fetch("/api/lab9/products", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, price, amount }),
  });
  location.reload();
};

window.deleteProduct = async (id) => {
  if (confirm("Удалить?")) {
    await fetch(`/api/lab9/products/${id}`, { method: "DELETE" });
    loadProducts();
    loadStock();
  }
};

window.getById = async () => {
  const id = document.getElementById("get-id").value;
  const res = await fetch(`/api/lab9/products/${id}`);
  if (res.status === 404) {
    document.getElementById("single-product").innerHTML =
      '<div class="single-product">❌ Товар не найден</div>';
    return;
  }
  const p = await res.json();
  document.getElementById("single-product").innerHTML = `
    <div class="single-product">
      <h3>${p.title}</h3>
      <p>Цена: ${(p.price / 100).toFixed(2)} ₽ | Остаток: ${p.amount}</p>
    </div>`;
};

window.saveAllChanges = async () => {
  for (const [id, changes] of Object.entries(pendingChanges)) {
    if (changes.title !== undefined) {
      await fetch(`/api/lab9/products/${id}/title`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: changes.title }),
      });
    }
    if (changes.price !== undefined) {
      await fetch(`/api/lab9/products/${id}/price`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ price: changes.price }),
      });
    }
    if (changes.amount !== undefined) {
      await fetch(`/api/lab9/products/${id}/amount`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: changes.amount }),
      });
    }
  }
  pendingChanges = {};
  alert("Сохранено");
  loadStock();
};

loadStock();
loadProducts();
