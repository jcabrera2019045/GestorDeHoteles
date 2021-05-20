'use strict'

var User = require('../models/user.model');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('../services/jwt');
const strings = require('../constants/strings');

exports.saveUser = (req,res) => {
    let user = new User();
    let params = req.body;

    if(params.name && params.username && params.email && params.password){
        User.findOne({$or:[{ username: params.username}, {email : params.email}]},(err,userFind)=>{
            if(err){
                res.status(500).send({ message : strings.serverError});
            } else if (userFind){
                res.send({message: strings.existingUserError});
            } else {
                user.name = params.name;
                user.username = params.username;
                user.email = params.email;
                user.role = strings.userRole;

                bcrypt.hash(params.password, null, null, (err, password)=>{
                    if(err){
                        res.status(500).send({message: strings.encryptPassError});
                    }else if(password){
                        user.password = password;

                        user.save((err, userSaved)=>{
                            if(err){
                                res.status(500).send({message: strings.saveuserError});
                            }else if(userSaved){
                                res.send({message: strings.userCreated, user: userSaved});
                            }else{
                                res.status(404).send({message: strings.notSavedUser});
                            }
                        });
                    }else{
                        res.status(418).send({message: strings.unexpectedError});
                    }
                });
            }
        }) 
    } else {
        res.send({ message : strings.unfilledDataError});
    }
}

exports.loginUser = (req,res) => {
    var params = req.body;

    if(params.username || params.email){
        if(params.password){
            User.findOne({$or:[{username: params.username}, {email : params.email}]},(err,userFind)=>{
                if(err){
                    res.status(500).send({ message : strings.serverError}); 
                } else if (userFind){
                    bcrypt.compare(params.password, userFind.password, (err, passwordOk)=>{
                        if(err){
                            res.status(500).send({message: strings.comparePassError});
                        }else if(passwordOk){
                            if(params.gettoken){
                                res.send({token: jwt.createTokenUser(userFind)});
                            }else{
                                res.send({message: strings.welcomeMsg,user:userFind});
                            }
                        }else{
                            res.send({message: strings.incorrectPassError});
                        }
                    });
                } else{
                    res.send({message: strings.incorrectUserDataError});
                }   
            })
        } else {
            res.send({message: strings.enterPassError}); 
        }
    } else {
        res.send({message: strings.enterUserError});
    }
}

exports.updateUser = (req,res) => {
    var userID = req.params.idU;
    var update = req.body;

    if(userID != req.user.sub){
        res.status(403).send({ message : strings.permissionsError});
    } else {
        if(update.role){
            res.status(418).send({ message : strings.cantUpdateRole});
        } else if(update.username || update.email || update.password){
            User.findOne({$or:[{ username: update.username}, {email: update.email}]},(err,userFind)=>{
                if (err){
                    res.status(500).send({ message : strings.serverError}); 
                } else if (userFind){
                    res.send({message: strings.existingUserError});
                } else {
                    if(update.password){
                        bcrypt.hash(update.password, null,null, (err, passwordOk)=>{
                            if(err){
                                res.status(500).send({ message : strings.serverError}); 
                            } else if (passwordOk){
                                User.findByIdAndUpdate(userID, {password : passwordOk} ,{new: true}, (err, userUpdated)=>{
                                    if(err){
                                        res.status(500).send({ message : strings.serverError}); 
                                    }else if (userUpdated){
                                        res.send({ UserUpdated : userUpdated});
                                    } else {
                                        res.status(404).send({ message : strings.notFindUserToUpdateError});
                                    }
                                })
                            } else {
                                res.status(403).send({ message : strings.updatePassError});
                            }
                        })
                    } else {
                        User.findByIdAndUpdate(userID, update,{new: true}, (err, userUpdated)=>{
                            if(err){
                                res.status(500).send({ message : strings.serverError}); 
                            }else if (userUpdated){
                                res.send({ UserUpdated : userUpdated});
                            } else {
                                res.status(404).send({ message : strings.notFindUserToUpdateError});
                            }
                        })
                    }
                }
            })
        } else {
            User.findByIdAndUpdate(userID, update ,{new: true}, (err, userUpdated)=>{
                if(err){
                    res.status(500).send({ message : strings.serverError}); 
                }else if (userUpdated){
                    res.send({ UserUpdated : userUpdated});
                } else {
                    res.status(404).send({ message : strings.notFindUserToUpdateError});
                }
            })
        }
    }
}

exports.removeUser = (req,res) => {
    let userID = req.params.idU;

    if(userID != req.user.sub){
        res.status(403).send({ message : strings.permissionsError});
    }else {
        User.findByIdAndRemove(userID,(err,userRemoved)=>{
            if(err){
                res.status(500).send({ message : strings.serverError}); 
            } else if (userRemoved){
                res.send({ UserRemoved : userRemoved});
            } else {
                res.status(404).send({ message : strings.notFindUserToDeleteError});
            }
        })
    }
}

exports.listUsers = (req,res) => {
    User.find({}, (err, users)=>{
        if(err){
            res.status(500).send({ message : strings.serverError}); 
        } else if (users){
            res.send({ Users: users});
        } else {
            res.status(404).send({ message : strings.noDataError});
        }
    });
}
