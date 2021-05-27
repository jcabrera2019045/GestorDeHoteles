"use strict";

var Hotel = require("../models/hotel.model");
var User = require("../models/user.model");
const strings = require("../constants/strings");

exports.createHotel = (req, res) => {
  var hotel = new Hotel();
  var params = req.body;
  var managerId = params.manager;

  if (req.user.role === strings.adminRole) {
    if (params.name && params.location && params.manager) {
      hotel.name = params.name;
      hotel.location = params.location;
      hotel.manager = managerId;

      User.findById(managerId, (er, findUser) => {
        if (er) return res.status(500).send({ mensaje: strings.requestError });
        if (findUser.role != strings.hotelAdminRole)
          return res.status(500).send({ mensaje: strings.managerRoleError });
      });

      Hotel.find({
        manager: managerId,
      }).exec((err, findHotel) => {
        if(err) return res.status(500).send({mensaje: strings.requestError});
        if(findHotel && findHotel.length >= 1) return res.status(500).send({mensaje: strings.managerError});
        Hotel.find({
          $and: [{ name: hotel.name, location: hotel.location }],
        }).exec((err, findedHotel) => {
          console.log(findedHotel);
          if (err)
            return res.status(500).send({ mensaje: strings.saveHotelError });
          if (findedHotel && findedHotel.length >= 1) {
            return res.status(500).send({ mensaje: strings.existingHotelError });
          } else {
            hotel.save((err, savedHotel) => {
              if (err)
                return res.status(500).send({ mensaje: strings.saveHotelError });
  
              if (savedHotel) {
                return res.status(200).send(savedHotel);
              } else {
                return res.status(500).send({ mensaje: strings.notSavedHotel });
              }
            });
          }
        });
      }) 
    } else {
      return res.status(500).send({ mensaje: strings.unfilledDataError });
    }
  } else {
    return res.status(500).send({ mensaje: strings.permissionsError });
  }
};

exports.updateHotel = (req, res) => {
  var hotelID = req.params.hotelID;
  var params = req.body;

  Hotel.findById(hotelID, (er, findHotel) => {
    if (er) return res.status(500).send({ mensaje: strings.requestError });
    if (findHotel.manager != req.user.sub && req.user.role != strings.adminRole) return res.status(500).send({ mensaje: strings.permissionsError });
    
    Hotel.findByIdAndUpdate(
      hotelID,
      params,
      { new: true },
      (err, updatedHotel) => {
        if (err) return res.status(500).send({ mensaje: strings.requestError });
        if (!updatedHotel) return res.status(500).send({ mensaje: strings.updateHotelError });
        return res.status(200).send({ updatedHotel });
      }
    );
  });
};

exports.deleteHotel = (req, res) => {
  const hotelID = req.params.hotelID;
  if (req.user.role != strings.adminRole) return res.status(500).send({ mensaje: strings.permissionsError });
    Hotel.findByIdAndDelete(
      hotelID,
      (err, deletedHotel) => {
        if (err) return res.status(500).send({ mensaje: strings.requestError });
        if (!deletedHotel) return res.status(500).send({ mensaje: strings.notFindHotelToDeleteError });
        return res.status(200).send({ deletedHotel });
      }
    );
}

exports.getHotels = (req, res) => {
  Hotel.find({}, (err, hotels) => {
    if (err) {
      res.status(500).send({ message: strings.requestError });
    } else if (hotels) {
      res.send({ Hotel: hotels });
    } else {
      res.status(404).send({ message: strings.noDataError });
    }
  });
};

exports.getHotelById = (req, res) => {
  var hotelID = req.params.hotelID;
  Hotel.findById(hotelID, (err, findedHotel) => {
    if(err) return res.status(500).send({Error: strings.requestError})
    if(!findedHotel) return res.status(500).send({Error: strings.notFindHotel});
    return res.status(200).send(findedHotel);
  })
}

