'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    static associate(models) {
      Cart.belongsTo(models.Product, {
        as: 'product',
        foreignKey: 'product_id'
      })
      Cart.belongsTo(models.User, {
        as: 'user',
        foreignKey: 'user_id'
      })
    }
  }
  Cart.init({
    user_id: DataTypes.STRING,
    product_id: DataTypes.STRING,
    qty: DataTypes.BIGINT
  }, {
    sequelize,
    modelName: 'Cart',
    tableName: 'carts'
  });
  return Cart;
};