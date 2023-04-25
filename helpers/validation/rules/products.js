const { body } = require('express-validator')
const { ProductCategory } = require('../../../database/models')

const create = [
    body('name').notEmpty().withMessage('IS_EMPTY').bail(),
    body('desc').notEmpty().withMessage('IS_EMPTY').bail(),
    body('category_id').notEmpty().withMessage('IS_EMPTY').bail()
    .custom(category_id => {
        return ProductCategory.findByPk(category_id)
        .then(category => {
            if(!category) return Promise.reject("CATEGORY NOT FOUND");
        })
    }),
    body('stock').notEmpty().withMessage('IS_EMPTY').bail(),
    body('price').notEmpty().withMessage('IS_EMPTY').bail(),
    body('weight').notEmpty().withMessage('IS_EMPTY').bail()
]

const update = [
    body('name').notEmpty().withMessage('IS_EMPTY').bail(),
    body('desc').notEmpty().withMessage('IS_EMPTY').bail(),
    body('category_id').notEmpty().withMessage('IS_EMPTY').bail()
    .custom(category_id => {
        return ProductCategory.findByPk(category_id)
        .then(category => {
            if(!category) return Promise.reject("CATEGORY NOT FOUND");
        })
    }),
    body('stock').notEmpty().withMessage('IS_EMPTY').bail(),
    body('price').notEmpty().withMessage('IS_EMPTY').bail(),
    body('weight').notEmpty().withMessage('IS_EMPTY').bail()
]
module.exports = {
    create,
    update
}