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
      name: 'Lady of the Lake-Poconos Retreat1',
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
      name: 'NEW Poconos Treetop2',
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
      name: 'Airy Waterfront3',
      description: 'Embodying everything.',
      price: '888'
    },
    {
      ownerId: 4,
      address: '111 main st',
      city: 'New City',
      state: 'NY',
      country: 'USA',
      lat: 327.7645358,
      lng: -12.4730327,
      name: 'Lady of the Lake-Poconos Retreat4',
      description: 'Embodying everything your heart can conjure.',
      price: '559'
    },
    {
      ownerId: 5,
      address: '222 main st',
      city: 'New City',
      state: 'CA',
      country: 'USA',
      lat: 37.7648,
      lng: -1.4730327,
      name: 'NEW Poconos Treetop5',
      description: 'Embodying everything your heart can.',
      price: '333'
    },
    {
      ownerId: 6,
      address: '333 main st',
      city: 'New City',
      state: 'PA',
      country: 'USA',
      lat: 374.7648,
      lng: -21.4730327,
      name: 'Airy Waterfront6',
      description: 'Embodying everything.',
      price: '888'
    },
    {
      ownerId: 1,
      address: '222 main st',
      city: 'New City',
      state: 'CA',
      country: 'USA',
      lat: 37.7648,
      lng: -1.4730327,
      name: 'NEW Poconos Treetop7',
      description: 'Embodying everything your heart can.',
      price: '333'
    },
    {
      ownerId: 2,
      address: '333 main st',
      city: 'New City',
      state: 'PA',
      country: 'USA',
      lat: 374.7648,
      lng: -21.4730327,
      name: 'Airy Waterfront8',
      description: 'Embodying everything.',
      price: '888'
    },
  ], {});

  },

  async down(queryInterface, Sequelize) {

     await queryInterface.bulkDelete('Spots', null, {});

  }
};
