'use strict';

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING,
      unique: true
    },
    password: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    preferredName: DataTypes.STRING,
  }, {});

  User.associate = function (models) {
    User.hasMany(models.Appointment, {foreignKey: 'clientID'});
    User.belongsToMany(models.Role, {through: 'UserRoles'});
  };

  User.prototype.comparePassword = function (challenge) {
    return this.password === challenge;
  }
  
  return User;
};