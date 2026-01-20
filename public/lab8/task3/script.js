async function fetchMatches() {
  const resp = await fetch("/api/lab8/task3/resultsQatar22.json");
  const data = await resp.json();
  return data;
}

function determineClass(score) {
  const [a, b] = score.split("-").map((s) => parseInt(s.trim()));
  if (isNaN(a) || isNaN(b)) return "";
  if (a > b) return "win1";
  if (b > a) return "win2";
  return "draw";
}

function renderTable(matches) {
  const tbody = document.querySelector("#matches-table tbody");
  tbody.innerHTML = "";
  matches.forEach((m) => {
    const tr = document.createElement("tr");
    tr.className = determineClass(m.score);
    tr.innerHTML = `
      <td>${m.group}</td>
      <td>${m.date}</td>
      <td>${m.time}</td>
      <td>${m.team1}</td>
      <td><strong>${m.score}</strong></td>
      <td>${m.team2}</td>
      <td>${m.stadium}</td>
    `;
    tbody.appendChild(tr);
  });
}

document.getElementById("generate").addEventListener("click", async () => {
  await fetch("/api/lab8/task3/generate");
  const matches = await fetchMatches();
  renderTable(matches);
});

fetchMatches().then(renderTable);
