'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [{
      firstName: "Samantha",
      lastName: "Morrison",
      preferredName: "Sammi",
      email: "sammi@email.com",
      password: "abc123",
      createdAt: new Date(),
      updatedAt: new Date()

    },
    {
      firstName: "Ryan",
      lastName: "Carr",
      preferredName: "Ryan",
      email: "RyanFCarr.dev@gmail.com",
      password: "simplepw",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      firstName: "Helen",
      lastName: "Darden",
      preferredName: "Helen",
      email: "helen@gmail.com",
      password: "abc123",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      firstName: "Ashley",
      lastName: "DeYoung",
      preferredName: "Wendy",
      email: "ashley@gmail.com",
      password: "abc123",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      firstName: 'Admin',
      lastName: '',
      preferredName: 'Admin',
      email: 'info.scheduleme@gmail.com',
      password: "admin",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      firstName: "Stephanie",
      lastName: "Smith",
      preferredName: "Steph",
      email: "test1@gmail.com",
      password: "abc123",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      firstName: "Lilly",
      lastName: "Lang",
      preferredName: "Lilly",
      email: "test2@gmail.com",
      password: "abc123",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      firstName: "Mike",
      lastName: "McCormick",
      preferredName: "Mike",
      email: "test3@gmail.com",
      password: "abc123",
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ])
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {})
  }
};
