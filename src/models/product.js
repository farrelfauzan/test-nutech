/* eslint-disable quotes */
/* eslint-disable comma-dangle */
/* eslint-disable func-names */

module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define(
    "Product",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      photo: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      buyPrice: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      sellPrice: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      stockLeft: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      paranoid: true,
      timestamp: true,
    }
  );
  Product.associate = function (models) {
    // associations can be defined here
    Product.belongsTo(models.User, { foreignKey: "userId" });
  };
  return Product;
};
