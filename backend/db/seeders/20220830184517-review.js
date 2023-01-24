'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.bulkInsert('Reviews', [
      {
        spotId: 2,
        userId: 1,
        review: 'Looking to disconnect from the hustle and bustle(esp. from NYC)? This would be the place to be!',
        stars: 5,
        cleanliness:5,
        communication:5,
        checkin:5,
        accuracy:5,
        location:5,
        value:5
      },
      {
        spotId: 3,
        userId: 1,
        review: 'This was a very charming place to stay! Jeff & Dave have clearly put tons of effort into making this tiny home special. From the artisan coffee station to the use of vertical space',
        stars: 3,
        cleanliness:5,
        communication:2,
        checkin:5,
        accuracy:1,
        location:5,
        value:5
      },
      {
        spotId: 4,
        userId: 1,
        review: 'Definately will come back!',
        stars: 4,
        cleanliness:5,
        communication:5,
        checkin:3,
        accuracy:5,
        location:3,
        value:5
      },
      {
        spotId: 5,
        userId: 2,
        review: 'Another 5 star experience here!',
        stars: 5,
        cleanliness:5,
        communication:5,
        checkin:5,
        accuracy:5,
        location:5,
        value:4
      },
      {
        spotId: 4,
        userId: 2,
        review: 'If you’re looking for an experience that let’s you connect with the outdoors a bit but isn’t full-blown camping like I was, this is a great option!',
        stars: 4,
        cleanliness:5,
        communication:3,
        checkin:5,
        accuracy:3,
        location:5,
        value:3
      },
      {
        spotId: 3,
        userId: 2,
        review: 'Third time staying here and still having a great experience ',
        stars: 4,
        cleanliness:5,
        communication:3,
        checkin:5,
        accuracy:3,
        location:5,
        value:3
      },
      {
        spotId: 1,
        userId: 3,
        review: 'this was an absolutely beautiful house! it was the perfect size and aesthetic for me and my friends! the description and pictures were spot on.',
        stars: 5,
        cleanliness:5,
        communication:5,
        checkin:5,
        accuracy:5,
        location:5,
        value:5
      },
      {
        spotId: 2,
        userId: 3,
        review: 'Really is such a beautiful house in a beautiful part of Connecticut. Everyone loved their stay, me especially.',
        stars: 3,
        cleanliness:5,
        communication:5,
        checkin:2,
        accuracy:4,
        location:5,
        value:3
      },
      {
        spotId: 1,
        userId: 4,
        review: 'The Candlewood House is a great spot for a weekend getaway. ',
        stars: 4,
        cleanliness:5,
        communication:5,
        checkin:2,
        accuracy:5,
        location:5,
        value:3
      },
      {
        spotId: 2,
        userId: 4,
        review: 'Looking to disconnect from the hustle and bustle(esp. from NYC)? This would be the place to be!',
        stars: 5,
        cleanliness:5,
        communication:5,
        checkin:5,
        accuracy:5,
        location:5,
        value:4
      },
      {
        spotId: 3,
        userId: 4,
        review: 'This place is beautiful and the hosts went above and beyond to accommodate our requests whenever needed. The place is lovely and very clean. ',
        stars: 3,
        cleanliness:5,
        communication:2,
        checkin:5,
        accuracy:1,
        location:5,
        value:2
      },
      {
        spotId: 8,
        userId: 1,
        review: 'Very clean and relaxing. We got some much needed rest. We enjoyed the alone time as well as the visits with Aster and Marybeth.',
        stars: 4,
        cleanliness:5,
        communication:5,
        checkin:5,
        accuracy:3,
        location:3,
        value:3
      },
      {
        spotId: 7,
        userId: 1,
        review: 'Everything worked out well for us. Grandchildren enjoyed the pool a couple of times .',
        stars: 5,
        cleanliness:5,
        communication:5,
        checkin:5,
        accuracy:5,
        location:5,
        value:5
      },
      {
        spotId: 5,
        userId: 2,
        review: 'We had a lovely time at Mary Beths home. She was very responsive and kept us up to date with weather when we were by the pool.',
        stars: 4,
        cleanliness:5,
        communication:3,
        checkin:5,
        accuracy:3,
        location:5,
        value:3
      },
      {
        spotId: 6,
        userId: 3,
        review: 'Third time staying here and still having a great experience ',
        stars: 4,
        cleanliness:3,
        communication:5,
        checkin:4,
        accuracy:4,
        location:5,
        value:3
      },
      {
        spotId: 7,
        userId: 4,
        review: 'Really is such a beautiful house in a beautiful part of Connecticut. Everyone loved their stay, me especially.',
        stars: 3,
        cleanliness:3,
        communication:3,
        checkin:3,
        accuracy:3,
        location:3,
        value:3
      },
      {
        spotId: 1,
        userId: 2,
        review: 'The Candlewood House is a great spot for a weekend getaway. ',
        stars: 4,
        cleanliness:5,
        communication:3,
        checkin:4,
        accuracy:3,
        location:4,
        value:5
      },
    ], {});

  },

  async down(queryInterface, Sequelize) {

    await queryInterface.bulkDelete('Reviews', null, {});

  }
};
