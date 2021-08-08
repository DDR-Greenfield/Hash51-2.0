/* eslint-disable no-console, camelcase, no-underscore-dangle, no-unused-vars */

const { Router } = require('express');
const { User } = require('../database/index');
const { Evidence } = require('../database/Evidence');

const userRouter = Router();

userRouter.post('/store/favorites', async (req, res) => {
  const { id, nasa_id } = req.body;
  console.log(nasa_id);
  await Evidence.findOne({ nasa_id })
    .then((results) => results)
    .then((data) => User.findOneAndUpdate({ _id: id },
      { $push: { favorites: data } },
      { new: true }))
    .catch((err) => console.log('Evidence Error', err));
});

userRouter.post('/pop/favorites', async (req, res) => {
  const { id } = req.body;
  await User.findById(id).populate('favorites').exec(
    async (err, result) => {
      if (err) {
        console.log(err);
      } else {
        result.save();
      }
    },
  );
});

userRouter.get('/get/favorites', (req, res) => {
  if (req.user) {
    User.findById(req.user._id)
      .then((user) => {
        const favorites = user.favorites.map((objId) => Evidence.findOne({ _id: objId }).exec());
        return Promise.all(favorites);
      }).then((favorites) => {
        res.status(200).send(favorites.reverse());
      })
      .catch((err) => console.log(err));
  }
});

// co-conspirators routes

userRouter.post('/add/conspirator', async (req, res) => {
  const { userName } = req.body;

  await User.findOne({ username: userName })
    .then((results) => results)
    .then((data) => User.findOneAndUpdate({ _id: req.user.id },
      { $push: { coConspirators: data } },
      { new: true }))
    .then((data) => res.status(200).send(data))
    .catch((err) => {
      console.log('Evidence Error', err);
      res.sendStatus(500);
    });
});

userRouter.get('/get/conspirators', (req, res) => {
  if (req.user) {
    User.findById(req.user._id)
      .then((user) => {
        const conspirators = user.coConspirators.map((objId) => User.findOne({
          _id: objId }).exec());
        return Promise.all(conspirators);
      }).then((conspirators) => {
        res.status(200).send(conspirators);
      })
      .catch((err) => console.log(err));
  }
});

userRouter.post('/update/conspirators', (req, res) => {
  const { _id, conspirator_id } = req.body;
  User.findOne({ _id }, (err, user) => {
    if (err) {
      return res.send(err);
    }
    // eslint-disable-next-line no-param-reassign
    user.coConspirators = user.coConspirators.filter((conspirator) => {
      const newConspirator = conspirator.toString();
      return newConspirator !== conspirator_id;
    });
    return user.save();
  }).then((user) => {
    res.status(200).send(user);
  });
});

userRouter.post('/conspirator/favorites', (req, res) => {
  if (req.user) {
    const { friendId } = req.body;
    User.findById(friendId)
      .then((user) => {
        const favorites = user.favorites.map((objId) => Evidence.findOne({ _id: objId }).exec());
        return Promise.all(favorites);
      }).then((favorites) => {
        res.status(200).send(favorites.reverse());
      })
      .catch((err) => console.log(err));
  }
});

userRouter.get('/user', (req, res) => {
  User.find({}, (err, users) => {
    if (err) { console.log(err); }
    return res.status(200).send(users);
  });
});

userRouter.get('/user/:id', (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      if (!user) { return res.sendStatus(404); }
      return res.status(200).send(user);
    });
});

module.exports = {
  userRouter,
};
