const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const apiRoutes = require('./routes/api');

const app = express();
const port = process.env.PORT || 3200;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Health check for ALB
app.get('/health', (req, res) => res.status(200).send('OK'));

// API Routes
app.use('/api', apiRoutes);

// Default route
app.get('/', (req, res) => res.send('Welcome to Multi-Tier React + Node.js + MySQL App'));

app.listen(port, () => {
  console.log(`Backend running on port ${port}`);
});
