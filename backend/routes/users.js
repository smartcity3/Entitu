const express = require('express');
const router = express.Router();
const auth = require('./auth');
const passport = require('passport');

const User = require('../models/user');

// Register
router.post('/', auth.optional, (req, res, next) => {

  const user = req.body.user;

  if (!user.email) {
    return res.status(422).json({
      errors: {
        email: 'is required',
      },
    });
  }

  if (!user.password) {
    return res.status(422).json({
      errors: {
        password: 'is required',
      },
    });
  }

  const finalUser = new User(user);

  finalUser.setPassword(user.password);

  return finalUser
    .save()
    .then(() => res.json({ user: finalUser.toAuthJSON() }))
    .catch(() => res.status(500).json({ user: undefined }));
});

// Login
router.post('/login', auth.optional, (req, res, next) => {

  const user = req.body.user;

  if (!user.email) {
    return res.status(422).json({
      errors: {
        email: 'is required',
      },
    });
  }

  if (!user.password) {
    return res.status(422).json({
      errors: {
        password: 'is required',
      },
    });
  }

  return passport.authenticate(
    'local',
    { session: false },
    (err, passportUser, info) => {
      if (err) {
        return next(err);
      }

      if (passportUser) {
        const user = passportUser;
        user.token = passportUser.generateJWT();
        return res.json({ user: user.toAuthJSON() });
      }

      return res.status(400).json({ user: undefined, info });
    },
  )(req, res, next);
});

//GET current route (required, only authenticated users have access)
router.post('/current', auth.required, (req, res, next) => {
  const {
    payload: { id },
  } = req;

  return User.findById(id).then((user) => {
    if (!user) {
      return res.sendStatus(400);
    }

    return res.json({ user: user.toAuthJSON() });
  });
});

module.exports = router;
