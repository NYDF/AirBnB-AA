'use strict';
const bcrypt = require("bcryptjs");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        email: 'fake1@user.io',
        username: 'fakeuser1',
        firstName: 'Wilton',
        lastName: 'Chamberlain',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'fake2@user.io',
        username: 'fakeuser2',
        firstName: 'Micheal',
        lastName: 'Jordan',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'fake3@user.io',
        username: 'fakeuser3',
        firstName: 'Kobe',
        lastName: 'Byrant',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'fake4@user.io',
        username: 'fakeuser4',
        firstName: 'James',
        lastName: 'Harden',
        hashedPassword: bcrypt.hashSync('password')
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Users', {
      username: { [Op.in]: ['Demo-lition1', 'FakeUser2', 'FakeUser3','Demo-lition4', 'FakeUser5', 'FakeUser6'] }
    }, {});
  }
};
