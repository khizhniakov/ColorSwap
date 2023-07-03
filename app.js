const cols = document.querySelectorAll(".col");

document.addEventListener("keydown", (event) => {
  event.preventDefault();
  if (event.code.toLowerCase() === "space") {
    setRandomColors();
  }
});
document.addEventListener("click", (event) => {
  const type = event.target.dataset.type;
  if (type === "lock") {
    const node =
      event.target.tagName.toLowerCase() === "i"
        ? event.target
        : event.target.children[0];
    node.classList.toggle("fa-lock-open");
    node.classList.toggle("fa-lock");
  } else if (type === "copy") {
    copyToClickBoard(event.target.textContent);
  }
});

function copyToClickBoard(text) {
  navigator.clipboard.writeText(text);
}

function generateRandomColor() {
  const hexCodes = "0123456789ABCDEF";
  let color = "";
  for (let i = 0; i < 6; i++) {
    color += hexCodes[Math.floor(Math.random() * hexCodes.length)];
  }
  return "#" + color;
}

function setRandomColors() {
  cols.forEach((col) => {
    const isLocked = col.querySelector("i").classList.contains("fa-lock");
    const text = col.querySelector("h2");
    const button = col.querySelector("button");
    const color = chroma.random();
    if (isLocked) {
      return;
    }
    text.textContent = color;
    col.style.background = generateRandomColor();

    setTextColor(text, color);
    setTextColor(button, color);
  });
}

setRandomColors();

function setTextColor(text, color) {
  const luminance = chroma(color).luminance();
  text.style.color = luminance > 0.5 ? "black" : "white";
}
