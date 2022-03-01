var express = require('express');
var app = express();
var user_routes = require('./routes/user.routes')
var product_routes = require('./routes/product.routes.js')
app.use(express.json()); //funcion para poder leer los valores enviados en metodo post mediante el body
app.use(express.urlencoded({extended: true}));



app.use('/api',[
    user_routes,
    product_routes,
]);


module.exports = app;