const colors = ["Turquoise", "Emerald", "Peter River", "Amethyst", "Wet Asphalt"]

function updateColor() {
        const width = window.innerWidth;
        let color;

        if (width < 300) {
          color = colors[0];
        } else if (width > 1800) {
          color = colors[4];
        } else {
          let segment = (1800 - 300) / 3;
          if (width < 300 + segment) {
            color = colors[1];
          } else if (width < 300 + 2 * segment) {
            color = colors[2];
          } else {
            color = colors[3];
          }
        }
        document.getElementById("colorName").textContent = color;
      }

window.addEventListener("resize", updateColor);
window.addEventListener("DOMContentLoaded", updateColor);