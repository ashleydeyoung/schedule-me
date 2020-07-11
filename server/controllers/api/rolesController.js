const rolesController = require('express').Router();

const db = require('../../models');

rolesController.get('/', async (req, res) => {
   const allRoles = await db.Role.findAll({})
   res.json(allRoles)
})

module.exports = rolesController;