"use strict";

var express = require("express");
var eventTypeController = require("../controllers/eventType.controller");
var mdAuth = require("../middlewares/authenticated");

var api = express.Router();

api.post("/createEventType", mdAuth.ensureAuth, eventTypeController.createEventType);
api.put("/updateEventType/:eventTypeID", mdAuth.ensureAuth, eventTypeController.updateEventType);
api.delete("/deleteEventType/:eventTypeID", mdAuth.ensureAuth, eventTypeController.deleteEventType);
api.get("/getEventTypes", mdAuth.ensureAuth, eventTypeController.getEventTypes);

module.exports = api;