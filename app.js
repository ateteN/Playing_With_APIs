import express from "express";
import axios from "axios";
import { config } from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// Fix __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

config({ path: "./exchange.env" });

const app = express();
const port = 3002;
const API_KEY = process.env.EXCHANGE_API_KEY;
const BASE_URL = "https://v6.exchangerate-api.com/v6";

// Serve static files (script.js, styles.css, etc.) directly from the root directory
app.use(express.static(__dirname)); // Serve static files from the root directory

// Route to index.html (in the root directory)
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html")); // Directly serve index.html
});

// Fetch exchange rates
app.get("/api/rates", async (req, res) => {
  try {
    const response = await axios.get(`${BASE_URL}/${API_KEY}/latest/USD`);
    res.json(response.data.conversion_rates);
  } catch (error) {
    console.error("Error fetching currency rates:", error);
    res.status(500).json({ error: "Failed, try again?" });
  }
});

// API to convert currency
app.get("/api/convert", async (req, res) => {
  const { amount, from, to } = req.query;

  if (!amount || !from || !to) {
    return res.status(400).json({ error: "Fill in all areas" });
  }

  try {
    const response = await axios.get(`${BASE_URL}/${API_KEY}/latest/${from}`);
    const rate = response.data.conversion_rates[to];

    if (!rate) throw new Error("Invalid currency");

    const convertedAmount = (amount * rate).toFixed(2);
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
