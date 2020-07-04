'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('User', 'firstName', { type: DataTypes.STRING });
    await queryInterface.addColumn('User', 'lastName', { type: DataTypes.STRING });
    await queryInterface.addColumn('User', 'preferredName', { type: DataTypes.STRING });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('User', 'firstName');
    await queryInterface.removeColumn('User', 'lastName');
    await queryInterface.removeColumn('User', 'preferredName');
  }
};
