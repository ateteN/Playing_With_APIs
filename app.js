const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

// Serve static files from the 'components' folder
app.use(express.static(path.join(__dirname, 'components')));

// Basic route to send index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'components', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});