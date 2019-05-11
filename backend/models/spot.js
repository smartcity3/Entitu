const mongoose = require('mongoose');

const spotSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
});

const Spot = mongoose.model('Spot', spotSchema);

module.exports = Spot;
