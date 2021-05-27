"use strict";

var express = require("express");
var roomController = require("../controllers/room.controller");
var mdAuth = require("../middlewares/authenticated");

var api = express.Router();

api.post("/createRoom/:hotelId", mdAuth.ensureAuth, roomController.createRoom);
api.put("/updateRoom/:roomID", mdAuth.ensureAuth, roomController.updateRoom);
api.delete("/deleteRoom/:roomID", mdAuth.ensureAuth, roomController.deleteRoom);
api.get("/getRooms", mdAuth.ensureAuth, roomController.getRooms);
api.get("/getRoomsByHotel/:hotelID", roomController.getRoomsByHotel);

module.exports = api;