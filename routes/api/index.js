const api = require('express').Router();

const errorHandlingApi = require('../../middleware/errorHandlingApi');

api.use('/users', require('./users/users.route'));
api.use('/product-categories', require('./product-categories/product-categories.route'))
api.use('/products', require('./products/products.route'))
api.use('/carts', require('./carts/carts.route'))
api.use('/orders', require('./orders/orders.route'))
api.use(errorHandlingApi);

module.exports = api;