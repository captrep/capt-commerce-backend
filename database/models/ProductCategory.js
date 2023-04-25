'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductCategory extends Model {
    static associate(models) {
      ProductCategory.hasMany(models.Product, {
        as: 'categories',
        foreignKey: 'category_id'
      })
    }
  }
  ProductCategory.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'ProductCategory',
    tableName: 'product_categories',
  });
  return ProductCategory;
};