'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('ServiceCategories', [{
      name: "Basic Services",
      isExclusive: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: "Additional Services",
      isExclusive: false,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: "Premium Services",
      isExclusive: false,
      createdAt: new Date(),
      updatedAt: new Date()
    }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('ServiceCategories', null, {});
  }
};
