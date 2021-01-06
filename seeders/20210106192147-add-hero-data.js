'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
      return await queryInterface.bulkInsert('Heroes', [
        {
          name: 'Wonder Woman',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Harley Quinn',
          createdAt: new Date(),
          updatedAt: new Date()          
        },
        {
          name: 'Spider-Man',
          createdAt: new Date(),
          updatedAt: new Date()          
        }
      ], {});

  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkDelete('Heroes');
  }
};
