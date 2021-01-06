'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkInsert('Sidekicks', [
      {
        name: 'Steve',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Joker',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Uncle Ben',
        createdAt: new Date(),
        updatedAt: new Date()
      },     
      {
        name: 'Baby Yoda',
        createdAt: new Date(),
        updatedAt: new Date()
      },       
    ], {})
  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkDelete('Sidekicks');
  }
};
