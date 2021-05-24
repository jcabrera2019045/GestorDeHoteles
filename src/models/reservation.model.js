'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var reservationSchema = Schema({
    userId: { type: Schema.ObjectId, ref: 'user' },
    startDate: Date,
    endDate: Date,
    roomId: { type: Schema.ObjectId, ref: 'room' },
    hotelId: { type: Schema.ObjectId, ref: 'hotel' },
    serviceId: { type: Schema.ObjectId, ref: 'service' },
})

module.exports = mongoose.model('reservation', reservationSchema);