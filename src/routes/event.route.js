"use strict";

var express = require("express");
var eventController = require("../controllers/event.controller");
var mdAuth = require("../middlewares/authenticated");

var api = express.Router();

api.post("/createEvent/:hotelID/:eventTypeID", mdAuth.ensureAuth, eventController.createEvent);

module.exports = api;