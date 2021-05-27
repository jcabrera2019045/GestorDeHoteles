"use strict";

var express = require("express");
var eventController = require("../controllers/event.controller");
var mdAuth = require("../middlewares/authenticated");

var api = express.Router();

api.post("/createEvent/:hotelID/:eventTypeID", mdAuth.ensureAuth, eventController.createEvent);
api.put("/updateEvent/:eventID", mdAuth.ensureAuth, eventController.updateEvent);
api.delete("/deleteEvent/:eventID", mdAuth.ensureAuth, eventController.deleteEvent);
api.get("/getEvents/:hotelID", eventController.getEvents);

module.exports = api;