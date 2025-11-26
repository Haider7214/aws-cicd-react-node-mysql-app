const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const apiRoutes = require('./routes/api');

const app = express();
const port = process.env.PORT || 3200;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Health check for ALB
app.get('/health', (req, res) => res.status(200).send('OK'));

// API Routes
app.use('/api', apiRoutes);

// Default route
app.get('/', (req, res) => res.send('Welcome to Multi-Tier React + Node.js + MySQL App'));

// Global error handler (optional but recommended)
app.use((err, req, res, next) => {
  console.error('Unexpected error:', err);
  res.status(500).json({ error: 'Internal Server Error' });
});

// Start server
app.listen(port, () => {
  console.log(`Backend running on port ${port}`);
});
