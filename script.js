// This is the web address we ask for the latest exchange rates.
// It provides a list of how much each currency is worth compared to USD.
const api = "https://api.exchangerate-api.com/v4/latest/USD";

// These lines find parts of the page so our code can read inputs and show results.
let search = document.querySelector(".searchBox");
let convert = document.querySelector(".convert");
let fromCurrecy = document.querySelector(".from");
let toCurrecy = document.querySelector(".to");
let finalValue = document.querySelector(".finalValue");
let finalAmount = document.getElementById("finalAmount");
let resultFrom;
let resultTo;
let searchValue;

// When you pick the currency you HAVE, remember that choice.
fromCurrecy.addEventListener('change', (event) => {
    resultFrom = `${event.target.value}`;
});

// When you pick the currency you WANT, remember that choice.
toCurrecy.addEventListener('change', (event) => {
    resultTo = `${event.target.value}`;
});

// When you type an amount, keep track of what you typed.
search.addEventListener('input', updateValue);

// Save the latest number you typed in the box.
function updateValue(e) {
    searchValue = e.target.value;
}

// When you click the Convert button, start the process of getting rates and calculating.
convert.addEventListener("click", getResults);

// Ask the exchange-rate service for the latest rates, then show the result.
function getResults() {
    fetch(`${api}`)
        .then(currency => {
            return currency.json();
        }).then(displayResults);
}

// Calculate and show the converted amount.
// Example: If 1 USD = 0.9 EUR and 1 USD = 83 INR, then to go INR -> EUR we do EUR/INR.
function displayResults(currency) {
    let fromRate = currency.rates[resultFrom];
    let toRate = currency.rates[resultTo];
    finalValue.innerHTML =
        ((toRate / fromRate) * searchValue).toFixed(2);
    finalAmount.style.display = "block";
}

// The Reset button simply reloads the page to clear everything.
function clearVal() {
    window.location.reload();
    document.getElementsByClassName("finalValue").innerHTML = "";
};