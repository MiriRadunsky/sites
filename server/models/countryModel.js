const mongoose = require('mongoose')
const Joi = require("joi")

let countrySchema = new mongoose.Schema({
    name: String,
    capital: String,
    pop: Number,
    image: String,
    date:{
        type:Date,
        default:Date.now()
    },
    user_id:String
})

exports.CountryModel=mongoose.model('countries', countrySchema)

exports.ValidateCountry = (body) => {
  const schema = Joi.object({
    name:    Joi.string().min(2).required(),
    capital: Joi.string().min(2).max(200).required(),
    pop:     Joi.number().min(0).max(99999999999999).required(),
    image:   Joi.string().min(5).max(300).allow('', null),
    user_id: Joi.any().strip(),     
    date:    Joi.date().optional()
  });
  return schema.validate(body, { abortEarly: false });
};
