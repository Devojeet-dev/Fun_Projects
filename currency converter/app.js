// app.js
const BASE_URL = "https://v6.exchangerate-api.com/v6/323544c260add48663bbc82a/latest/USD";

const dropdowns = document.querySelectorAll(".dropdown select");
const amountInput = document.querySelector(".amount input");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");
// Function to fetch and update exchange rates
const updateExchangeRate = async () => {
  try {
    const amount = parseFloat(amountInput.value) || 1;

    const response = await fetch(BASE_URL);
    const data = await response.json();

    if (data.result === "success") {
      const conversionRate = data.conversion_rates[toCurr.value];
      const convertedAmount = (amount * conversionRate).toFixed(2);
      msg.innerText = `${amount} ${fromCurr.value} = ${convertedAmount} ${toCurr.value}`;
    } else {
      throw new Error("Failed to fetch exchange rates.");
    }
  } catch (error) {
    console.error("Error fetching exchange rates:", error);
    msg.innerText = "Failed to fetch exchange rates. Please try again later.";
  }
};

// Function to update flag images (uses countryList from codes.js)
const updateFlag = (element) => {
  const currCode = element.value;
  const img = element.parentElement.querySelector("img");
  img.src = `https://flagsapi.com/${countryList[currCode]}/flat/64.png`; 
};

// Populate currency options in dropdowns
for (let select of dropdowns) {
  for (const currCode in countryList) { 
    const option = document.createElement("option");
    option.value = currCode;
    option.text = currCode;
    select.add(option);
  }

  select.addEventListener("change", (e) => {
    updateFlag(e.target);
    updateExchangeRate();
  });
}

// Initial exchange rate update and event listeners
updateExchangeRate(); // Fetch rates on page load
amountInput.addEventListener("input", updateExchangeRate);