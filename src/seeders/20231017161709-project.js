'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */

    await queryInterface.bulkInsert(
      'Projects',
      [
        {
          name: 'Web Programming',
          startDate: '2023-10-11',
          endDate: '2023-10-24',
          description: 'Membuat aplikasi Web menggunakan React JS',
          technologies: 'react',
          image: 'wallpaper_3.jpg',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Ecomerce',
          startDate: '2023-02-11',
          endDate: '2023-03-2',
          description: 'Ecomerce dengan fullstack NextJS',
          technologies: 'nextjs',
          image: 'wallpaper_3.jpg',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
