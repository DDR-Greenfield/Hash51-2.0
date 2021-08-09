/* eslint-disable no-console  */
/* eslint-disable no-unused-vars, no-param-reassign  */
const { Router } = require('express');
const passport = require('passport');
const path = require('path');
const cors = require('cors');

const { User } = require('../database/index');

const passportRouter = Router();

// Local Strategy //
passportRouter.post('/register', (req, res) => {
  const { username, password } = req.body;
  User.register({ username }, password, async (err, user) => {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    } else {
      passport.authenticate('local')(req, res, async (error, result) => {
        await User.findOneAndUpdate(
          { username },
          {
            source: 'local',
            email: username,
            profileImage: 'https://insa.or.id/wp-content/uploads/2017/02/profile-default-large.jpg',
          },
        );
        res.status(200).redirect('/userLogin');
      });
    }
  });
});

passportRouter.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = new User({ username, password });
  req.login(user, (err) => {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    } else {
      passport.authenticate('local')(req, res, (error, result) => {
        res.status(200).send(req.user);
      });
    }
  });
});

passportRouter.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    console.log('user successfully logged out');
  });
});

// Google Strategy //
passportRouter.get(
  '/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }),
  (req, res) => res.status(200).send(req.user),
);

passportRouter.get(
  '/auth/google/login',
  passport.authenticate('google', { failureRedirect: 'http://localhost:3000/error' }),
  (req, res) => {
    res.redirect('/');
  },
);

passportRouter.get('/getUser', (req, res) => {
  res.send(req.user);
});

module.exports = {
  passportRouter,
};
