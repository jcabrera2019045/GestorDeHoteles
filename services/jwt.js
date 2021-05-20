'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
var key = 'clave_super_secreta_system';

exports.createTokenUser = (user)=>{
    var payload = {
        sub: user._id,
        name: user.name,
        username: user.username,
        role: user.role,
        iat: moment().unix(),
        exp: moment().add(15, "minutes").unix()
    }

    return jwt.encode(payload, key);
} 

exports.createTokenHotel = (hotel)=>{
    var payload = {
        sub: hotel._id,
        name: hotel.name,
        username: hotel.username,
        email: hotel.email,
        location: hotel.location,
        hotel: 'user_hotel',
        iat: moment().unix(),
        exp: moment().add(15, "minutes").unix()
    }

    return jwt.encode(payload, key);
}