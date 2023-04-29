'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CartItem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      CartItem.belongsTo(models.Product, {
        as: 'product',
        foreignKey: 'product_id',
        onDelete: 'CASCADE'
      })
      CartItem.belongsTo(models.Cart, {
        as: 'cart',
        foreignKey: 'cart_id',
        onDelete: 'CASCADE'
      })
    }
  }
  CartItem.init({
    cart_id: DataTypes.STRING,
    product_id: DataTypes.STRING,
    qty: DataTypes.BIGINT
  }, {
    sequelize,
    modelName: 'CartItem',
    tableName: 'cart_items'
  });
  return CartItem;
};