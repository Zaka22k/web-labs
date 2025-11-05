const pad2 = (n) => String(n).padStart(2, "0");

function updateClock() {
  const now = new Date();
  const hh = pad2(now.getHours());
  const mm = pad2(now.getMinutes());
  const ss = pad2(now.getSeconds());
  document.getElementById("digitalClock").textContent = `${hh}:${mm}:${ss}`;
}

updateClock();

const msUntilNextSecond = 1000 - (performance.now() % 1000);
setTimeout(() => {
  updateClock();
  setInterval(updateClock, 1000);
}, msUntilNextSecond);
