'use strict'

var express = require('express');
var userController = require('../controllers/user.controller');
var mdAuth = require('../middlewares/authenticated');

var api = express.Router();

api.post('/saveUser', userController.saveUser);
api.post('/loginUser', userController.loginUser);
api.put('/updateUser/:idU', mdAuth.ensureAuth,userController.updateUser);
api.delete('/deleteUser/:idU', mdAuth.ensureAuth , userController.removeUser);
api.get('/listUsers', mdAuth.ensureAuthAdmin , userController.listUsers);

module.exports = api;