let products = [];

async function loadProducts() {
  const res = await fetch("/api/lab10/task1/products");

  if (!res.ok) {
    const errorData = await res.json();
    console.error("Ошибка загрузки товаров:", errorData);
    return alert("Не удалось загрузить список товаров для корзины.");
  }

  const result = await res.json();
  products = Array.isArray(result) ? result : result.data || [];

  renderCart();
}

function renderCart() {
  const cart = JSON.parse(localStorage.getItem("cart") || "{}");
  let total = 0;
  const rows = Object.keys(cart)
    .map((id) => {
      const p = products.find((x) => x.id == id);

      if (!p) return "";

      const sumInCents = p.price * cart[id];
      total += sumInCents;

      return `<tr>
                <td>${p.title}</td>
                <td><div class="qty-controls">
                <button onclick="change(${id},-1)">–</button>
                <input type="number" min="1" max="${p.amount}" value="${
        cart[id]
      }" onchange="setQty(${id},this.value)"/>
                <button onclick="change(${id},1)">+</button>
                </div></td>
                <td>${(p.price / 100).toFixed(2)} ₽</td>
                <td>${(sumInCents / 100).toFixed(2)} ₽</td>
                <td><button class="btn-danger" onclick="remove(${id})">Удалить</button></td>
            </tr>`;
    })
    .join("");

  document.getElementById("cart-items").innerHTML = rows
    ? `<table>
            <thead>
            <tr>
                <th>Товар</th>
                <th>Кол-во</th>
                <th>Цена</th>
                <th>Сумма</th>
                <th></th>
            </tr>
            </thead>
            <tbody>${rows}</tbody>
        </table>`
    : '<div class="empty-cart">Корзина пуста</div>';

  document.getElementById("total").textContent = `Итого: ${(
    total / 100
  ).toFixed(2)} ₽`;
}

window.change = (id, delta) => {
  let cart = JSON.parse(localStorage.getItem("cart") || "{}");
  const p = products.find((x) => x.id == id);
  const maxQty = p ? p.amount : Infinity;

  cart[id] = Math.max(1, Math.min(maxQty, (cart[id] || 1) + delta));
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
};

window.setQty = (id, qty) => {
  qty = parseInt(qty);
  const p = products.find((x) => x.id == id);
  const maxQty = p ? p.amount : Infinity;

  if (qty < 1 || qty > maxQty) {
    alert(`Количество должно быть от 1 до ${maxQty}`);
    renderCart();
    return;
  }

  let cart = JSON.parse(localStorage.getItem("cart") || "{}");
  cart[id] = qty;
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
  alert("Используйте кнопку 'Купить' для оформления заказа.");
};

window.buy = async () => {
  const cartData = JSON.parse(localStorage.getItem("cart") || "{}");
  const cartItems = Object.entries(cartData)
    .filter(([id, qty]) => qty > 0)
    .map(([id, qty]) => ({
      productId: parseInt(id),
      quantity: qty,
    }));

  if (cartItems.length === 0) {
    alert("Корзина пуста. Нечего покупать.");
    return;
  }

  const insufficient = [];
  for (const item of cartItems) {
    const p = products.find((x) => x.id === item.productId);
    if (!p) {
      insufficient.push(`Товар ID ${item.productId} не найден.`);
    } else if (p.amount < item.quantity) {
      insufficient.push(`${p.title} — доступно только ${p.amount} шт.`);
    }
  }

  if (insufficient.length > 0) {
    alert(
      "Недостаточно товара на складе или товар не существует:\n" +
        insufficient.join("\n")
    );
    return;
  }

  if (!confirm("Подтвердить покупку всех товаров в корзине?")) return;

  try {
    const res = await fetch("/api/lab10/task1/buy-cart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(cartItems),
    });

    if (res.ok) {
      const result = await res.json();
      localStorage.removeItem("cart");
      alert(
        `Покупка успешна! Заказ №${result.order.orderId} оформлен на сумму ${(
          result.order.total_price / 100
        ).toFixed(2)} ₽.`
      );
      loadProducts();
    } else {
      const errorData = await res.json();
      alert(
        "Ошибка при оформлении заказа: " +
          (errorData.error || "Неизвестная ошибка")
      );
    }
  } catch (error) {
    console.error("Fetch error:", error);
    alert("Произошла ошибка сети или сервера.");
  }
};

loadProducts();
