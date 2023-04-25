const { body } = require('express-validator')
const { ProductCategory } = require('../../../database/models')

const create =[
    body('name').notEmpty().withMessage('IS_EMPTY').bail()
    .custom(name => {
        return ProductCategory.findOne({
            where: {name}
        }).then(category => {
            if(category) return Promise.reject("ALREADY_TAKEN");
        });
    })
]

const update =[
    body('name').notEmpty().withMessage('IS_EMPTY').bail()
    .custom(name => {
        return ProductCategory.findOne({
            where: {name}
        }).then(category => {
            if(category) return Promise.reject("ALREADY_TAKEN");
        });
    })
]
module.exports = {
    create,
    update
}