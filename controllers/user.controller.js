'use strict'

var User = require('../models/user.model');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('../services/jwt');

function saveUser(req,res){
    let user = new User();
    let params = req.body;

    if(params.name && params.username && params.email && params.password){
        User.findOne({$or:[{ username: params.username}, {email : params.email}]},(err,userFind)=>{
            if(err){
                res.status(500).send({ message : 'Error general en el servidor inténtelo más tarde'});
            } else if (userFind){
                res.send({message: 'Usuario o correo ingresados ya existen en el sistema'});
            } else {
                user.name = params.name;
                user.username = params.username;
                user.email = params.email;
                user.role = 'USER';

                bcrypt.hash(params.password, null, null, (err, password)=>{
                    if(err){
                        res.status(500).send({message: 'Error al encriptar contraseña'});
                    }else if(password){
                        user.password = password;

                        user.save((err, userSaved)=>{
                            if(err){
                                res.status(500).send({message: 'Error general al guardar usuario'});
                            }else if(userSaved){
                                res.send({message: 'Usuario creado', user: userSaved});
                            }else{
                                res.status(404).send({message: 'Se a producido un error usuario no guardado'});
                            }
                        });
                    }else{
                        res.status(418).send({message: 'Error inesperado'});
                    }
                });
            }
        }) 
    } else {
        res.send({ message : 'Ingrese todo los datos necesarios'});
    }
}

function loginUser(req,res){
    var params = req.body;

    if(params.username || params.email){
        if(params.password){
            User.findOne({$or:[{username: params.username}, {email : params.email}]},(err,userFind)=>{
                if(err){
                    res.status(500).send({ message : 'Error general en el servidor inténtelo más tarde'}); 
                } else if (userFind){
                    bcrypt.compare(params.password, userFind.password, (err, passwordOk)=>{
                        if(err){
                            res.status(500).send({message: 'Se a producido un error al comparar las contraseñas'});
                        }else if(passwordOk){
                            if(params.gettoken){
                                res.send({token: jwt.createTokenUser(userFind)});
                            }else{
                                res.send({message: 'Bienvenido',user:userFind});
                            }
                        }else{
                            res.send({message: 'Contraseña ingresada incorrecta'});
                        }
                    });
                } else{
                    res.send({message: 'Datos de usuario incorrectos'});
                }   
            })
        } else {
            res.send({message: 'Debe de ingresas su contraseña'}); 
        }
    } else {
        res.send({message: 'Debe de ingresar su correo o su username'});
    }
}

function updateUser(req,res){
    var userID = req.params.idU;
    var update = req.body;

    if(userID != req.user.sub){
        res.status(403).send({ message : 'Error, no tiene permisos para esta ruta'});
    } else {
        if(update.role){
            res.status(418).send({ message : 'No puede actualizar el campo role'});
        } else if(update.username || update.email || update.password){
            User.findOne({$or:[{ username: update.username}, {email: update.email}]},(err,userFind)=>{
                if (err){
                    res.status(500).send({ message : 'Error general en el servidor inténtelo más tarde'}); 
                } else if (userFind){
                    res.send({message: 'Usuario o correo ingresados ya existen en el sistema'});
                } else {
                    if(update.password){
                        bcrypt.hash(update.password, null,null, (err, passwordOk)=>{
                            if(err){
                                res.status(500).send({ message : 'Error general en el servidor inténtelo más tarde'}); 
                            } else if (passwordOk){
                                User.findByIdAndUpdate(userID, {password : passwordOk} ,{new: true}, (err, userUpdated)=>{
                                    if(err){
                                        res.status(500).send({ message : 'Error general en el servidor inténtelo más tarde'}); 
                                    }else if (userUpdated){
                                        res.send({ UserUpdated : userUpdated});
                                    } else {
                                        res.status(404).send({ message : 'No se a encontrado el usuario a actualizar'});
                                    }
                                })
                            } else {
                                res.status(403).send({ message : 'Se a producido un error al actualizar la contraseña'});
                            }
                        })
                    } else {
                        User.findByIdAndUpdate(userID, update,{new: true}, (err, userUpdated)=>{
                            if(err){
                                res.status(500).send({ message : 'Error general en el servidor inténtelo más tarde'}); 
                            }else if (userUpdated){
                                res.send({ UserUpdated : userUpdated});
                            } else {
                                res.status(404).send({ message : 'No se a encontrado el usuario a actualizar'});
                            }
                        })
                    }
                }
            })
        } else {
            User.findByIdAndUpdate(userID, update ,{new: true}, (err, userUpdated)=>{
                if(err){
                    res.status(500).send({ message : 'Error general en el servidor inténtelo más tarde'}); 
                }else if (userUpdated){
                    res.send({ UserUpdated : userUpdated});
                } else {
                    res.status(404).send({ message : 'No se a encontrado el usuario a actualizar'});
                }
            })
        }
    }
}

function removeUser(req,res){
    let userID = req.params.idU;

    if(userID != req.user.sub){
        res.status(403).send({ message : 'Error, no tiene permisos para esta ruta'});
    }else {
        User.findByIdAndRemove(userID,(err,userRemoved)=>{
            if(err){
                res.status(500).send({ message : 'Error general en el servidor inténtelo más tarde'}); 
            } else if (userRemoved){
                res.send({ UserRemoved : userRemoved});
            } else {
                res.status(404).send({ message : 'No se a encontrado el usuario a eliminar'});
            }
        })
    }
}

function listUsers(req,res){
    User.find({}, (err, users)=>{
        if(err){
            res.status(500).send({ message : 'Error general en el servidor inténtelo más tarde'}); 
        } else if (users){
            res.send({ Users: users});
        } else {
            res.status(404).send({ message : 'No hay registros que mostrar'});
        }
    });
}

module.exports = {
    saveUser,
    loginUser,
    updateUser,
    removeUser,
    listUsers
}