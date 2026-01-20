let startTime = 0;
let elapsedTime = 0;
let timerInterval;
let running = false;

const display = document.getElementById("display");
const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");
const resetBtn = document.getElementById("resetBtn");

function updateDisplay() {
  const time = elapsedTime + (running ? Date.now() - startTime : 0);
  const ms = Math.floor(time % 1000);
  const s = Math.floor((time / 1000) % 60);
  const m = Math.floor((time / (1000 * 60)) % 60);
  const h = Math.floor(time / (1000 * 60 * 60));

  display.textContent =
    `${String(h).padStart(2, "0")}:` +
    `${String(m).padStart(2, "0")}:` +
    `${String(s).padStart(2, "0")}:` +
    `${String(ms).padStart(3, "0")}`;
}

function start() {
  if (!running) {
    running = true;
    startTime = Date.now();
    timerInterval = setInterval(updateDisplay, 10);
  }
}

function stop() {
  if (running) {
    running = false;
    clearInterval(timerInterval);
    elapsedTime += Date.now() - startTime;
  }
}

function reset() {
  running = false;
  clearInterval(timerInterval);
  startTime = 0;
  elapsedTime = 0;
  display.textContent = "00:00:00:000";
}

startBtn.addEventListener("click", start);
stopBtn.addEventListener("click", stop);
resetBtn.addEventListener("click", reset);
