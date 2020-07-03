'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Appointment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Appointment.belongsToMany(models.Service, {through: 'AppointmentServices'});
      Appointment.belongsTo(models.User, {as: 'Client', foreignKey: 'clientID'});
    }
  };
  Appointment.init({
    startTime: DataTypes.DATE,
    length: DataTypes.DECIMAL
  }, {
    sequelize,
    modelName: 'Appointment',
  });
  return Appointment;
};