'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    static associate(models) {
      Cart.belongsTo(models.User, {
        as: 'user',
        foreignKey: 'user_id'
      })
      Cart.hasMany(models.CartItem, {
        as: 'cart_item',
        foreignKey: 'cart_id'
      })
    }
  }
  Cart.init({
    user_id: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Cart',
    tableName: 'carts'
  });
  return Cart;
};