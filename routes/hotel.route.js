'use strict'

var express = require('express');
var hotelController = require('../controllers/hotel.controller');
var mdAuth = require('../middlewares/authenticated');

var api = express.Router();

api.post('/saveHotel', mdAuth.ensureAuthAdmin, hotelController.saveHotel);
api.post('/loginHotel',hotelController.loginHotel);
api.put('/updateHotel/:idH', mdAuth.ensureAuthHotel, hotelController.updateHotel);
api.delete('/deleteHotel/:idH', mdAuth.ensureAuthHotel , hotelController.removeHotel);
api.get('/listHotels', mdAuth.ensureAuth , hotelController.listHotels);
api.post('/searchByDateRangeandQualification', mdAuth.ensureAuth, hotelController.searchByDateRangeandQualification);
api.post('/searchPriceAndOrderAlphabetical', mdAuth.ensureAuth, hotelController.searchPriceAndOrderAlphabetical);

module.exports = api;