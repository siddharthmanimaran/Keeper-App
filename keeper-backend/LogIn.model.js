const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// const Joi = require("joi");

let newUser = new Schema({
  userName: {
    type: String,
    required: true,
    // minlength: 5,
    // maxlength: 20,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    // minlength: 5,
    // maxlength: 50,
  },
});

module.exports = mongoose.model("newUser", newUser);
