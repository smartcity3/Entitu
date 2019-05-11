const express = require('express');
const router = express.Router();
const Spot = require('../models/spot');
const auth = require('./auth');

// Get all spots
router.get('/', auth.required, function(req, res) {
  Spot.find({}).then((spots) => {
    res.send({ spots });
  });
});

// Add new spot
router.post('/', auth.required, function(req, res) {
  const spot = new Spot({
    title: req.body.title,
  });
  spot
    .save()
    .then(() => {
      res.status(201).send({
        operation: 'ok',
      });
    })
    .catch((err) => {
      res.status(500).send({
        error: err,
      });
    });
});

router.delete('/:id', auth.required, function(req, res) {
  const id = req.params.id;
  return Spot.deleteOne({ _id: id })
    .then(() => res.status(200).json({ operation: 'ok' }))
    .catch(() => res.status(500).json({ err: 'err' }));
});


module.exports = router;
