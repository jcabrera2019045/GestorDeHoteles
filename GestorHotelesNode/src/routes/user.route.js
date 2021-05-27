"use strict";

var express = require("express");
var userController = require("../controllers/user.controller");
var mdAuth = require("../middlewares/authenticated");

var api = express.Router();

api.post("/registUser", userController.registUser);
api.post("/loginUser", userController.loginUser);
api.put("/editUser/:userId", mdAuth.ensureAuth, userController.editUser);
api.delete("/deleteUser/:userId", mdAuth.ensureAuth, userController.deleteUser);
api.get("/getUsers", mdAuth.ensureAuth, userController.getUsers);
api.get("/getHotelAdminUsers", userController.getHotelAdminUsers);
api.get("/getUserById/:userID", mdAuth.ensureAuth, userController.getUserById);

module.exports = api;
