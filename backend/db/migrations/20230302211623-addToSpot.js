'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await [queryInterface.addColumn('Spots',
        'guest', {
          type: Sequelize.INTEGER,

        }),
        queryInterface.addColumn('Spots',
        'beds', {
          type: Sequelize.INTEGER,

        }),
        queryInterface.addColumn('Spots',
        'baths', {
          type: Sequelize.INTEGER,

        }),
        queryInterface.addColumn('Spots',
        'bedrooms', {
          type: Sequelize.INTEGER,

        }),
        queryInterface.addColumn('Spots',
        'type', {
          type: Sequelize.STRING,
        })]
  },

  async down (queryInterface, Sequelize) {
    queryInterface.removeColumn('Spots', 'guest', 'beds', 'bedrooms', 'type' );
  }
};
