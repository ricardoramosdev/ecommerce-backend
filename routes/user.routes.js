var express = require('express');
var api = express.Router();
var userController = require('../controllers/user.controller');

api.get('/users', userController.getUsers);
api.post('/user', userController.addUser);
api.put('/user/:id', userController.updateUser);
api.get('/user/', userController.getUser);
api.delete('/user', userController.deleteUser);
api.post('/login', userController.login);

module.exports = api;