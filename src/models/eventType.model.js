'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var eventTypeSchema = Schema({
    name: String,
})

module.exports = mongoose.model('eventType', eventTypeSchema);