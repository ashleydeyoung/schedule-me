const servicesController = require('express').Router();

const db = require('../../models');


servicesController.get('/', async (req, res) => {
    const services = await db.Service.findAll({ include: db.ServiceCategory });
  res.json(services);
});


module.exports = servicesController;
