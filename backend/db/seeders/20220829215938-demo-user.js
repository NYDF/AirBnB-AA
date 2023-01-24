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
        hashedPassword: bcrypt.hashSync('password'),
        photo: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/006.png'
      },
      {
        email: 'fake2@user.io',
        username: 'fakeuser2',
        firstName: 'Micheal',
        lastName: 'Jordan',
        hashedPassword: bcrypt.hashSync('password'),
        photo: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/004.png'
      },
      {
        email: 'fake3@user.io',
        username: 'fakeuser3',
        firstName: 'Kobe',
        lastName: 'Byrant',
        hashedPassword: bcrypt.hashSync('password'),
        photo: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/024.png'
      },
      {
        email: 'fake4@user.io',
        username: 'fakeuser4',
        firstName: 'James',
        lastName: 'Harden',
        hashedPassword: bcrypt.hashSync('password'),
        photo: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/025.png'
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
