const passwordInput = document.getElementById("password");
const result = document.getElementById("result");
const segments = document.getElementById("segments");

for (let i = 0; i < 10; i++) {
  const seg = document.createElement("div");
  seg.classList.add("segment");
  segments.appendChild(seg);
}

passwordInput.addEventListener("input", () => {
  const password = passwordInput.value;
  const scoreData = calculateScore(password);
  updateSegments(scoreData.score);
  result.innerHTML = `
        <b>Критерии:</b> ${scoreData.criteria.join(", ") || "—"}<br>
        <b>Оценка:</b> ${scoreData.score}/10
      `;
});

function calculateScore(pw) {
  let score = 0;
  let criteria = [];

  if (pw.length < 5) {
    criteria.push("1");
    return { score: 0, criteria };
  }

  if (pw.length >= 5 && pw.length <= 9) {
    score += 1;
    criteria.push("2");
  } else if (pw.length >= 10 && pw.length <= 12) {
    score += 2;
    criteria.push("3");
  } else if (pw.length > 12) {
    score += 3;
    criteria.push("4");
  }

  let types = 0;
  if (/[a-zA-Z]/.test(pw)) types++;
  if (/\d/.test(pw)) types++;
  if (/[^a-zA-Z\d]/.test(pw)) types++;
  const typeBonus = Math.min(types - 1, 2);
  if (typeBonus > 0) {
    score += typeBonus;
    criteria.push(`5(${typeBonus})`);
  }

  if (/[a-z]/.test(pw) && /[A-Z]/.test(pw)) {
    score += 1;
    criteria.push("6");
  }

  const nonAlphaNum = pw.replace(/[a-zA-Z\d]/g, "").length;
  if (nonAlphaNum / pw.length > 0.3) {
    score += 2;
    criteria.push("7");
  }

  if (!/([a-zA-Z]{3,}|[0-9]{3,})/.test(pw)) {
    score += 2;
    criteria.push("8");
  }

  return { score: Math.min(score, 10), criteria };
}

function updateSegments(score) {
  const segs = document.querySelectorAll(".segment");
  segs.forEach((seg, i) => {
    seg.style.backgroundColor = "#ccc";
    if (i < score) {
      if (score <= 3) seg.style.backgroundColor = "red";
      else if (score <= 7) seg.style.backgroundColor = "yellow";
      else seg.style.backgroundColor = "green";
    }
  });
}
