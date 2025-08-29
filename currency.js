const convertBtn = document.getElementById("convertBtn");
const fromCurrency = document.getElementById("fromCurrency");
const toCurrency = document.getElementById("toCurrency");
const currencyInput = document.getElementById("currencyInput");
const currencyResult = document.getElementById("currencyResult");

// Example static rates (base = 1 INR)
const rates = {
  INR: { INR: 1, USD: 0.012, EUR: 0.011 },
  USD: { INR: 83.0, USD: 1, EUR: 0.93 },
  EUR: { INR: 90.0, USD: 1.07, EUR: 1 }
};

convertBtn.addEventListener("click", () => {
  const from = fromCurrency.value;
  const to = toCurrency.value;
  const amount = parseFloat(currencyInput.value);

  if (isNaN(amount)) {
    currencyResult.textContent = "Please enter a valid number.";
    return;
  }

  const rate = rates[from][to];
  const result = amount * rate;
  currencyResult.textContent = `${amount} ${from} = ${result.toFixed(2)} ${to}`;
});