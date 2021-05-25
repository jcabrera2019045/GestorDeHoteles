'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var eventSchema = Schema({
    name: String,
    eventTypeId: { type: Schema.ObjectId, ref: 'eventType' },
    capacity: Number,
    hotelId: { type: Schema.ObjectId, ref: 'hotel' },
    date: String,
})

module.exports = mongoose.model('event', eventSchema);