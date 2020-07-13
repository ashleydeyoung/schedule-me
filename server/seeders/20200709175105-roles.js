'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Roles', [{
      title: 'Admin',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      title: 'Stylist',
      createdAt: new Date(),
      updatedAt: new Date()
    }
    ]);
    await queryInterface.bulkInsert('UserRoles', [{
      createdAt: new Date(),
      updatedAt: new Date(),
      userId: 5,
      roleId: 1
    }]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Roles', null, {});
    await queryInterface.bulkDelete('Users', { email: 'info.scheduleme@gmail.com' }, {});
  }
};
