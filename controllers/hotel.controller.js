'use strict'

var Hotel = require('../models/hotel.model');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('../services/jwt');
var fs = require('fs');

function saveHotel(req,res){
    let hotel = new Hotel();
    var params = req.body;

    if(params.name && params.username && params.email && params.password && params.location && params.qualification && params.availableStartDate && params.availableEndDate){
        Hotel.findOne({$or:[{name : params.name},{ username: params.username}, {email : params.email}]},(err,hotelFind)=>{
            if(err){
                res.status(500).send({ message : 'Error general en el servidor inténtelo más tarde'});
            } else if (hotelFind){
                res.send({message: 'Usuario o correo ingresados ya existen en el sistema'});
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
                            res.status(500).send({message: 'Error al encriptar contraseña'});
                        }else if(password){
                            hotel.password = password;

                            hotel.save((err, hotelSaved)=>{
                                if(err){
                                    res.status(500).send({message: 'Error general al guardar usuario'});
                                }else if(hotelSaved){
                                    res.send({message: 'Hotel creado', Hotel: hotelSaved});
                                }else{
                                    res.status(404).send({message: 'Se a producido un error usuario no guardado'});
                                }
                            });
                        }else{
                            res.status(418).send({message: 'Error inesperado'});
                        }
                    });
                } else {
                    res.send({ message : 'El rango de fechas ingresado es incorrecto'});
                }
            }
        }) 
    } else {
        res.send({ message : 'Ingrese todo los datos necesarios'});
    }
}

function loginHotel(req,res){
    var params = req.body;

    if(params.username || params.email){
        if(params.password){
            Hotel.findOne({$or:[{username: params.username}, {email : params.email}]},(err,hotelFind)=>{
                if(err){
                    res.status(500).send({ message : 'Error general en el servidor inténtelo más tarde'}); 
                } else if (hotelFind){
                    bcrypt.compare(params.password, hotelFind.password, (err, passworOk)=>{
                        if(err){
                            res.status(500).send({message: 'Se a producido un error al comparar las contraseñas'});
                        }else if(passworOk){
                            if(params.gettoken){
                                res.send({token: jwt.createTokenHotel(hotelFind)});
                            }else{
                                res.send({message: 'Bienvenido',Hotel : hotelFind});
                            }
                        }else{
                            res.send({message: 'Contraseña ingresada incorrecta'});
                        }
                    });
                } else{
                    res.send({message: 'Datos de hotel incorrectos'});
                }   
            })
        } else {
            res.send({message: 'Debe de ingresas su contraseña'}); 
        }
    } else {
        res.send({message: 'Debe de ingresar su correo o su username'});
    }
}

function updateHotel(req,res){
    let hotelID = req.params.idH;
    var update = req.body;

    if(hotelID != req.hotel.sub){
        res.status(403).send({ message : 'Error, no tiene permisos para esta ruta'});
    } else {
        if(update.name || update.username || update.email || update.password){
            Hotel.findOne({$or:[{name : update.name},{ username: update.username}, {email: update.email}]},(err,hotelFind)=>{
                if (err){
                    res.status(500).send({ message : 'Error general en el servidor inténtelo más tarde'}); 
                } else if (hotelFind){
                    res.send({message: 'Nombre usuario o correo ingresados ya existen en el sistema'});
                } else {
                    if(update.password){
                        bcrypt.hash(update.password, null, null, (err, passworOk)=>{
                            if(err){
                                res.status(500).send({message: 'Se a producido un error al comparar las contraseñas'});
                            }else if(passworOk){
                                Hotel.findByIdAndUpdate(hotelID, {password : passworOk},{new: true}, (err, hotelUpdated)=>{
                                    if(err){
                                        res.status(500).send({ message : 'Error general en el servidor inténtelo más tarde'}); 
                                    }else if (hotelUpdated){
                                        res.send({ HotelUpdated : hotelUpdated});
                                    } else {
                                        res.status(404).send({ message : 'No se a encontrado el usuario a actualizar'});
                                    }
                                })
                            }else{
                                res.send({message: 'Se a producido un erro al intentar actualizar la contraseña'});
                            }
                        });
                    } else {
                        Hotel.findByIdAndUpdate(hotelID, update,{new: true}, (err, hotelUpdated)=>{
                            if(err){
                                res.status(500).send({ message : 'Error general en el servidor inténtelo más tarde'}); 
                            }else if (hotelUpdated){
                                res.send({ HotelUpdated : hotelUpdated});
                            } else {
                                res.status(404).send({ message : 'No se a encontrado el usuario a actualizar'});
                            }
                        })
                    }
                }
            })
        } else if(update.availableStartDate || update.availableEndDate){
            if(update.availableStartDate <= update.availableEndDate){
                Hotel.findByIdAndUpdate(hotelID, update,{new: true}, (err, hotelUpdated)=>{
                    if(err){
                        res.status(500).send({ message : 'Error general en el servidor inténtelo más tarde'}); 
                    }else if (hotelUpdated){
                        res.send({ HotelUpdated : hotelUpdated});
                    } else {
                        res.status(404).send({ message : 'No se a encontrado el usuario a actualizar'});
                    }
                })
            } else {
                res.send({ message : 'El rango de fechas es incorrecto'});
            }
        } else {
            Hotel.findByIdAndUpdate(hotelID, update,{new: true}, (err, hotelUpdated)=>{
                if(err){
                    res.status(500).send({ message : 'Error general en el servidor inténtelo más tarde'}); 
                }else if (hotelUpdated){
                    res.send({ HotelUpdated : hotelUpdated});
                } else {
                    res.status(404).send({ message : 'No se a encontrado el usuario a actualizar'});
                }
            })
        }
    }
}

