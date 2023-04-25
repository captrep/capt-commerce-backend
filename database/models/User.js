'use strict';
const {
  Model
} = require('sequelize');

const bcryptHelper = require("../../helpers/bcrypt");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.UserAddress, {
        as: 'addresses',
        foreignKey: 'user_id'
      })
      User.hasMany(models.Cart, {
        as: 'carts',
        foreignKey: 'user_id'
      })
    }
  }
  User.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: {
      type: DataTypes.STRING,
      set(value) {
        const encryptedPassword = bcryptHelper.encryptPassword(value);
        this.setDataValue("password", encryptedPassword) 
      }
    },
    mobile: DataTypes.STRING,
    image: DataTypes.STRING,
    role: DataTypes.ENUM('admin', 'user')
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'users'
  });
  return User;
};