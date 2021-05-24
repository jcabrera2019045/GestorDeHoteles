"use strict";

var User = require("../models/user.model");
var bcrypt = require("bcrypt-nodejs");
var jwt = require("../services/jwt");
const strings = require("../constants/strings");

exports.registUser = (req, res) => {
  let user = new User();
  let params = req.body;

  if (params.name && params.username && params.email && params.password) {
    if (params.role != null)
      return res.status(500).send({ message: strings.cantAssignRoleError });
    User.findOne(
      { $or: [{ username: params.username }, { email: params.email }] },
      (err, userFind) => {
        if (err) {
          res.status(500).send({ message: strings.serverError });
        } else if (userFind) {
          res.send({ message: strings.existingUserError });
        } else {
          user.name = params.name;
          user.username = params.username;
          user.email = params.email;
          user.role = strings.userRole;

          bcrypt.hash(params.password, null, null, (err, encryptedPass) => {
            if (err) {
              res.status(500).send({ message: strings.encryptPassError });
            } else if (encryptedPass) {
              user.password = encryptedPass;

              user.save((err, userSaved) => {
                if (err) {
                  res.status(500).send({ message: strings.saveuserError });
                } else if (userSaved) {
                  res.send({ message: strings.userCreated, user: userSaved });
                } else {
                  res.status(404).send({ message: strings.notSavedUser });
                }
              });
            } else {
              res.status(418).send({ message: strings.unexpectedError });
            }
          });
        }
      }
    );
  } else {
    res.send({ message: strings.unfilledDataError });
  }
};

exports.loginUser = (req, res) => {
  var params = req.body;

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
                .status(404)
                .send({ mensaje: strings.incorrectPassError });
            }
          }
        );
      } else {
        return res.status(404).send({ mensaje: strings.notFindUserError });
      }
    }
  );
};

exports.editUser = (req, res) => {
  var userID = req.params.userId;
  var params = req.body;

  if (userID != req.user.sub) {
    return res.status(500).send({ mensaje: strings.permissionsError });
  }
  if (params.role != null) {
    return res.status(500).send({ mensaje: strings.cantUpdateRole });
  }
  User.find(
    { $or: [{ username: params.username }, { email: params.email }] },
    (err, userFind) => {
      if (err) {
        return res.status(500).send({ message: strings.unexpectedError });
      } else if (userFind) {
        return res.status(500).send({ message: strings.existingUserError });
      } else {
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
      }
    }
  );
};

exports.deleteUser = (req, res) => {
  const userId = req.params.userId;

  if (userId != req.user.sub) {
    return res.status(500).send({ mensaje: strings.permissionsError });
  }

  User.findByIdAndDelete(userId, (er, deletedUser) => {
    if (er) return res.status(500).send({ mensaje: strings.requestError });
    if (!deletedUser)
      return res.status(500).send({ mensaje: strings.deleteClientError });
    return res.status(200).send({ deletedUser });
  });
};

exports.getUsers = (req, res) => {
  if (req.user.sub == null) {
    return res.status(500).send({ mensaje: strings.requestHeadersError });
  }

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
