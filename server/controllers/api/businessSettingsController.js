const businessSettingsController = require('express').Router();
const db = require('../../models');
const { Op } = require('sequelize');

businessSettingsController.get('/hours', async (req, res) => {
    const hours = await db.BusinessSetting.findAll({
        where: {
            name: {
                [Op.in]: ["OpenTime", "CloseTime"]
            }
        }
    });

    res.json(hours);
});

businessSettingsController.put('/:id', async (req, res) => {
    const setting = await db.BusinessSetting.findOne({ where: { id: req.params.id } });
    const newSetting = await setting.update(req.body);
    res.json(newSetting);
});

module.exports = businessSettingsController;