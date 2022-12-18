'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.bulkInsert('Spots', [
      {
      ownerId: 1,
      address: '100 Riverside Blvd',
      city: 'New York',
      state: 'New York',
      country: 'USA',
      lat: 40.775956845776456,
      lng: -73.98960213025359,
      name: 'Modern Lakeside escape',
      description: 'Beautiful newly constructed home in a private lake community.',
      price: '559'
    },
    {
      ownerId: 2,
      address: '1000 Maxwell Ln',
      city: 'Hoboken',
      state: 'New Jersey',
      country: 'USA',
      lat: 40.74955966427739,
      lng: -74.02510224374731,
      name: 'Charming private access to NYC',
      description: 'Location, location, location! Private 1 bedroom unit that is part of a two-unit property.',
      price: '836'
    },
    {
      ownerId: 3,
      address: '308 26th Avenue',
      city: 'Astoria',
      state: 'New York',
      country: 'USA',
      lat: 40.77633024472602,
      lng: -73.93335058792488,
      name: 'Private Guest Studio',
      description: 'Just 39 miles north of Manhattan. Relax and unwind, to enjoy endless opportunity for outdoor activities.',
      price: '888'
    },
    {
      ownerId: 4,
      address: '429 Kent Ave',
      city: 'Brooklyn',
      state: 'New York',
      country: 'USA',
      lat: 40.70977216636848,
      lng: -73.96819584374789,
      name: 'Country private apt~chic cabin~',
      description: 'This elegant & private studio apt w/kitchen is an ideal WFH safe haven for nourishing in nature.',
      price: '559'
    },
    {
      ownerId: 1,
      address: '225 Cherry Street',
      city: 'New York',
      state: 'New York',
      country: 'USA',
      lat: 40.711134787673394,
      lng: -73.99128024253406,
      name: 'Private Lakefront retreat',
      description: 'In the unlikely event a Host needs to cancel your booking within 30 days of check-in.',
      price: '939'
    },
    {
      ownerId: 2,
      address: '803 Columbia Ave',
      city: 'North Bergen',
      state: 'New Jersey',
      country: 'USA',
      lat: 40.761314160529196,
      lng: -74.04849675724024,
      name: 'Stowebury Guest House',
      description: 'Stowebury Guest House is a charming and private cottage with a country/mid-century vibe.',
      price: '888'
    },
    {
      ownerId: 3,
      address: '200 Grand Cove Way',
      city: 'Edgewater',
      state: 'New Jersey',
      country: 'USA',
      lat: 40.824106047769696,
      lng: -73.97473994374613,
      name: 'Stowebury Guest House',
      description: 'If at any time during your stay you find your listing isnt as advertised—for example.',
      price: '633'
    },
    {
      ownerId: 4,
      address: '60 Gramercy Park N',      
      city: 'Old Westbury',
      state: 'Connecticut',
      country: 'USA',
      lat: 40.73895722480879,
      lng: -73.98635305908984,
      name: 'Secluded Modern Getaway',
      description: 'In the unlikely event a Host needs to cancel your booking within 30 days of check-in.',
      price: '369'
    },
  ], {});

  },

  async down(queryInterface, Sequelize) {

     await queryInterface.bulkDelete('Spots', null, {});

  }
};
