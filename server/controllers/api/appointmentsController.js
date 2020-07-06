const appointmentsController = require("express").Router();

const db = require("../../models");
appointmentsController.get("/", async (req, res) => {
  const options = { include: db.Service };
  if(req.query.clientID) {
      options.where = {clientID:req.query.clientID}
  }
  const appointments = await db.Appointment.findAll(options);
  res.json(appointments);
});

module.exports = appointmentsController;
