// Select DOM elements
const display = document.getElementById("display");
const darkToggle = document.getElementById("darkToggle");
const modeToggle = document.getElementById("modeToggle");
const basicButtonsDiv = document.querySelector(".basic-mode");
const scientificButtonsDiv = document.querySelector(".scientific-mode");
const currencyMode = document.querySelector(".currency-mode");

// ------------------------------
// DARK MODE TOGGLE
darkToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

// ------------------------------
// MODE SWITCHING
document.querySelectorAll('.mode-btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    const mode = e.target.dataset.mode;

    basicButtonsDiv.classList.add("hidden");
    scientificButtonsDiv.classList.add("hidden");
    currencyMode.classList.add("hidden");

    if (mode === "basic") basicButtonsDiv.classList.remove("hidden");
    if (mode === "scientific") scientificButtonsDiv.classList.remove("hidden");
    if (mode === "currency") currencyMode.classList.remove("hidden");

    display.value = "";
  });
});


// ------------------------------
// BASIC CALCULATOR BUTTONS
const basicButtons = [
  "7", "8", "9", "/",
  "4", "5", "6", "*",
  "1", "2", "3", "-",
  "0", ".", "=", "+"
];

// Create basic buttons dynamically
basicButtons.forEach(val => {
  const btn = document.createElement("button");
  btn.innerText = val;
  btn.addEventListener("click", () => handleBasicInput(val));
  basicButtonsDiv.appendChild(btn);
});

function handleBasicInput(val) {
  if (val === "=") {
    try {
      display.value = eval(display.value);
    } catch {
      display.value = "Error";
    }
  } else {
    display.value += val;
  }
}

// ------------------------------
// SCIENTIFIC CALCULATOR BUTTONS
const scientificButtons = [
  "sin", "cos", "tan", "log",
  "ln", "^", "√", "!",
  "(", ")", "π", "e",
  "C", "←", 
  "7", "8", "9", "/",
  "4", "5", "6", "*",
  "1", "2", "3", "-",
  "0", ".", "=", "+"
];


scientificButtons.forEach(val => {
  const btn = document.createElement("button");
  btn.innerText = val;
  btn.addEventListener("click", () => handleScientificInput(val));
  scientificButtonsDiv.appendChild(btn);
});

function handleScientificInput(val) {
  let exp = display.value;

  switch (val) {
    case "=":
      try {
        // Replace symbols with functions
        exp = exp.replace(/π/g, Math.PI).replace(/e/g, Math.E);
        exp = exp.replace(/\^/g, "**").replace(/√/g, "Math.sqrt");
        display.value = eval(exp);
      } catch {
        display.value = "Error";
      }
      break;
    case "sin": display.value += "Math.sin("; break;
    case "cos": display.value += "Math.cos("; break;
    case "tan": display.value += "Math.tan("; break;
    case "log": display.value += "Math.log10("; break;
    case "ln": display.value += "Math.log("; break;
    case "!": display.value = factorial(Number(display.value)); break;
    case "C": display.value = ""; break;
    case "←": display.value = display.value.slice(0, -1); break;
    default: display.value += val;
  }
}

function factorial(n) {
  if (n < 0) return "Error";
  return n <= 1 ? 1 : n * factorial(n - 1);
}

// ------------------------------
// KEYBOARD INPUT SUPPORT
document.addEventListener("keydown", (e) => {
  const key = e.key;
  if ("0123456789+-*/().".includes(key)) {
    display.value += key;
  } else if (key === "Enter") {
    try {
      display.value = eval(display.value);
    } catch {
      display.value = "Error";
    }
  } else if (key === "Backspace") {
    display.value = display.value.slice(0, -1);
  }
});