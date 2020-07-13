'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('BusinessSettings', [
      {
      name: "OpenTime",
      value: "09:00",
      createdAt: new Date(),
      updatedAt: new Date()
      },
      {
        name: "CloseTime",
        value: "17:00",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('BusinessSettings', null, {});
  }
};
