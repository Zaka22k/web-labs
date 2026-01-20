function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart") || "{}");
  const count = Object.values(cart).reduce((s, i) => s + i, 0);
  document.getElementById("cart-count").textContent = count;
}

async function loadProducts() {
  const res = await fetch("/api/lab9/products");
  const products = await res.json();
  if (products.length === 0) {
    document.getElementById("products").innerHTML =
      "<div>Товары не найдены</div>";
    return;
  }
  const html = products
    .map(
      (p) => `
    <div class="product">
      <h3>${p.title}</h3>
      <p>Цена: ${(p.price / 100).toFixed(2)} ₽ | В наличии: ${p.amount}</p>
      <button onclick="addToCart(${p.id})" ${p.amount === 0 ? "disabled" : ""}>
        ${p.amount === 0 ? "Нет в наличии" : "Добавить в корзину"}
      </button>
    </div>
  `
    )
    .join("");
  document.getElementById("products").innerHTML = html;
}

window.addToCart = (id) => {
  let cart = JSON.parse(localStorage.getItem("cart") || "{}");
  cart[id] = (cart[id] || 0) + 1;
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
};

updateCartCount();
loadProducts();
