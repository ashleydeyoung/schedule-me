'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('ServiceCategories', [{
      name: "Basic Services",
      isExclusive: true
    },
    {
      name: "Additional Services",
      isExclusive: false
    },
    {
      name: "Premium Services",
      isExclusive: false
    }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('ServiceCategories', null, {});
  }
};
