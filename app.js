let express = require('express');
let app = express();
let user_routes = require('./routes/user.routes')
let product_routes = require('./routes/product.routes.js')
let cors = require('cors')

app.use(cors())
app.use(express.json()); //funcion para poder leer los valores enviados en metodo post mediante el body
app.use(express.urlencoded({extended: true}));
app.use('/api',[
    user_routes,
    product_routes,
]);


module.exports = app;