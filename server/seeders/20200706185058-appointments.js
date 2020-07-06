'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
     await queryInterface.bulkInsert('Appointments', [{
     startTime: new Date('2020-04-20 16:20:00'),
     length: 20,
     createdAt: new Date(),
     updatedAt: new Date(),
     clientID: 1
    },
    {
      startTime: new Date('2020-04-21 14:30:00'),
      length: 40,
      createdAt: new Date(),
      updatedAt: new Date(),
      clientID: 2
     },
    ], {});
    await queryInterface.bulkInsert('AppointmentServices', [{
      createdAt: new Date(),
      updatedAt: new Date(),
      AppointmentId: 1,
      ServiceId: 1
     },
     {
       createdAt: new Date(),
       updatedAt: new Date(),
       AppointmentId: 2,
       ServiceId: 2
      },
     {
       createdAt: new Date(),
       updatedAt: new Date(),
       AppointmentId: 2,
       ServiceId: 3
      },
     ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Appointments', null, {});
  }
};
