"use strict";

var User = require("../models/user.model");
var bcrypt = require("bcrypt-nodejs");
var jwt = require("../services/jwt");
var Reservation = require("../models/reservation.model");
const strings = require("../constants/strings");

exports.createReservation = (userId) => {
  var reservation = new Reservation();
  reservation.services = [];
  reservation.userId = userId;
  reservation.startDate = "";
  reservation.endDate = "";
  reservation.roomId = "";
  reservation.hotelId = "";
}

exports.registUser = (req, res) => {
  let user = new User();
  let params = req.body;

  if (
    params.name &&
    params.lastname &&
    params.username &&
    params.email &&
    params.password
  ) {
    User.findOne(
      { $or: [{ username: params.username }, { email: params.email }] },
      (err, userFind) => {
        if (err) {
          return res.status(500).send({ message: strings.serverError });
        } else if (userFind) {
          return res.status(500).send({ message: strings.existingUserError });
        } else {
          user.name = params.name;
          user.lastname = params.lastname;
          user.username = params.username;
          user.email = params.email;
          user.role = strings.userRole;

          bcrypt.hash(params.password, null, null, (err, encryptedPass) => {
            if (err) {
              return res
                .status(500)
                .send({ message: strings.encryptPassError });
            } else if (encryptedPass) {
              user.password = encryptedPass;

              user.save((err, userSaved) => {
                if (err) {
                  return res
                    .status(500)
                    .send({ message: strings.saveuserError });
                } else if (userSaved) {
                  this.createReservation(userSaved._id);
                  return res.send({
                    message: strings.userCreated,
                    user: userSaved,
                  });
                } else {
                  return res
                    .status(404)
                    .send({ message: strings.notSavedUser });
                }
              });
            } else {
              return res.status(418).send({ message: strings.unexpectedError });
            }
          });
        }
      }
    );
  } else {
    return res.status(500).send({ message: strings.unfilledDataError });
  }
};

exports.loginUser = (req, res) => {
  var params = req.body;

  if(params.username || params.email && params.password) {
    User.findOne(
      { $or: [{ username: params.username }, { email: params.email }] },
      (err, findUser) => {
        if (err) return res.status(500).send({ mensaje: strings.requestError });
        if (findUser) {
          bcrypt.compare(
            params.password,
            findUser.password,
            (err, successfullPass) => {
              if (err)
                return res
                  .status(500)
                  .send({ mensaje: strings.comparePassError });
              if (successfullPass) {
                if (params.getToken === "true") {
                  return res.status(200).send({
                    Token: jwt.createToken(findUser),
                  });
                } else {
                  findUser.password = undefined;
                  return res.status(200).send(findUser);
                }
              } else {
                return res
                  .status(500)
                  .send({ mensaje: strings.incorrectPassError });
              }
            }
          );
        } else {
          return res.status(500).send({ mensaje: strings.notFindUserError });
        }
      }
    );
  } else {
    return res.status(500).send({ mensaje: strings.unfilledDataError });
  }
};

exports.editUser = (req, res) => {
  var userID = req.params.userId;
  var params = req.body;

        User.findByIdAndUpdate(
          userID,
          params,
          { new: true },
          (er, updatedUser) => {
            if (er)
              return res.status(500).send({ mensaje: strings.requestError });
            if (!updatedUser)
              return res.status(500).send({ mensaje: strings.updateUserError });
            return res.status(200).send({ updatedUser });
          }
        );
      };

exports.deleteUser = (req, res) => {
  const userId = req.params.userId;

  User.findByIdAndDelete(userId, (er, deletedUser) => {
    if (er) return res.status(500).send({ mensaje: strings.requestError });
    if (!deletedUser)
      return res.status(500).send({ mensaje: strings.deleteClientError });
    return res.status(200).send({ deletedUser });
  });
};

exports.getUsers = (req, res) => {
  if (req.user.role != strings.adminRole) {
    return res.status(500).send({ mensaje: strings.permissionsError });
  }

  User.find((err, findUser) => {
    if (err) return res.status(500).send({ mensaje: strings.requestError });
    if (!findUser)
      return res.status(500).send({ mensaje: strings.serverError });
    return res.status(200).send({ findUser });
  });
};

exports.getUserById = (req, res) => {
  var userId = req.params.userID;
  User.findById(userId, (err, findUser) => {
    if (err) return res.status(500).send({ mensaje: strings.requestError });
    if (!findUser)
      return res.status(500).send({ mensaje: strings.notFindUserError });
    return res.status(200).send({ findUser });
  });
}

exports.getHotelAdminUsers = (req, res) => {
  User.find({role: strings.hotelAdminRole},(err, findUser) => {
    if (err) return res.status(500).send({ mensaje: strings.requestError });
    if (!findUser && findUser.length == 0)
      return res.status(500).send({ mensaje: strings.notFindUserError });
    return res.status(200).send({ findUser });
  });
}
