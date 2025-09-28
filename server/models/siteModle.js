const mongoose = require('mongoose');
const joi = require('joi');

let siteSchema = new mongoose.Schema({
    name: String,
    url: String,
    image: String,
    score: Number
});

exports.validateSite = (siteToValidate) => {
    let schema = joi.object({
        name: joi.string().min(2).required(),
        url: joi.string().uri().min(5).max(200).required(),
        image: joi.string().uri().min(5).max(300).required(),
        score: joi.number().min(0).max(10).required(),
    });
    return schema.validate(siteToValidate);
}

exports.SiteModel = mongoose.model('sites', siteSchema);