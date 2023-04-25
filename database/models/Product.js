'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
      Product.belongsTo(models.ProductCategory, {
        as: 'category',
        foreignKey: 'category_id'
      })
      Product.hasMany(models.Cart, {
        as: 'carts',
        foreignKey: 'product_id'
      })
    }
  }
  Product.init({
    name: DataTypes.STRING,
    desc: DataTypes.TEXT,
    slug: DataTypes.STRING,
    category_id: DataTypes.STRING,
    stock: DataTypes.BIGINT,
    price: DataTypes.BIGINT,
    weight: DataTypes.BIGINT
  }, {
    sequelize,
    modelName: 'Product',
    tableName: 'products'
  });
  return Product;
};