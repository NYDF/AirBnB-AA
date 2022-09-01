'use strict';
const bcrypt = require("bcryptjs");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        email: 'demo@user.io',
        username: 'Demo-lition1',
        firstName: 'adam1',
        lastName: 'laure1',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'user2@user.io',
        username: 'FakeUser2',
        firstName: 'adam2',
        lastName: 'laure2',
        hashedPassword: bcrypt.hashSync('password2')
      },
      {
        email: 'user3@user.io',
        username: 'FakeUser3',
        firstName: 'adam3',
        lastName: 'laure3',
        hashedPassword: bcrypt.hashSync('password3')
      },
      {
        email: 'demo4@user.io',
        username: 'Demo-lition4',
        firstName: 'adam4',
        lastName: 'laure4',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'user5@user.io',
        username: 'FakeUser5',
        firstName: 'adam5',
        lastName: 'laure5',
        hashedPassword: bcrypt.hashSync('password2')
      },
      {
        email: 'user6@user.io',
        username: 'FakeUser6',
        firstName: 'adam6',
        lastName: 'laure6',
        hashedPassword: bcrypt.hashSync('password3')
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
