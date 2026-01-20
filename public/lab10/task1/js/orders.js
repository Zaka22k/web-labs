async function showOrderDetails(orderId) {
  try {
    const res = await fetch(`/api/lab10/task1/orders/${orderId}`);
    if (!res.ok) throw new Error();
    const order = await res.json();

    const itemsList = order.items
      .map(
        (item) =>
          `\n— ${item.title}: ${item.quantity} шт. x ${(
            item.price / 100
          ).toFixed(2)} ₽`
      )
      .join("");

    alert(
      `Заказ №${order.id}\nДата: ${new Date(
        order.created_at
      ).toLocaleString()}\nИтого: ${(order.total_price / 100).toFixed(
        2
      )} ₽\n${itemsList}`
    );
  } catch (error) {
    alert("Ошибка загрузки деталей");
  }
}
window.showOrderDetails = showOrderDetails;

async function loadOrders() {
  const listContainer = document.getElementById("orders-list");
  try {
    const res = await fetch("/api/lab10/task1/orders");
    const result = await res.json();
    const orders = result.orders || [];

    if (orders.length === 0) {
      listContainer.innerHTML =
        '<div style="text-align: center; padding: 40px; color: var(--TextFillColorTertiaryBrush);">Заказов пока нет</div>';
      return;
    }

    const html = orders
      .map(
        (order) => `
                <div class="product" style="flex-direction: row; justify-content: space-between; align-items: center;">
                    <div>
                        <h3 style="cursor: default;">Заказ №${order.id}</h3>
                        <p>${new Date(order.created_at).toLocaleString()}</p>
                        <p><strong>${(order.total_price / 100).toFixed(
                          2
                        )} ₽</strong></p>
                    </div>
                    <button class="btn-primary" style="width: auto;" onclick="showOrderDetails(${
                      order.id
                    })">Детали</button>
                </div>
            `
      )
      .join("");

    listContainer.innerHTML = `<div style="display: flex; flex-direction: column; gap: 12px;">${html}</div>`;
  } catch (error) {
    listContainer.innerHTML = "Ошибка загрузки";
  }
}

document.addEventListener("DOMContentLoaded", loadOrders);
