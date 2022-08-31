'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.bulkInsert('Bookings', [
      {
      spotId: 3,
      userId: 2,
      startDate: new Date ("2021-11-19"),
      endDate: new Date ("2021-11-20")
    },
    {
      spotId: 2,
      userId: 3,
      startDate: new Date ("2021-11-24"),
      endDate: new Date ("2021-11-26")
    },
    {
      spotId: 3,
      userId: 3,
      startDate: new Date ("2021-11-28"),
      endDate: new Date ("2021-11-30")
    },
  ], {});

  },

  async down (queryInterface, Sequelize) {

     await queryInterface.bulkDelete('Bookings', null, {});

  }
};
