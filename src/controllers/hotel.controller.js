'use strict'

var Hotel = require('../models/hotel.model');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('../services/jwt');
var fs = require('fs');
const strings = require('../constants/strings');

exports.saveHotel = (req,res) => {
    let hotel = new Hotel();
    var params = req.body;

    if(params.name && params.username && params.email && params.password && params.location && params.qualification && params.availableStartDate && params.availableEndDate){
        Hotel.findOne({$or:[{name : params.name},{ username: params.username}, {email : params.email}]},(err,hotelFind)=>{
            if(err){
                res.status(500).send({ message : strings.serverError});
            } else if (hotelFind){
                res.send({message: strings.existingUserError});
            } else {
                if(params.availableStartDate <= params.availableEndDate){
                    hotel.name = params.name;
                    hotel.username = params.username;
                    hotel.email = params.email;
                    hotel.location = params.location,
                    hotel.phone = params.phone,
                    hotel.qualification = params.qualification,
                    hotel.availableStartDate = params.availableStartDate,
                    hotel.availableEndDate = params.availableEndDate

                    bcrypt.hash(params.password, null, null, (err, password)=>{
                        if(err){
                            res.status(500).send({message: strings.encryptPassError});
                        }else if(password){
                            hotel.password = password;

                            hotel.save((err, hotelSaved)=>{
                                if(err){
                                    res.status(500).send({message: strings.saveUserError});
                                }else if(hotelSaved){
                                    res.send({message: strings.succesfullyHotelCreated, Hotel: hotelSaved});
                                }else{
                                    res.status(404).send({message: strings.notSavedHotel});
                                }
                            });
                        }else{
                            res.status(418).send({message: strings.unexpectedError});
                        }
                    });
                } else {
                    res.send({ message : strings.datesRangeError});
                }
            }
        }) 
    } else {
        res.send({ message : strings.unfilledDataError});
    }
}

exports.loginHotel = (req,res) => {
    var params = req.body;

    if(params.username || params.email){
        if(params.password){
            Hotel.findOne({$or:[{username: params.username}, {email : params.email}]},(err,hotelFind)=>{
                if(err){
                    res.status(500).send({ message : strings.serverError}); 
                } else if (hotelFind){
                    bcrypt.compare(params.password, hotelFind.password, (err, passOk)=>{
                        if(err){
                            res.status(500).send({message: strings.comparePassError});
                        }else if(passOk){
                            if(params.gettoken){
                                res.send({token: jwt.createTokenHotel(hotelFind)});
                            }else{
                                res.send({message: strings.welcomeMsg,Hotel : hotelFind});
                            }
                        }else{
                            res.send({message: strings.incorrectPassError});
                        }
                    });
                } else{
                    res.send({message: strings.incorrectHotelDataError});
                }   
            })
        } else {
            res.send({message: strings.enterPassError}); 
        }
    } else {
        res.send({message: strings.enterUserError});
    }
}

exports.updateHotel = (req,res) => {
    let hotelID = req.params.idH;
    var update = req.body;

    if(hotelID != req.hotel.sub){
        res.status(403).send({ message : strings.permissionsError});
    } else {
        if(update.name || update.username || update.email || update.password){
            Hotel.findOne({$or:[{name : update.name},{ username: update.username}, {email: update.email}]},(err,hotelFind)=>{
                if (err){
                    res.status(500).send({ message : strings.serverError}); 
                } else if (hotelFind){
                    res.send({message: strings.existingUserError});
                } else {
                    if(update.password){
                        bcrypt.hash(update.password, null, null, (err, passOk)=>{
                            if(err){
                                res.status(500).send({message: strings.comparePassError});
                            }else if(passOk){
                                Hotel.findByIdAndUpdate(hotelID, {password : passOk},{new: true}, (err, hotelUpdated)=>{
                                    if(err){
                                        res.status(500).send({ message : strings.serverError}); 
                                    }else if (hotelUpdated){
                                        res.send({ HotelUpdated : hotelUpdated});
                                    } else {
                                        res.status(404).send({ message : strings.notFindHotelToUpdateError});
                                    }
                                })
                            }else{
                                res.send({message: strings.updatePassError});
                            }
                        });
                    } else {
                        Hotel.findByIdAndUpdate(hotelID, update,{new: true}, (err, hotelUpdated)=>{
                            if(err){
                                res.status(500).send({ message : strings.serverError}); 
                            }else if (hotelUpdated){
                                res.send({ HotelUpdated : hotelUpdated});
                            } else {
                                res.status(404).send({ message : strings.notFindHotelToUpdateError});
                            }
                        })
                    }
                }
            })
        } else if(update.availableStartDate || update.availableEndDate){
            if(update.availableStartDate <= update.availableEndDate){
                Hotel.findByIdAndUpdate(hotelID, update,{new: true}, (err, hotelUpdated)=>{
                    if(err){
                        res.status(500).send({ message : strings.serverError}); 
                    }else if (hotelUpdated){
                        res.send({ HotelUpdated : hotelUpdated});
                    } else {
                        res.status(404).send({ message : strings.notFindHotelToUpdateError});
                    }
                })
            } else {
                res.send({ message : strings.datesRangeError});
            }
        } else {
            Hotel.findByIdAndUpdate(hotelID, update,{new: true}, (err, hotelUpdated)=>{
                if(err){
                    res.status(500).send({ message : strings.serverError}); 
                }else if (hotelUpdated){
                    res.send({ HotelUpdated : hotelUpdated});
                } else {
                    res.status(404).send({ message : strings.notFindHotelToUpdateError});
                }
            })
        }
    }
}

