'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var billSchema = Schema({
    user: { type: Schema.ObjectId, ref: 'user' },
    reservation: { type: Schema.ObjectId, ref: 'reservation' },
    date: String,
})

module.exports = mongoose.model('bill', billSchema);