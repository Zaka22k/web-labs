const passwordInput = document.getElementById("password");
const scoreValue = document.getElementById("scoreValue");
const criteriaList = document.getElementById("criteriaList");
const segmentsContainer = document.getElementById("segments");

for (let i = 0; i < 10; i++) {
  const seg = document.createElement("div");
  seg.classList.add("segment");
  segmentsContainer.appendChild(seg);
}

const segments = document.querySelectorAll(".segment");

passwordInput.addEventListener("input", () => {
  const password = passwordInput.value;
  const data = calculateScore(password);

  scoreValue.textContent = data.score;
  updateSegments(data.score);

  criteriaList.innerHTML = data.criteria
    .map((c) => `<span class="chip">Критерий ${c}</span>`)
    .join("");
});

function calculateScore(pw) {
  let score = 0;
  let criteria = [];

  if (pw.length === 0) return { score: 0, criteria: [] };

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
  if (/[a-zA-Zа-яА-Я]/.test(pw)) types++;
  if (/\d/.test(pw)) types++;
  if (/[^a-zA-Zа-яА-Я0-9]/.test(pw)) types++;

  const typeBonus = Math.min(types - 1, 2);
  if (typeBonus > 0) {
    score += typeBonus;
    criteria.push(`5(${typeBonus})`);
  }

  if (/[a-zа-я]/.test(pw) && /[A-ZА-Я]/.test(pw)) {
    score += 1;
    criteria.push("6");
  }

  const nonAlphaNum = pw.replace(/[a-zA-Zа-яА-Я0-9]/g, "").length;
  if (pw.length > 0 && nonAlphaNum / pw.length > 0.3) {
    score += 2;
    criteria.push("7");
  }

  if (!/([a-zA-Zа-яА-Я]{3,}|[0-9]{3,})/.test(pw)) {
    score += 2;
    criteria.push("8");
  }

  return { score: Math.min(score, 10), criteria };
}

function updateSegments(score) {
  const colors = {
    low: "var(--SystemFillColorCriticalBrush)",
    mid: "var(--SystemFillColorCautionBrush)",
    high: "var(--SystemFillColorSuccessBrush)",
    default: "var(--SubtleFillColorSecondaryBrush)",
  };

  segments.forEach((seg, i) => {
    if (i < score) {
      if (score <= 3) seg.style.backgroundColor = colors.low;
      else if (score <= 7) seg.style.backgroundColor = colors.mid;
      else seg.style.backgroundColor = colors.high;
    } else {
      seg.style.backgroundColor = colors.default;
    }
  });
}
