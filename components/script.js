document.getElementById('fetch-rates').addEventListener('click', async () => {
    try {
        const response = await fetch('/api/rates');
        if (!response.ok) {
            throw new Error('Failed to fetch exchange rates');
        }
        const data = await response.json();
        document.getElementById('exchange-rates').innerHTML = `
            USD: ${data.USD}, EUR: ${data.EUR}, GBP: ${data.GBP}
        `;
    } catch (error) {
        console.error('Error fetching data:', error);
        alert('Error fetching exchange rates');
    }
});

document.getElementById('convert-currency').addEventListener('click', async () => {
    const amount = document.getElementById('amount').value;
    const fromCurrency = document.getElementById('from-currency').value;
    const toCurrency = document.getElementById('to-currency').value;

    if (!amount || isNaN(amount) || amount <= 0) {
        alert("Please enter a valid amount.");
        return;
    }

    try {
        const response = await fetch(`/api/convert?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`);
        if (!response.ok) {
            throw new Error('Conversion failed');
        }
        const result = await response.json();
        document.getElementById('conversion-result').innerHTML = `
            ${amount} ${fromCurrency} = ${result.convertedAmount} ${toCurrency}
        `;
    } catch (error) {
        console.error('Error converting currency:', error);
        alert('Error converting currency');
    }
});
