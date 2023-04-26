'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    static associate(models) {
      Order.hasMany(models.OrderLine, {
        as: 'order_line',
        foreignKey: 'order_id'
      })
    }
  }
  Order.init({
    user_id: DataTypes.STRING,
    order_date: DataTypes.DATE,
    payment_method: DataTypes.STRING,
    shipping_address: DataTypes.STRING,
    shipping_method: DataTypes.STRING,
    order_total: DataTypes.BIGINT,
    order_status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Order',
    tableName: 'orders'
  });
  return Order;
};