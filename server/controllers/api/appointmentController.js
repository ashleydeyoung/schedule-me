const appointmentController = require('express').Router();
const moment = require('moment');

const db = require('../../models');
const { Op } = require('sequelize');

appointmentController.get('/', async (req, res) => {
    if (req.query.day) {
        res.json(await db.Appointment.findAll({
            where: {
                startTime: {
                    [Op.between]: [req.query.day, moment(req.query.day).add(1, 'day')]
                }
            }
        }));
    } else {
        res.json(await db.Appointment.findAll());
    }
});

appointmentController.post('/', async (req, res) => {
    const time = req.body.startTime.split(':');
    const startTime = moment(req.body.startDate).hour(time[0]).minute(time[1]);
    const services = await db.Service.findAll({where: {id: {[Op.in] : req.body.services}}});
    const length = services.reduce((duration, service) => duration + Number(service.time), 0)
    const newAppointment = await db.Appointment.create({startTime, length});
    services.forEach(service => newAppointment.addService(service));
    res.sendStatus(204);
});

module.exports = appointmentController;
