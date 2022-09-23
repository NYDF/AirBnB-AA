'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {

     await queryInterface.bulkInsert('SpotImages', [
      {
       spotId: '1',
       url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-50938332/original/fda50b06-0eb4-4b86-917d-4a16515beab9.jpeg?im_w=1200',
       preview: true
     },
     {
      spotId: '1',
      url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-50938332/original/f35025ff-1a7e-4bc6-83bd-af410c10dcd8.jpeg?im_w=720',
      preview: false
    },
    {
      spotId: '2',
      url: 'https://a0.muscache.com/im/pictures/4de4712a-f9a8-4883-ba40-718155ed37eb.jpg?im_w=1200',
      preview: false
    },
    {
      spotId: '2',
      url: 'https://a0.muscache.com/im/pictures/0570c3e9-c873-4ea6-8a61-97ba9fb9d0dd.jpg?im_w=1200',
      preview: true
    },
    {
      spotId: '3',
      url: 'https://a0.muscache.com/im/pictures/360d47a5-fc69-48d6-958b-b4bd3ab1b0b2.jpg?im_w=1200',
      preview: true
    },
    {
     spotId: '3',
     url: 'https://a0.muscache.com/im/pictures/e0b84552-eecc-45ac-857b-05d5c9bb5a96.jpg?im_w=720',
     preview: false
   },
   {
    spotId: '4',
    url: 'https://a0.muscache.com/im/pictures/bbb0499d-5bb4-4f98-b915-d4140a765c5f.jpg?im_w=1200',
    preview: true
  },
  {
    spotId: '4',
    url: 'https://a0.muscache.com/im/pictures/c4942669-f8c0-4cac-90ba-75a276ca63a1.jpg?im_w=720',
    preview: false
  },
  {
    spotId: '4',
    url: 'https://a0.muscache.com/im/pictures/7fda305f-fe25-4b10-ad57-aa83af5b39b5.jpg?im_w=720',
    preview: false
  },
   {
     spotId: '5',
     url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-591492586619388871/original/2084d31a-af14-48a6-8631-ca7e45b7a78e.jpeg?im_w=1200',
     preview: true
   },
   {
    spotId: '5',
    url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-591492586619388871/original/59cb668b-6d9b-4950-862c-ad4a6bd35532.jpeg?im_w=720',
    preview: false
  },
   {
     spotId: '6',
     url: 'https://a0.muscache.com/im/pictures/320a5249-ee42-4197-ac29-fbdd3d2a88cc.jpg?im_w=1200',
     preview: true
   },
    {
      spotId: '6',
      url: 'https://a0.muscache.com/im/pictures/ff86834f-fdc8-4d04-813f-300e1c85f596.jpg?im_w=720',
      preview: false
    },
    {
      spotId: '7',
      url: 'https://a0.muscache.com/im/pictures/miso/Hosting-54054588/original/4ec55d18-72d2-4f77-9b6a-9303fc390e7f.jpeg?im_w=1200',
      preview: true
    },
    {
     spotId: '7',
     url: 'https://a0.muscache.com/im/pictures/7526e221-6ae5-4162-924f-8a7feaa50d0a.jpg?im_w=720',
     preview: false
   },
   {
     spotId: '8',
     url: 'https://a0.muscache.com/im/pictures/1b3eca9e-1705-444d-b0fe-ac1a2f2e0227.jpg?im_w=1200',
     preview: true
   },
   {
     spotId: '8',
     url: 'https://a0.muscache.com/im/pictures/c5cc22fe-5655-40b4-9924-de2498b533ec.jpg?im_w=720',
     preview: false
   },
    ], {});

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('SpotImages', null, {});
  }
};
