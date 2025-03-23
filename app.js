const express = require("express");
const path = require("path");
const axios = require("axios");
const dotenv = require("dotenv");

dotenv.config({ path: './exchange.env' }); // Ensure .env is loaded correctly

const app = express();
const port = 3000;

const API_KEY = process.env.EXCHANGE_API_KEY; // Ensure this is correct
const BASE_URL = "https://v6.exchangerate-api.com/v6"; // Base URL for the API

// Serve static files from the 'components' folder
app.use(express.static(path.join(__dirname, "components")));

// Route to serve index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "components", "index.html"));
});

// API to fetch exchange rates
app.get("/api/rates", async (req, res) => {
  try {
    const response = await axios.get(`${BASE_URL}/${API_KEY}/latest/USD`);
    res.json(response.data.conversion_rates); // Return exchange rates in JSON format
  } catch (error) {
    console.error("Error fetching exchange rates:", error);
    res.status(500).json({ error: "Failed to fetch exchange rates" });
  }
});

// API to convert currency
app.get("/api/convert", async (req, res) => {
    const { amount, from, to } = req.query;
  
    if (!amount || !from || !to) {
      return res.status(400).json({ error: "Missing required parameters" });
    }
  
    try {
      const response = await axios.get(`${BASE_URL}/${API_KEY}/latest/${from}`);
      const rate = response.data.conversion_rates[to];
      if (!rate) throw new Error("Invalid currency");
  
      const convertedAmount = (amount * rate).toFixed(2); // Convert the amount
      res.json({ convertedAmount });
    } catch (error) {
      console.error("Error converting currency:", error);
      res.status(500).json({ error: "Conversion failed" });
    }
  });

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
