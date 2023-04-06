/* eslint-disable lines-around-directive */
/* eslint-disable strict */
/* eslint-disable quotes */
/* eslint-disable implicit-arrow-linebreak */
"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) =>
    Promise.all([
      queryInterface.addColumn("Products", "deletedAt", {
        type: Sequelize.DATE,
        allowNull: true,
      }),
    ]),

  // eslint-disable-next-line no-unused-vars
  down: async (queryInterface, Sequelize) =>
    Promise.all([queryInterface.removeColumn("Products", "deletedAt")]),
};
