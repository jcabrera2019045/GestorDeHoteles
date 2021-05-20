'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var hotelSchema = Schema({
    name: String,
    username: String,
    email: String,
    password: String,
    location: String,
    phone: String,
    qualification: String,
    price: Number,
    availableStartDate: Date,
    availableEndDate: Date
})

module.exports = mongoose.model('hotel', hotelSchema);