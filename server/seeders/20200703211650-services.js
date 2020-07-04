'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Services', [{
      name: "Men's Basic cut",
      time: 20,
      ServiceCategoryId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: "Women's Basic cut",
      time: 30,
      ServiceCategoryId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: "Shampoo",
      time: 10,
      ServiceCategoryId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: "Shave",
      time: 15,
      ServiceCategoryId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: "Waxing",
      time: 15,
      ServiceCategoryId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: "Coloring",
      time: 60,
      ServiceCategoryId: 3,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: "Highlights",
      time: 90,
      ServiceCategoryId: 3,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: "Perm",
      time: 120,
      ServiceCategoryId: 3,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Services', null, {});
  }
};
