/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable quotes */
module.exports = {
  up: async (queryInterface, Sequelize) =>
    Promise.all([
      queryInterface.changeColumn("Products", "buyPrice", {
        type: Sequelize.INTEGER,
        allowNull: false,
      }),
      queryInterface.changeColumn("Products", "sellPrice", {
        type: Sequelize.INTEGER,
        allowNull: false,
      }),
    ]),

  // eslint-disable-next-line no-unused-vars
  down: async (queryInterface, Sequelize) =>
    Promise.all([
      queryInterface.removeColumn("Products", "buyPrice"),
      queryInterface.removeColumn("Products", "sellPrice"),
    ]),
};
