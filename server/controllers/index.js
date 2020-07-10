const controllers = require('express').Router();

const apiControllers = require('./api');

controllers.use('/api', apiControllers);
controllers.use('/mail', require("./mail/mailController"));

module.exports = controllers;
