// Imports
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Routes
const spots = require('./routes/spots');
const users = require('./routes/users');

// Connect to the DB
require('./db/mongoose');

// Passport
require('./config/passport');

// Create Express app
const app = express();

app.disable('x-powered-by');
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: false }));
app.use(cors());
app.use(require('morgan')('dev'));

// Use routes
app.use('/api/spots', spots);
app.use('/api/users', users);

// Error handler
app.use(function(err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    return res.status(403).send({
      success: false,
      message: 'No token provided.',
    });
  }
});

// Health check
app.get('/ping', (req, res) => {
  res.status(200).send('pong');
});

module.exports = app;
