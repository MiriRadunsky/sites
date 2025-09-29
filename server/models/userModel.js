const mongoose = require('mongoose');
const Joi = require('joi');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  date_created: { type: Date, default: Date.now } 
});

exports.UserModel = mongoose.model('users', userSchema);

exports.createToken = (user_id) => {
  const SECRET = process.env.JWT_SECRET || 'MaorSecret'; 
  return jwt.sign({ _id: user_id }, SECRET, { expiresIn: '60m' }); 
};

exports.validateUser = (userToValidate) => {
  const schema = Joi.object({
    name: Joi.string().min(2).max(99).required(),
    email: Joi.string().email().min(5).max(99).required(),
    password: Joi.string().min(3).max(99).required(),
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
