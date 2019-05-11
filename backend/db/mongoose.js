'use strict';

const mongoose = require('mongoose');

mongoose.Promise = require('bluebird');

mongoose.connect('mongodb://localhost/groundifly', { useNewUrlParser: true });

let db = mongoose.connection;

db.on('error', function(err) {
  console.error('Connection error:', err.message);
});

db.once('open', function callback() {
  console.info('Connected to DB!');
});

db.on('disconnected', function() {
  console.log('disconnected');
  //reconnect if disconnected
  mongoose.connect('mongodb://localhost/groundifly');
});

module.exports = mongoose;
