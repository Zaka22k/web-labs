const pad2 = (n) => String(n).padStart(2, "0");

const timeZones = {
  moscow: "Europe/Moscow",
  tokyo: "Asia/Tokyo",
  london: "Europe/London",
  newyork: "America/New_York",
  seattle: "America/Los_Angeles",
};

const select = document.getElementById("citySelect");
const clocks = document.querySelectorAll(".clock");

function updateClocks() {
  const now = new Date();

  for (const city in timeZones) {
    const tz = timeZones[city];
    const timeStr = now.toLocaleTimeString("ru-RU", {
      timeZone: tz,
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
    document.querySelector(`#${city} .time`).textContent = timeStr;
  }
}

function highlightSelected() {
  clocks.forEach((clock) => clock.classList.remove("active"));
  const selected = select.value;
  document.getElementById(selected).classList.add("active");
}

highlightSelected();
updateClocks();
setInterval(updateClocks, 1000);

select.addEventListener("change", highlightSelected);
