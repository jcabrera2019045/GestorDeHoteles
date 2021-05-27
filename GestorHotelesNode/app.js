"use strict";

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

const user_route = require("./src/routes/user.route");
const hotel_route = require("./src/routes/hotel.route");
const room_route = require("./src/routes/room.route");
const event_type_route = require("./src/routes/eventType.route");
const event_route = require("./src/routes/event.route");
const service_route = require("./src/routes/service.route");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());
app.use("/api", user_route, hotel_route, room_route, event_type_route, event_route, service_route);

module.exports = app;
