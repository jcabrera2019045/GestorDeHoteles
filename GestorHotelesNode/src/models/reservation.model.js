'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var reservationSchema = Schema({
    userId: { type: Schema.ObjectId, ref: 'user' },
    startDate: String,
    endDate: String,
    roomId: { type: Schema.ObjectId, ref: 'room' },
    hotelId: { type: Schema.ObjectId, ref: 'hotel' },
    services: [{
        price: Number,
        name: String,
        serviceId: { type: Schema.ObjectId, ref: 'service' },
    }]
})

module.exports = mongoose.model('reservation', reservationSchema);