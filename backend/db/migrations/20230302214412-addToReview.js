'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await [queryInterface.addColumn('Reviews',
    'cleanliness', {
      type: Sequelize.INTEGER,

    }),
    queryInterface.addColumn('Reviews',
    'communication', {
      type: Sequelize.INTEGER,

    }),
    queryInterface.addColumn('Reviews',
    'checkin', {
      type: Sequelize.INTEGER,

    }),
    queryInterface.addColumn('Reviews',
    'location', {
      type: Sequelize.INTEGER,

    }),
    queryInterface.addColumn('Reviews',
    'accuracy', {
      type: Sequelize.INTEGER,

    }),
    queryInterface.addColumn('Reviews',
    'value', {
      type: Sequelize.INTEGER,

    })]
  },

  async down (queryInterface, Sequelize) {
    queryInterface.removeColumn('Reviews', 'cleanliness', 'communication', 'checkin', 'location', 'accuracy', 'value');
  }
};
