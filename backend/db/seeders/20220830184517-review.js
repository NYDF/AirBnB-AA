'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:    */
    await queryInterface.bulkInsert('Reviews', [
      {
        spotId: 1,
        userId: 2,
        review: 'perfect',
        stars: 5,
      },
      {
        spotId: 2,
        userId: 1,
        review: 'average',
        stars: 3,
      },
      {
        spotId: 3,
        userId: 4,
        review: 'will come back',
        stars: 4,
      },
      {
        spotId: 4,
        userId: 3,
        review: 'perfect',
        stars: 5,
      },
      {
        spotId: 5,
        userId: 1,
        review: 'average',
        stars: 2,
      },
      {
        spotId: 6,
        userId: 3,
        review: 'will come back',
        stars: 4,
      },
      {
        spotId: 1,
        userId: 4,
        review: 'perfect',
        stars: 5,
      },
      {
        spotId: 2,
        userId: 5,
        review: 'average',
        stars: 3,
      },
      {
        spotId: 1,
        userId: 6,
        review: 'will come back',
        stars: 1,
      },
    ], {});

  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     */
    await queryInterface.bulkDelete('Reviews', null, {});

  }
};
