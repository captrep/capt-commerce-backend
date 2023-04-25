'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserAddress extends Model {
    static associate(models) {
      UserAddress.belongsTo(models.User, {
        as: 'address',
        foreignKey: 'user_id'
      })
    }
  }
  UserAddress.init({
    user_id: DataTypes.STRING,
    address_line1: DataTypes.STRING,
    address_line2: DataTypes.STRING,
    city: DataTypes.STRING,
    postalcode: DataTypes.STRING,
    country: DataTypes.STRING,
    mobile: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'UserAddress',
    tableName: 'user_addresses'
  });
  return UserAddress;
};