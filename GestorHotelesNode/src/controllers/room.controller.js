"use strict";

var Hotel = require("../models/hotel.model");
var Room = require("../models/room.model");
const strings = require("../constants/strings");

exports.createRoom = (req, res) => {
    var room = new Room();
    var params = req.body;
    var hotelId = req.params.hotelId;
  
    Hotel.findById(hotelId, (er, findHotel) => {
        if (er) return res.status(500).send({ mensaje: strings.requestError });
        if (!findHotel) return res.status(500).send({mensaje: strings.notFindHotel});
        if (findHotel.manager != req.user.sub && req.user.role != strings.adminRole) return res.status(404).send({ mensaje: strings.permissionsError });
        if (params.name && params.price && params.state) {
            room.name = params.name;
            room.price = params.price;
            room.hotel = hotelId;
            room.state = params.state;
    
            Room.find({
              $and: [{ name: room.name, hotel: room.hotel }],
            }).exec((err, findedRoom) => {
              if (err)
                return res.status(500).send({ mensaje: strings.saveRoomError });
              if (findedRoom && findedRoom.length >= 1) {
                return res.status(500).send({ mensaje: strings.existingRoomError });
              } else {
                room.save((err, savedRoom) => {
                  if (err)
                    return res.status(404).send({ mensaje: strings.saveRoomError });
                  if (savedRoom) {
                    return res.status(200).send(savedRoom);
                  } else {
                    return res.status(404).send({ mensaje: strings.notSavedRoom });
                  }
                });
              }
            });
          } else {
            return res.status(500).send({ mensaje: strings.unfilledDataError });
          }
    },
    )};

    exports.updateRoom = (req, res) => {
      var roomID = req.params.roomID;
      var params = req.body;
      var hotelId;
    
      Room.findById(roomID, (er, findRoom) => {
        if (er) return res.status(500).send({ mensaje: strings.requestError });
        if (!findRoom) return res.status(500).send({mensaje: strings.notFindRoom});
        hotelId = findRoom.hotel
        Hotel.findById(
          hotelId,
        (err, findHotel) => {
          if (err) return res.status(500).send({ mensaje: strings.requestError });
          if (findHotel.manager != req.user.sub && req.user.role != strings.adminRole) return res.status(500).send({ message: strings.permissionsError });
          Room.findByIdAndUpdate(
            roomID,
            params,
            { new: true },
            (err, updateRoom) => {
              if (err) return res.status(500).send({ mensaje: strings.requestError });
              if (!updateRoom) return res.status(500).send({ mensaje: strings.updateRoomError });
              return res.status(200).send({ updateRoom });
            }
          );
        })
      });
    };

    exports.deleteRoom = (req, res) => {
      var roomID = req.params.roomID;
      var hotelId;

      Room.findById(roomID, (er, findRoom) => {
        if (er) return res.status(500).send({ mensaje: strings.requestError });
        if (!findRoom) return res.status(500).send({mensaje: strings.notFindRoom});
        hotelId = findRoom.hotel
        Hotel.findById(
          hotelId,
        (err, findHotel) => {
          if (err) return res.status(500).send({ mensaje: strings.requestError });
          if (findHotel.manager != req.user.sub && req.user.role != strings.adminRole) return res.status(500).send({ message: strings.permissionsError });
          Room.findByIdAndDelete(
            roomID,
            (err, deletedRoom) => {
              if (err) return res.status(500).send({ mensaje: strings.requestError });
              if (!deletedRoom) return res.status(500).send({ mensaje: strings.deleteRoomError });
              return res.status(200).send({ deletedRoom });
            }
          );
        })
      });
    }

    exports.getRooms = (req, res) => {
    if (req.user.role != strings.hotelAdminRole) return res.status(500).send({ message: strings.permissionsError });
    Hotel.findOne({manager: req.user.sub}, (err, findHotel) => {
      if (err) return res.status(500).send({Error: strings.requestError});
      if(!findHotel) return res.status(500).send({Error: strings.noDataError});
      Room.find({hotel: findHotel._id}, (err, rooms) => {
        if(err) return res.status(500).send({mensaje: strings.requestError});
        if(!rooms || rooms.length == 0) return res.status(500).send({mensaje: strings.noDataError});
        return res.status(200).send({Habitaciones: rooms});
      });
    })
    };

    exports.getRoomsByHotel = (req, res) => {
      var hotelId = req.params.hotelID;
      Room.find({hotel: hotelId}, (err, findedRoom) => {
        if(err) return res.status(500).send({mensaje: strings.requestError});
        if(!findedRoom || findedRoom.length == 0) return res.status(500).send({mensaje: strings.notFindRoom});
        return res.status(200).send({findedRoom});
      })
      };
  