const appointmentController = require('express').Router();
const moment = require('moment');

const db = require('../../models');
const { Op } = require('sequelize');

appointmentController.get('/', async (req, res) => {
    if(req.query.day){
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

module.exports = appointmentController;