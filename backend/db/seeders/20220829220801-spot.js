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
      lat: 327.7645358,
      lng: -12.4730327,
      name: 'Modern Lakeside escape',
      description: 'Beautiful newly constructed home in a private lake community. Open living space with a wall of windows looking down to the lake and surrounding homes. Perfect for a weekend getaway or a Home away from Home for the summer! Guests love coming to this oasis for a family escape and others for a couples getaway. Situated in Candlewood Knolls, this incredibly quaint neighborhood offers 3 private beaches, playgrounds, tennis courts, basketball courts, ball field, bocce & horseshoe courts. All are within walking distance from the house. Only a few minutes drive to a big-name grocery store, local restaurants, and stores including an ice cream shop.',
      price: '559'
    },
    {
      ownerId: 2,
      address: '222 Main St',
      city: 'Valhalla',
      state: 'New York',
      country: 'USA',
      lat: 37.7648,
      lng: -1.4730327,
      name: 'Charming private access to NYC',
      description: 'Location, location, location! Private 1 bedroom unit that is part of a two-unit property. It has its own entrance, kitchen, bath, and off street parking. Walkable to Valhalla Metro North train station. Multi-family home on a tree lined street in Valhalla. Bright and sunny with large windows, huge bedrooms, and hardwood floors.',
      price: '836'
    },
    {
      ownerId: 3,
      address: '333 Valentino Ave',
      city: 'Bedford',
      state: 'New York',
      country: 'USA',
      lat: 374.7648,
      lng: -21.4730327,
      name: 'Private Guest Studio',
      description: 'Just 39 miles north of Manhattan. Relax and unwind, to enjoy endless opportunity for outdoor activities, fine dining, antiquing, or just loving the peace & quiet of this private studio, in a manicured setting, with wood burning stove, porch, heated pool (June-August), and private footpaths leading to an open field.',
      price: '888'
    },
    {
      ownerId: 4,
      address: '444 Harvard St',
      city: 'Philipstown',
      state: 'New Jersey',
      country: 'USA',
      lat: 327.7645358,
      lng: -12.4730327,
      name: 'Country private apt~chic cabin~',
      description: 'This elegant & private studio apt w/kitchen is an ideal WFH safe haven for nourishing in nature. A newly installed fireplace offers warmth w/ambiance. Peaceful walks with clean air & bucolic views are at your door. The hot tub is instant restoration from the areas iconic hikes. Whether hiking east/west of the Hudson, x-country skiing, ice skating, or kayaking on the Hudson, connecting to earth is easy.',
      price: '559'
    },
    {
      ownerId: 1,
      address: '555 Awesome Pl',
      city: 'Newtown',
      state: 'Connecticut',
      country: 'USA',
      lat: 37.7648,
      lng: -1.4730327,
      name: 'Private Lakefront retreat',
      description: 'In the unlikely event a Host needs to cancel your booking within 30 days of check-in, we’ll find you a similar or better home, or we’ll refund you.',
      price: '939'
    },
    {
      ownerId: 2,
      address: '666 Tulip Ave',
      city: 'Trumbull',
      state: 'Connecticut',
      country: 'USA',
      lat: 374.7648,
      lng: -21.4730327,
      name: 'Stowebury Guest House',
      description: 'Stowebury Guest House is a charming and private cottage with a country/mid-century vibe on a half acre lot in the historic and quiet hamlet of Nichols in the town of Trumbull, CT. Every detail has been thought out in this small, but well furnished and surprisingly spacious 350 sq. ft cottage.',
      price: '888'
    },
    {
      ownerId: 3,
      address: '777 Glen Cove Rd',
      city: 'Glen Head',
      state: 'New York',
      country: 'USA',
      lat: 37.7648,
      lng: -1.4730327,
      name: 'Stowebury Guest House',
      description: 'If at any time during your stay you find your listing isnt as advertised—for example, the refrigerator stops working and your Host cant easily fix it, or it has fewer bedrooms than listed—youll have three days to report it and we’ll find you a similar or better home, or we’ll refund you.',
      price: '633'
    },
    {
      ownerId: 4,
      address: '888 Concord St',
      city: 'Old Westbury',
      state: 'Connecticut',
      country: 'USA',
      lat: 374.7648,
      lng: -21.4730327,
      name: 'Secluded Modern Getaway',
      description: 'In the unlikely event a Host needs to cancel your booking within 30 days of check-in, we’ll find you a similar or better home, or we’ll refund you.',
      price: '369'
    },
  ], {});

  },

  async down(queryInterface, Sequelize) {

     await queryInterface.bulkDelete('Spots', null, {});

  }
};
