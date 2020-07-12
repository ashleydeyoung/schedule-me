const apiControllers = require('express').Router();

apiControllers.use('/users', require('./usersController'));
apiControllers.use('/appointments', require('./appointmentsController'));
apiControllers.use('/services', require('./servicesController'));
apiControllers.use('/roles', require('./rolesController'));
apiControllers.use('/businesssettings', require('./businessSettingsController'));

module.exports = apiControllers;
