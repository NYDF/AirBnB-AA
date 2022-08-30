'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.bulkInsert('Spots', [
      {
      ownerId: 1,
      address: '111 main st',
      city: 'New City',
      state: 'NY',
      country: 'USA',
      name: 'Lady of the Lake-Poconos Retreat',
      description: 'Embodying everything your heart can conjure.',
      price: '559'
    },
    {
      ownerId: 2,
      address: '222 main st',
      city: 'New City',
      state: 'CA',
      country: 'USA',
      name: 'NEW Poconos Treetop',
      description: 'Embodying everything your heart can.',
      price: '333'
    },
    {
      ownerId: 3,
      address: '333 main st',
      city: 'New City',
      state: 'PA',
      country: 'USA',
      name: 'Airy Waterfront',
      description: 'Embodying everything.',
      price: '888'
    },
  ], {});

  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:     */

     await queryInterface.bulkDelete('Spots', null, {});

  }
};
