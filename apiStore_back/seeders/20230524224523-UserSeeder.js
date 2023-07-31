"use strict";
const { faker } = require("@faker-js/faker");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
  
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          name: "Admin Test",
          email: "admin@gmail.com",
          password: "12345",
          type: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Client Test",
          email: "client@gmail.com",
          password: "12345",
          type: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );

  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  },
};
