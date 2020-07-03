'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Services', [{
      name: "Men's Basic cut",
      time: 20,
      ServiceCategoryId: 1
    },
    {
      name: "Women's Basic cut",
      time: 30,
      ServiceCategoryId: 1
    },
    {
      name: "Shampoo",
      time: 10,
      ServiceCategoryId: 2
    },
    {
      name: "Shave",
      time: 15,
      ServiceCategoryId: 2
    },
    {
      name: "Waxing",
      time: 15,
      ServiceCategoryId: 2
    },
    {
      name: "Coloring",
      time: 60,
      ServiceCategoryId: 3
    },
    {
      name: "Highlights",
      time: 90,
      ServiceCategoryId: 3
    },
    {
      name: "Perm",
      time: 120,
      ServiceCategoryId: 3
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Services', null, {});
  }
};
