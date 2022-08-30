'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('ReviewImages', [
      {
        reviewId: '2',
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-673753152039498122/original/c136e486-ce55-4aed-8724-e6deaff67909.jpeg?im_w=720',
      },
      {
        reviewId: '2',
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-665819087296104155/original/d17b5fe9-6c37-4353-8c38-85901cf8395c.jpeg?im_w=720',
      },
      {
        reviewId: '3',
        url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-46358245/original/e02fa4d8-2cb2-4e87-a523-091e5bd78bf6.jpeg?im_w=720',
      },
      {
        reviewId: '3',
        url: 'https://a0.muscache.com/im/pictures/e24ed0a8-7c95-43a5-8eed-b1976bd58fed.jpg?im_w=720',
      },
      {
        reviewId: '4',
        url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-44031119/original/d2875547-7a3c-49b5-b3f5-1b156b0555bd.jpeg?im_w=720',
      }
    ], {});

  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('ReviewImages', null, {});
  }
};
