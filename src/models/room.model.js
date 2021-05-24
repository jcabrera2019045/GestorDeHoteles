'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var roomSchema = Schema({
    name: String,
    price: Number,
    hotelId: { type: Schema.ObjectId, ref: 'hotel' },
    state: String,
})

module.exports = mongoose.model('room', roomSchema);