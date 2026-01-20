document.getElementById("calcBtn").addEventListener("click", async () => {
  const a = document.getElementById("a").value;
  const b = document.getElementById("b").value;
  const operation = document.getElementById("operation").value;
  const resultDiv = document.getElementById("result");

  if (a === "" || b === "") {
    resultDiv.textContent = "Введите оба числа!";
    resultDiv.style.background =
      "var(--SystemFillColorCriticalBackgroundBrush)";
    resultDiv.style.color = "var(--SystemFillColorCriticalBrush)";
    return;
  }

  try {
    const response = await fetch(
      `/api/lab7/task1/calc?operation=${operation}&a=${a}&b=${b}`
    );
    const data = await response.json();

    if (data.error) {
      resultDiv.textContent = `Ошибка: ${data.error}`;
      resultDiv.style.background =
        "var(--SystemFillColorCriticalBackgroundBrush)";
      resultDiv.style.color = "var(--SystemFillColorCriticalBrush)";
    } else {
      resultDiv.textContent = `Результат: ${data.result}`;
      resultDiv.style.background =
        "var(--SystemFillColorSuccessBackgroundBrush)";
      resultDiv.style.color = "var(--SystemFillColorSuccessBrush)";
    }
  } catch (err) {
    resultDiv.textContent = "Ошибка соединения с сервером.";
    resultDiv.style.background =
      "var(--SystemFillColorCriticalBackgroundBrush)";
    resultDiv.style.color = "var(--SystemFillColorCriticalBrush)";
  }
});
