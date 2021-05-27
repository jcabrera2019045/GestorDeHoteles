"use strict";

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var hotelSchema = Schema({
  name: String,
  location: String,
  manager: { type: Schema.Types.ObjectId, ref: "user" },
});

module.exports = mongoose.model("hotel", hotelSchema);
