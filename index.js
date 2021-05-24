"use strict";

const mongoose = require("mongoose");
const app = require("./app");
const userModel = require("./src/models/user.model");
const bcrypt = require("bcrypt-nodejs");
const strings = require("./src/constants/strings");

mongoose.Promise = global.Promise;
mongoose
  .connect("mongodb://localhost:27017/GestorDeHoteles", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    var name = strings.defaultAdminName;
    var password = strings.defaultAdminPass;
    var role = strings.defaultAdminRole;
    var username = strings.defaultAdminUsername;
    var email = strings.defaultAdminEmail;
    var user = new userModel();

    user.name = name;
    user.role = role;
    user.username = username;
    user.email = email;

    userModel
      .find({ $or: [{ username: user.username }, { email: user.email }] })
      .exec((_err, findUser) => {
        if (findUser && findUser.length >= 1) {
          return console.log(strings.existingUser);
        } else {
          bcrypt.hash(password, null, null, (err, encryptedPass) => {
            if (err)
              return res.status(500).send({ mensaje: strings.requestError });
            user.password = encryptedPass;

            user.save((err, findUser) => {
              if (err)
                return res.status(500).send({ mensaje: strings.saveuserError });
              if (findUser) {
                return console.log(findUser);
              } else {
                return res.status(500).send({ mensaje: strings.notSavedUser });
              }
            });
          });
        }
      });
    app.listen(3000, function () {
      console.log(strings.serverPort);
    });
  })
  .catch((er) => console.log(er));
