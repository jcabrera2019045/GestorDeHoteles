"use strict";

var express = require("express");
var hotelController = require("../controllers/hotel.controller");
var mdAuth = require("../middlewares/authenticated");

var api = express.Router();

api.post("/createHotel", mdAuth.ensureAuth, hotelController.createHotel);
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
api.get("/getHotels", hotelController.getHotels);
api.get("/getHotelById/:hotelID", mdAuth.ensureAuth, hotelController.getHotelById);

module.exports = api;
