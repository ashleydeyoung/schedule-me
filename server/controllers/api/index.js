const apiControllers = require('express').Router();

apiControllers.use('/users', require('./usersController'));

module.exports = apiControllers;
