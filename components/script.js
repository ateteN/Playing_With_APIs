import { apiKey } from '../api_key.js';
import { currencies } from '../currency_codes.js';

const fromDropDown = document.getElementById("from_currency");
const toDropDown = document.getElementById("to_currency");
const convert_button = document.getElementById("convert_button");
const amountInput = document.getElementById("amount");
const resultDisplay = document.getElementById("result");

// Populate dropdowns with all available currencies
fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`)
  .then(response => response.json())
  .then(data => {
    const currencyCodes = Object.keys(data.conversion_rates); // Extract currency codes from API response
    currencyCodes.forEach(currency => {
      let option1 = new Option(currency, currency);
      let option2 = new Option(currency, currency);
      fromDropDown.add(option1);
      toDropDown.add(option2);
    });
    applySearchFilter();
  });


// Fetch exchange rates from API
const apiUrl = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`;

fetch(apiUrl)
    .then(response => response.json())
    .then(data => console.log("Exchange rate: ", data.conversion_rates))
    .catch(error => {
        console.error("Error, try again later", error);
    });

// Search input for filtering currencies
const searchInput = document.getElementById("search_currency");
searchInput.addEventListener("input", function() {
    const searchTerm = searchInput.value.toLowerCase();

    // Loop through options and show only matching ones
    for (let option of fromDropDown.options) {
        if (option.value.toLowerCase().includes(searchTerm)) {
            option.hidden = false;
        } else {
            option.hidden = true;
        }
    }

    for (let option of toDropDown.options) {
        if (option.value.toLowerCase().includes(searchTerm)) {
            option.hidden = false;
        } else {
            option.hidden = true;
        }
    }
});

const ctx = document.getElementById('exchangeRateChart').getContext('2d');
const exchangeRateChart = new Chart(ctx, {
  type: 'bar', // Bar chart for simplicity
  data: {
    labels: ['Exchange Rate'], // One bar for the exchange rate
    datasets: [{
      label: 'USD to EUR Exchange Rate',
      data: [0], // Initial data will be updated after fetching
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1
    }]
  },
  options: {
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Rate'
        }
      }
    }
  }
});

// Function to update the chart with the fetched data
function updateChart(rate, from_Currency, to_currency) {
  exchangeRateChart.data.datasets[0].data = [rate]; // Update the data
  exchangeRateChart.data.datasets[0].label  = `${from_Currency} to ${to_currency} Exchange Rate`;
  exchangeRateChart.update(); // Redraw the chart
}

// Fetch current exchange rate between USD and EUR
function fetchExchangeRate() {
  const from_currency = document.getElementById('from_currency').value; 
  const to_currency = document.getElementById('to_currency').value; 
  fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/latest/${from_currency}`)
    .then(response => response.json())
    .then(data => {
      const rate = data.conversion_rates[to_currency];
      resultDisplay.innerText = (amount*rate).toFixed(2);
    })
    .catch(error => {
      console.error("we couldn't find your exchange rates", error);
      resultDisplay.innerText = "we couldn't find your exchange rate";
    });
}
fetchExchangeRate();

// Convert button click event
convert_button.onclick = () => {
    const from = fromDropDown.value;
    const to = toDropDown.value;

    fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/latest/${from}`)
        .then(res => res.json())
        .then(data => {
            const rate = data.conversion_rates[to];
            resultDisplay.innerText = (amount * rate).toFixed(2);
            updateChart(rate, from_currency, to_currency)
        })
        .catch(error => {
            console.error("Error looking for rates", error);
            resultDisplay.innerText = "Error looking for rates";
        });
};

