const mongoose = require('mongoose');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const { config } = require('../config/secret');



const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  date_created: { type: Date, default: Date.now },
  role: { type: String, default: "user" }
});

exports.UserModel = mongoose.model('users', userSchema);

exports.createToken = (user) => {
  const SECRET = config.tokenSecret;
  return jwt.sign({ _id: user._id, role: user.role }, SECRET, { expiresIn: '60m' });
};

exports.validateUser = (userToValidate) => {
  const schema = Joi.object({
    name: Joi.string().min(2).max(99).required(),
    email: Joi.string().email().min(5).max(99).required(),
    password: Joi.string().min(3).max(99).required(),
     role: Joi.string().valid('user', 'admin').default('user')
  });
  return schema.validate(userToValidate, { abortEarly: false });
};

exports.validLogin = (body) => {
  const schema = Joi.object({
    email: Joi.string().email().min(5).max(99).required(),
    password: Joi.string().min(3).max(99).required()
  });
  return schema.validate(body, { abortEarly: false });
};
