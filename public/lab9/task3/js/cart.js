let products = [];

async function loadProducts() {
  const res = await fetch("/api/lab9/products");
  products = await res.json();
  renderCart();
}

function renderCart() {
  const cart = JSON.parse(localStorage.getItem("cart") || "{}");
  let total = 0;
  const rows = Object.keys(cart)
    .map((id) => {
      const p = products.find((x) => x.id == id);
      if (!p) return "";
      const sum = (p.price / 100) * cart[id];
      total += sum;
      return `
      <tr>
        <td>${p.title}</td>
        <td>
          <div class="qty-controls">
            <button onclick="change(${id},-1)">−</button>
            <input type="number" readonly value="${cart[id]}"/>
            <button onclick="change(${id},1)">+</button>
          </div>
        </td>
        <td>${(p.price / 100).toFixed(2)} ₽</td>
        <td>${sum.toFixed(2)} ₽</td>
        <td><button class="btn-danger" onclick="remove(${id})">Удалить</button></td>
      </tr>`;
    })
    .join("");

  if (rows) {
    document.getElementById("cart-items").innerHTML = `
      <table>
        <thead><tr><th>Товар</th><th>Кол-во</th><th>Цена</th><th>Сумма</th><th></th></tr></thead>
        <tbody>${rows}</tbody>
      </table>`;
  } else {
    document.getElementById("cart-items").innerHTML =
      '<div style="text-align: center; padding: 40px;">Корзина пуста</div>';
  }
  document.getElementById("total").textContent = `Итого: ${total.toFixed(2)} ₽`;
}

window.change = (id, delta) => {
  let cart = JSON.parse(localStorage.getItem("cart") || "{}");
  cart[id] = (cart[id] || 0) + delta;
  if (cart[id] < 1) delete cart[id];
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
};

window.remove = (id) => {
  let cart = JSON.parse(localStorage.getItem("cart") || "{}");
  delete cart[id];
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
};

window.checkout = () => {
  const cart = JSON.parse(localStorage.getItem("cart") || "{}");
  const errors = [];
  for (const [id, qty] of Object.entries(cart)) {
    const p = products.find((x) => x.id == id);
    if (p && p.amount < qty)
      errors.push(`${p.title}: в наличии только ${p.amount}`);
  }
  if (errors.length) alert(errors.join("\n"));
  else alert("Все товары в наличии, можно оформлять!");
};

window.buy = async () => {
  const cart = JSON.parse(localStorage.getItem("cart") || "{}");
  for (const [id, qty] of Object.entries(cart)) {
    const p = products.find((x) => x.id == id);
    await fetch(`/api/lab9/products/${id}/amount`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: p.amount - qty }),
    });
  }
  localStorage.removeItem("cart");
  alert("Покупка завершена!");
  location.href = "index.html";
};

loadProducts();
