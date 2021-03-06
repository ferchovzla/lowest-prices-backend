// Ecmascript 6 functionalities
'use strict'
// Load express and body-parser modules
const express = require('express');
const bodyParser = require('body-parser');
// Call express for create the server
let app = express();
// Import the routes
let user_routes = require('./route/user'); 
//Load middlewares
//execute a method before the controller
//Configurate bodyParser for convert body request to JSON
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
// Load the routes
app.use('/api', user_routes);
// export ths odule este módulo para poder usar la variable app fuera de este archivo
module.exports = app;