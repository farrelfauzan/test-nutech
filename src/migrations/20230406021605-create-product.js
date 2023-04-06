/* eslint-disable no-unused-vars */


module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Products', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    userId: {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: {
        model: 'Users', // name of the referenced model
        key: 'id', // primary key of the referenced model
      },
    },
    name: {
      type: Sequelize.STRING,
    },
    photo: {
      type: Sequelize.STRING,
    },
    buyPrice: {
      type: Sequelize.STRING,
    },
    sellPrice: {
      type: Sequelize.STRING,
    },
    stockLeft: {
      type: Sequelize.INTEGER,
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  }),
  down: (queryInterface, _Sequelize) => queryInterface.dropTable('Products'),
};
