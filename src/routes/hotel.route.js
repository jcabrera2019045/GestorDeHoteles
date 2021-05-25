"use strict";

var express = require("express");
var hotelController = require("../controllers/hotel.controller");
var mdAuth = require("../middlewares/authenticated");

var api = express.Router();

api.post("/createHotel/:managerId", mdAuth.ensureAuth, hotelController.createHotel);
api.put(
  "/updateHotel/:hotelID",
  mdAuth.ensureAuth,
  hotelController.updateHotel
);
api.delete(
  "/deleteHotel/:hotelID",
  mdAuth.ensureAuth,
  hotelController.deleteHotel
);
api.get("/getHotels", mdAuth.ensureAuth, hotelController.getHotels);

module.exports = api;
