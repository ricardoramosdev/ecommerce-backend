var express = require('express');
var api = express.Router();
var productController = require ('../controllers/product.controller');

api.post('/product', productController.addProduct)
api.get('/products', productController.listProducts)

module.exports = api;