function removeHotel(req,res){
    let hotelID = req.params.idH;

    if(hotelID != req.hotel.sub){
        res.status(403).send({ message : 'Error, no tiene permisos para esta ruta'});
    }else {
        Hotel.findByIdAndRemove(hotelID,(err,hotelRemoved)=>{
            if(err){
                res.status(500).send({ message : 'Error general en el servidor inténtelo más tarde'}); 
            } else if (hotelRemoved){
                res.send({ HotelRemoved : hotelRemoved});
            } else {
                res.status(404).send({ message : 'No se a encontrado el usuario a eliminar'});
            }
        })
    }
}

function listHotels(req,res){
    Hotel.find({}, (err, hotels)=>{
        if(err){
            res.status(500).send({ message : 'Error general en el servidor inténtelo más tarde'}); 
        } else if (hotels){
            res.send({ Hotel: hotels});
        } else {
            res.status(404).send({ message : 'No hay registros que mostrar'});
        }
    });
}

function searchByDateRangeandQualification (req,res){
    let params = req.body;

    if(params.search){
        Hotel.find({ qualification:params.search},(err, hotels)=>{
            if(err){
                res.status(500).send({ message : 'Error general en el servidor inténtelo más tarde'}); 
            } else if(hotels.length>0) {
                res.send({ Hotels : hotels});
            } else {
                var searchDate = new Date(params.search);
                Hotel.find({ availableStartDate: { $lte : searchDate}, availableEndDate : {$gte: searchDate}},(err, hotels)=>{
                    if(err){
                        res.status(500).send({ message : 'Error generalcaca en el servidor inténtelo más tarde'}); 
                    } else if(hotels) {
                        if(hotels.length>0){
                            res.send({ Hotels : hotels});
                        } else {
                            res.send({ message : 'No hay datos que mostrar'});
                        }
                    } else {
                        res.status(404).send({ message : 'No se han encontrado hoteles en la fecha o con la calificación ingresada'});
                    }
                });
            }
        });
    } else if(params.search && params.search2){
        Hotel.find({ availableStartDate: { $lte : params.search}, availableEndDate : {$gte: params.search2}},(err, hotels)=>{
            if(err){
                res.status(500).send({ message : 'Error generalcaca en el servidor inténtelo más tarde'}); 
            } else if(hotels) {
                if(hotels.length>0){
                    res.send({ Hotels : hotels});
                } else {
                    res.send({ message : 'No hay datos que mostrar'});
                }
            } else {
                res.status(404).send({ message : 'No se han encontrado hoteles en la fecha o con la calificación ingresada'});
            }
        });
    } else {
        res.send({ message : 'Debe de ingresar una fecha o una calificación a buscar'});
    }
}

function searchPriceAndOrderAlphabetical(req,res){
    let params = req.body;

    switch(params.search){
        case 'alfabetico':
            Hotel.find({},(err, hotel)=>{
                if(err){
                    res.status(500).send({ message : 'Error general en el servidor inténtelo más tarde'}); 
                } else if(hotel) {
                    res.send({ Hotels : hotel});
                } else {
                    res.status(404).send({ message : 'No se han encontrado hoteles en el rago de fecha ingresado'});
                }
            }).sort({ name: 1});
        break;
        case 'Precio-Descendente': 
            Hotel.find({},(err, hotel)=>{
                if(err){
                    res.status(500).send({ message : 'Error general en el servidor inténtelo más tarde'}); 
                } else if(hotel) {
                    res.send({ Hotels : hotel});
                } else {
                    res.status(404).send({ message : 'No se han encontrado hoteles en el rago de fecha ingresado'});
                }
            }).sort({ price: -1});
        break;
        case 'Precio-Ascendente':
            Hotel.find({},(err, hotel)=>{
                if(err){
                    res.status(500).send({ message : 'Error general en el servidor inténtelo más tarde'}); 
                } else if(hotel) {
                    res.send({ Hotels : hotel});
                } else {
                    res.status(404).send({ message : 'No se han encontrado hoteles en el rago de fecha ingresado'});
                }
            }).sort({ price: 1});
        break;
        default:
            res.send({message : 'Debe de ingresar una opción válida para ordenar los datos'});
        break;
    }
}


module.exports = {
    saveHotel,
    loginHotel,
    updateHotel,
    removeHotel,
    listHotels,
    searchByDateRangeandQualification,
    searchPriceAndOrderAlphabetical,
}