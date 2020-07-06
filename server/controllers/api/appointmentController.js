const appointmentController = require('express').Router();

const db = require('../../models');

appointmentController.get('/', async (req, res) => {
    res.json(await db.Appointment.findAll());
});

module.exports = appointmentController;