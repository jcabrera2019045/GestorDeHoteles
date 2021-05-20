'use strict'

var mongoose = require('mongoose');
var port = 3800;
var app = require('./app');

mongoose.Promise =global.Promise;

mongoose.connect('mongodb://localhost:27017/GestorHoteles', { useNewUrlParser: true, useUnifiedTopology: true})
    .then(()=>{
        console.log('Conexión a la Base de datos correcta'); 
        app.listen(port, ()=>{
            console.log('El servidor de express esta corriendo por el puerto', port);
        });
    }).catch(err=>{
        console.log('Error al conectar a la base de datos', err);
    })