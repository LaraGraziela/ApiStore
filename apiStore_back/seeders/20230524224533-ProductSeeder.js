"use strict";
const { faker } = require("@faker-js/faker");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    for(let i = 0; i <= 30 ; i++) {
      await queryInterface.bulkInsert(
        "Products",
        [
          {
            name: faker.commerce.productName(),
            description: faker.commerce.productDescription(),
            quantity: Math.floor(Math.random() * (500 - 1) + 1),
            price: faker.commerce.price(),
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ],
        {}
      );
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Products', null, {});
  },
};
