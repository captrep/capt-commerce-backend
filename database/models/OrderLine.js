'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OrderLine extends Model {
    static associate(models) {
      OrderLine.belongsTo(models.Product, {
        as: 'product',
        foreignKey: 'product_id'
      })
      OrderLine.belongsTo(models.Order, {
        as: 'order',
        foreignKey: 'order_id'
      })
    }
  }
  OrderLine.init({
    product_id: DataTypes.STRING,
    order_id: DataTypes.STRING,
    qty: DataTypes.STRING,
    price: DataTypes.BIGINT
  }, {
    sequelize,
    modelName: 'OrderLine',
    tableName: 'order_lines'
  });
  return OrderLine;
};