const { nanoid } = require('nanoid')
const { ProductCategory } = require("../../../database/models")
const { successApi } = require('../../../utils/response')
const ApiErrorHandler = require('../../../helpers/ApiErrorHandler')

const createProductCategory = async (req, res, next) => {
    try {
        const { name } = req.body
        const productCategory = await ProductCategory.create({
            id: nanoid(),
            name
        })

        res.status(201).json(
            successApi(201, 'Created', productCategory)
        )
    } catch (error) {
        next(error)
    
    }
}

const index = async (req, res, next) => {
    try {
        const productCategories = await ProductCategory.findAll()
        if (productCategories.length === 0) throw new ApiErrorHandler(404, 'PRODUCT CATEGORIES NOT FOUND')

        res.status(200).json(
            successApi(200, 'Ok', productCategories)
        )
    } catch (error) {
        next(error)
    }
}

const updateProductCategory = async (req, res, next) => {
    try {
        const { id } = req.params
        const { name } = req.body

        const productCategory = await ProductCategory.findByPk(id)
        if (!productCategory) throw new ApiErrorHandler(404, 'PRODUCT CATEGORIES NOT FOUND')

        productCategory.name = name
        await productCategory.save()
        
        res.status(200).json(
            successApi(200, 'Ok', productCategory)
        )
    } catch (error) {
        next(error)
    }
}

const removeProductCategory = async (req, res, next) => {
    try {
        const productCategory = await ProductCategory.findByPk(req.params.id)
        if (!productCategory) throw new ApiErrorHandler(404, 'PRODUCT CATEGORIES NOT FOUND')

        await productCategory.destroy()
        res.status(200).json(
            successApi(200, 'Ok', productCategory)
        )
    } catch (error) {
        next(error)
    }
}

module.exports = {
    createProductCategory,
    index,
    updateProductCategory,
    removeProductCategory
}