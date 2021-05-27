'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var serviceSchema = Schema({
    name: String,
    price: Number,
    hotelId: { type: Schema.ObjectId, ref: 'hotel' },
})

module.exports = mongoose.model('service', serviceSchema);