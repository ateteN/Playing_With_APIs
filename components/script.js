document.getElementById('fetch-rates').addEventListener('click', async () => {
    try {
      const response = await fetch('/api/rates');
      const data = await response.json();
      document.getElementById('conversion-result').innerHTML = `
        USD: ${data.USD}, EUR: ${data.EUR}, GBP: ${data.GBP}
      `;
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  });