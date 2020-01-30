const jwt = require("jsonwebtoken");
const configMain = require("../config/main");

const User = require("../data_models/user");

const generateToken = user => {
  return jwt.sign(user, configMain.jwtSecret, {
    expiresIn: configMain.jwtExpiration // in seconds
  });
};

exports.createUser = (req, res, next) => {
  console.log(req.body);
  //ToDo add validation on email, password, etc
  const { firstName, lastName, email, password } = req.body;

  User({
    firstName,
    lastName,
    password,
    email: email.toLowerCase()
  })
    .save()
    .then(user => {
      return res.status(201).json(user.infoToSend());
    })
    .catch(err => {
      res.status(500).json(err);
      return next(err);
    });
};

exports.login = (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email: email })
    .exec()
    .then(user => {
      if (user === null) {
        res.status(200).json({
          err: true,
          errMsg: "The UVID and password did not match."
        });
      }

      if (user.validPassword(password)) {
        res.status(200).json({ token: generateToken(user.infoToSend()) });
      } else {
        res.status(200).json({
          err: true,
          errMsg: "The UVID and password did not match."
        });
      }
    })
    .catch(err => {
      res.status(500).json(err);
      return next(err);
    });
};
