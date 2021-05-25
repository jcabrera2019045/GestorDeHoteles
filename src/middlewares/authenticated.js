"use strict";

var jwt = require("jwt-simple");
var moment = require("moment");
var key = "secret_key";
const strings = require("../constants/strings");

exports.ensureAuth = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(403).send({ message: strings.requestHeadersError });
  } else {
    var token = req.headers.authorization.replace(/['"]+/g, "");
    try {
      var payload = jwt.decode(token, key);
      if (payload.exp <= moment().unix()) {
        return res.status(401).send({ message: strings.expiredToken });
      }
    } catch (ex) {
      return res.status(404).send({ message: strings.invalidToken });
    }

    req.user = payload;
    next();
  }
};
