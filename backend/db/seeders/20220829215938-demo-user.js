'use strict';
const bcrypt = require("bcryptjs");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        email: 'demo@user.io',
<<<<<<< HEAD:backend/db/seeders/20220825204658-demo-user.js
        username: 'Demo-lition',
        firstName: 'Demoo',
        lastName: 'litionn',
=======
        username: 'Demo-lition1',
        firstName: 'adam1',
        lastName: 'laure1',
>>>>>>> dev:backend/db/seeders/20220829215938-demo-user.js
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'user1@user.io',
<<<<<<< HEAD:backend/db/seeders/20220825204658-demo-user.js
        username: 'FakeUser1',
        firstName: 'Demoo1',
        lastName: 'litionn1',
=======
        username: 'FakeUser2',
        firstName: 'adam2',
        lastName: 'laure2',
>>>>>>> dev:backend/db/seeders/20220829215938-demo-user.js
        hashedPassword: bcrypt.hashSync('password2')
      },
      {
        email: 'user2@user.io',
<<<<<<< HEAD:backend/db/seeders/20220825204658-demo-user.js
        username: 'FakeUser2',
        firstName: 'Demoo2',
        lastName: 'litionn2',
=======
        username: 'FakeUser3',
        firstName: 'adam3',
        lastName: 'laure3',
>>>>>>> dev:backend/db/seeders/20220829215938-demo-user.js
        hashedPassword: bcrypt.hashSync('password3')
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Users', {
      username: { [Op.in]: ['Demo-lition1', 'FakeUser2', 'FakeUser3'] }
    }, {});
  }
};
