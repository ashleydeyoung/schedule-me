const servicesController = require('express').Router();

const db = require('../../models');

servicesController.get('/', async (req, res) => {
  const services = await db.Service.findAll({ include: db.ServiceCategory });
  res.json(services);
});

servicesController.post('/', async (req, res) => {
  const { service } = req.body;
  const newService = await db.Service.create(service);
  const category = await db.ServiceCategory.findByPk(req.body.categoryId);
  category.addService(newService);
  res.json(newService);
});

servicesController.delete('/:id', async (req, res) => {
  await db.Service.destroy({where: {id: req.params.id}});
  res.sendStatus(200);
});

module.exports = servicesController;
