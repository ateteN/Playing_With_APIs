import { apiKey } from './api_key.js';
import { currencies } from './currency_codes.js';

const fromDropDown = document.getElementById("from_currency");
const toDropDown = document.getElementById("to_currency");
const convert_button = document.getElementById("convert_button");
const amountInput = document.getElementById("amount");
const resultDisplay = document.getElementById("result");

// Populate dropdowns with all available currencies
currencies.forEach(currency => {
    let option1 = new Option(currency, currency);
    let option2 = new Option(currency, currency);
    fromDropDown.add(option1);
    toDropDown.add(option2);
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
function updateChart(rate) {
  exchangeRateChart.data.datasets[0].data = [rate]; // Update the data
  exchangeRateChart.update(); // Redraw the chart
}

// Fetch current exchange rate between USD and EUR
function fetchExchangeRate() {
  const fromCurrency = 'USD'; // You can set it dynamically based on user input
  const toCurrency = 'EUR'; // You can set it dynamically as well

  fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/latest/${fromCurrency}`)
    .then(response => response.json())
    .then(data => {
      const rate = data.conversion_rates[toCurrency];
      resultDisplay.innerText = (amount*rate).toFixed(2);
      updateChart(rate); // Update chart with the fetched rate
    })
    .catch(error => {
      console.error("Error fetching rates", error);
      resultDisplay.innerText = "Error fetching exchange rates.";
    });
}

// Call fetchExchangeRate when the page loads
fetchExchangeRate();


// Convert button click event
convert_button.onclick = () => {
    const from = fromDropDown.value;
    const to = toDropDown.value;
    const amount = amountInput.value;

    // Error handling for empty input
    if (!amount || !from || !to) {
        resultDisplay.innerText = "Please fill in Amount";
        return;
    }

    fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/latest/${from}`)
        .then(res => res.json())
        .then(data => {
            let rate = data.conversion_rates[to];
            resultDisplay.innerText = (amount * rate).toFixed(2);
        })
        .catch(error => {
            console.error("Error looking for rates", error);
            resultDisplay.innerText = "Error looking for rates";
        });
};























//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// import { apiKey } from './api_key.js';
// import { currencies } from './currency_codes.js';
// const fromDropDown = document.getElementById("from_currency");
// const toDropDown = document.getElementById("to_currency");
// const convert_button = document.getElementById("convert_button");
// const amountInput = document.getElementById("amount");
// const resultDisplay = document.getElementById("result");

// currencies.forEach(currency => {
//     let option1 = new Option(currency, currency);
//     let option2 = new Option(currency, currency);
//     fromDropDown.add(option1);
//     toDropDown.add(option2);
//     // fromDropDown.innerHTML= `<option value="${currency}">${currency}</option>`
// });

// const apiUrl = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`;

// // document.getElementById("convert_button").addEventListener("click", function(){
// //     const amount = document.getElementById("amount").value;
// //     const toCurrency = document.getElementById("to_currency").value;
// //     console.log(`Amount:${amount}, to Currency: ${toCurrency});`)

// fetch(apiUrl)
//     .then(response => response.json())
//     .then(data => console.log("Exchange rate: ", data.conversion_rates))
//     .catch(error => {
//         console.error("Error, try again later", error);
//     });


// const searchInput= document.getElementById("search_currency");
// searchInput.addEventListener("input", function(){
//     const searchTerm= searchInput.value.toLowerCase();
//     const searchingCurrencies= currencies.filter(currency=>
//         currency.toLowerCase().includes(searchTerm)
//     );
//     fromDropDown.innerHTML="";
//     toDropDown.innerHTML="";

//     searchingCurrencies.forEach(currency=> {
//         fromDropDown.innerHTML+=`<option value="${currency}">${currency}</option>`;
//         toDropDown.innerHTML+=`<option value="${currency}">${currency}</option>`;
//     });
// });

// convert_button.onclick=() =>{
//     const from = fromDropDown.value;
//     const to = toDropDown.value;
//     const amount = amountInput.value;
//     if (!amount || !from || !to){
//         resultDisplay.innerText="Please fill everything"
//         return;
//     }
//     fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/latest/${from}`)
//         .then(res => res.json())
//         .then(data =>{
//             let rate = data.conversion_rates[to];
//             resultDisplay.innerText=(amount*rate).toFixed(2);
//         })
//         .catch(error => {
//             console.error("Error looking for rates", error);
//             resultDisplay.innerText="Error looking for rates";
//         });
// };
