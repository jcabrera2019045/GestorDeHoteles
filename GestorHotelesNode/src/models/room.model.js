'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var roomSchema = Schema({
    name: String,
    price: Number,
    hotel: { type: Schema.ObjectId, ref: 'hotel' },
    state: Boolean,
})

module.exports = mongoose.model('room', roomSchema);