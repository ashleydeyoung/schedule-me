const apiControllers = require('express').Router();

apiControllers.use('/users', require('./usersController'));
apiControllers.use('/appointments', require('./appointmentController'));

module.exports = apiControllers;
