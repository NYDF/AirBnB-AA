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
      lat: 327.7645358,
      lng: -12.4730327,
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
      lat: 37.7648,
      lng: -1.4730327,
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
      lat: 374.7648,
      lng: -21.4730327,
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