exports.removeHotel = (req,res) => {
    let hotelID = req.params.idH;

    if(hotelID != req.hotel.sub){
        res.status(403).send({ message : strings.permissionsError});
    }else {
        Hotel.findByIdAndRemove(hotelID,(err,hotelRemoved)=>{
            if(err){
                res.status(500).send({ message : strings.serverError}); 
            } else if (hotelRemoved){
                res.send({ HotelRemoved : hotelRemoved});
            } else {
                res.status(404).send({ message : strings.notFindHotelToDeleteError});
            }
        })
    }
}

exports.listHotels = (req,res) => {
    Hotel.find({}, (err, hotels)=>{
        if(err){
            res.status(500).send({ message : strings.serverError}); 
        } else if (hotels){
            res.send({ Hotel: hotels});
        } else {
            res.status(404).send({ message : strings.noDataError});
        }
    });
}

exports.searchByDateRangeandQualification = (req,res) => {
    let params = req.body;

    if(params.search){
        Hotel.find({ qualification:params.search},(err, hotels)=>{
            if(err){
                res.status(500).send({ message : strings.serverError}); 
            } else if(hotels.length>0) {
                res.send({ Hotels : hotels});
            } else {
                var searchDate = new Date(params.search);
                Hotel.find({ availableStartDate: { $lte : searchDate}, availableEndDate : {$gte: searchDate}},(err, hotels)=>{
                    if(err){
                        res.status(500).send({ message : strings.serverError}); 
                    } else if(hotels) {
                        if(hotels.length>0){
                            res.send({ Hotels : hotels});
                        } else {
                            res.send({ message : strings.noDataError});
                        }
                    } else {
                        res.status(404).send({ message : strings.notFindHotelDateAndQualificationError});
                    }
                });
            }
        });
    } else if(params.startDate && params.endDate){
        Hotel.find({ availableStartDate: { $lte : params.startDate}, availableEndDate : {$gte: params.endDate}},(err, hotels)=>{
            if(err){
                res.status(500).send({ message : strings.notFindHotelDateAndQualificationError}); 
            } else if(hotels) {
                if(hotels.length>0){
                    res.send({ Hotels : hotels});
                } else {
                    res.send({ message : strings.noDataError});
                }
            } else {
                res.status(404).send({ message : strings.notFindHotelDateAndQualificationError});
            }
        });
    } else {
        res.send({ message : strings.enterDataAndQualificationError});
    }
}

exports.searchPriceAndOrderAlphabetical = (req,res) => {
    let params = req.body;

    switch(params.search){
        case strings.alphabetical :
            Hotel.find({},(err, hotel)=>{
                if(err){
                    res.status(500).send({ message : strings.serverError}); 
                } else if(hotel) {
                    res.send({ Hotels : hotel});
                } else {
                    res.status(404).send({ message : strings.noDataError});
                }
            }).sort({ name: 1});
        break;
        case strings.priceDesc : 
            Hotel.find({},(err, hotel)=>{
                if(err){
                    res.status(500).send({ message : strings.serverError}); 
                } else if(hotel) {
                    res.send({ Hotels : hotel});
                } else {
                    res.status(404).send({ message : strings.noDataError});
                }
            }).sort({ price: -1});
        break;
        case strings.priceAsc :
            Hotel.find({},(err, hotel)=>{
                if(err){
                    res.status(500).send({ message : strings.serverError}); 
                } else if(hotel) {
                    res.send({ Hotels : hotel});
                } else {
                    res.status(404).send({ message : strings.noDataError});
                }
            }).sort({ price: 1});
        break;
        default:
            res.send({message : strings.invalidOptionError});
        break;
    }
}
