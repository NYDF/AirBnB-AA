'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.bulkInsert('Spots', [
      {
      ownerId: 1,
      address: '111 Sunny St',
      city: 'New Fairfield',
      state: 'Connecticut',
      country: 'USA',
      lat: 327.76,
      lng: 12.473,
      name: 'Modern Lakeside escape',
      description: 'Beautiful newly constructed home in a private lake community.',
      price: '559'
    },
    {
      ownerId: 2,
      address: '222 Main St',
      city: 'Valhalla',
      state: 'New York',
      country: 'USA',
      lat: 37.76,
      lng: 1.4737,
      name: 'Charming private access to NYC',
      description: 'Location, location, location! Private 1 bedroom unit that is part of a two-unit property.',
      price: '836'
    },
    {
      ownerId: 3,
      address: '333 Valentino Ave',
      city: 'Bedford',
      state: 'New York',
      country: 'USA',
      lat: 374.76,
      lng: 21.4730,
      name: 'Private Guest Studio',
      description: 'Just 39 miles north of Manhattan. Relax and unwind, to enjoy endless opportunity for outdoor activities.',
      price: '888'
    },
    {
      ownerId: 4,
      address: '444 Harvard St',
      city: 'Philipstown',
      state: 'New Jersey',
      country: 'USA',
      lat: 327.764,
      lng: 12.47,
      name: 'Country private apt~chic cabin~',
      description: 'This elegant & private studio apt w/kitchen is an ideal WFH safe haven for nourishing in nature.',
      price: '559'
    },
    {
      ownerId: 1,
      address: '555 Awesome Pl',
      city: 'Newtown',
      state: 'Connecticut',
      country: 'USA',
      lat: 37.7,
      lng: -1.473,
      name: 'Private Lakefront retreat',
      description: 'In the unlikely event a Host needs to cancel your booking within 30 days of check-in.',
      price: '939'
    },
    {
      ownerId: 2,
      address: '666 Tulip Ave',
      city: 'Trumbull',
      state: 'Connecticut',
      country: 'USA',
      lat: 374.76,
      lng: -21.47,
      name: 'Stowebury Guest House',
      description: 'Stowebury Guest House is a charming and private cottage with a country/mid-century vibe.',
      price: '888'
    },
    {
      ownerId: 3,
      address: '777 Glen Cove Rd',
      city: 'Glen Head',
      state: 'New York',
      country: 'USA',
      lat: 37.764,
      lng: 1.473,
      name: 'Stowebury Guest House',
      description: 'If at any time during your stay you find your listing isnt as advertised—for example.',
      price: '633'
    },
    {
      ownerId: 4,
      address: '888 Concord St',
      city: 'Old Westbury',
      state: 'Connecticut',
      country: 'USA',
      lat: 374.7648,
      lng: 21.47,
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
