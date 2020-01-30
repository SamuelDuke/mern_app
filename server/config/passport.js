const passport = require("passport");

const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

const configMain = require("./main");
const User = require("../data_models/user");

module.exports = app => {
  const jwtOptions = {
    // Telling Passport to check authorization headers for JWT
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    // Telling Passport where to find the secret
    secretOrKey: configMain.jwtSecret
  };

  // Setting up JWT login strategy
  passport.use(
    new JwtStrategy(jwtOptions, function(payload, done, next) {
      User.findById(payload._id)
        .exec()
        .then(user => {
          if (user) {
            done(null, user);
          } else {
            done(null, false);
          }
        })
        .catch(err => {
          return done(err, false);
        });
    })
  );

  app.use(passport.initialize());
};
