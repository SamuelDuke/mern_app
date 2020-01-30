const User = require("../data_models/user");

exports.getMe = (req, res, next) => {
  User.findOne({ _id: req.user._id })
    .exec()
    .then(user => {
      return res.json(user);
    })
    .catch(err => {
      console.log({ err: err });
      return res.json({ err: err });
    });
};

exports.getAll = (req, res, next) => {
  User.find()
    .exec()
    .then(users => {
      return res.json(
        users.map(user => {
          return user.infoToSend();
        })
      );
    })
    .catch(err => {
      console.log({ err: err });
      return res.json({ err: err });
    });
};

exports.getById = (req, res, next) => {
  const { userId } = req.params;

  User.findOne({ _id: userId })
    .exec()
    .then(user => {
      return res.json(user.infoToSend());
    })
    .catch(err => {
      console.log({ err: err });
      return res.json({ errMsg: `${userId} is not a valid user.` });
    });
};

exports.updateMe = (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;
  const { _id } = req.user;

  // Hashes the password if it is changed
  const hashPassword = password ? User.generateHash(password) : null;

  //Only allows these feilds to be updated
  const update = {
    firstName,
    lastName,
    email,
    password: hashPassword
  };

  for (let prop in update) if (!update[prop]) delete update[prop];

  User.findByIdAndUpdate(_id, update, { new: true })
    .exec()
    .then(user => res.json(user))
    .catch(err => {
      console.log({ err });
      return res.json({ err });
    });
};
