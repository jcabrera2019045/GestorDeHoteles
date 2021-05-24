'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var billSchema = Schema({
    userId: { type: Schema.ObjectId, ref: 'user' },
    reservationId: { type: Schema.ObjectId, ref: 'reservation' },
    date: Date,
})

module.exports = mongoose.model('bill', billSchema);