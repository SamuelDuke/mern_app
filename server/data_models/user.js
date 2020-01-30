const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");

const UserSchema = new Schema({
  firstName: {
    type: String,
    index: true,
    required: [true, "You must submit a first name."]
  },
  lastName: {
    type: String,
    index: true,
    required: [true, "You must submit a last name."]
  },
  email: {
    type: String,
    index: true,
    lowercase: true,
    required: [true, "You must submit a email."],
    unique: true
  },
  password: { type: String, required: [true, "You must submit a password."] }
});

// methods ======================

// generating a hash
UserSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
UserSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

// info to send
UserSchema.methods.infoToSend = function() {
  return {
    firstName: this.firstName,
    lastName: this.lastName,
    _id: this._id
  };
};

UserSchema.pre("save", function(next) {
  let user = this;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified("password")) return next();

  user.password = user.generateHash(user.password);
  next();
});

module.exports = mongoose.model("User", UserSchema);
