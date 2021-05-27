"use strict";

var express = require("express");
var serviceController = require("../controllers/service.controller");
var mdAuth = require("../middlewares/authenticated");

var api = express.Router();

api.post("/createService/:hotelID", mdAuth.ensureAuth, serviceController.createService);
api.put("/updateService/:serviceID", mdAuth.ensureAuth, serviceController.updateService);
api.delete("/deleteService/:serviceID", mdAuth.ensureAuth, serviceController.deleteService);
api.get("/getServices", mdAuth.ensureAuth, serviceController.getServices);

module.exports = api;