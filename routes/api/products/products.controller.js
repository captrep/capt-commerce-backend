const { nanoid } = require('nanoid')
const { Product, ProductCategory } = require('../../../database/models')
const generateSlug = require('../../../utils/slug')
const {successApi} = require('../../../utils/response')
const ApiErrorHandler = require('../../../helpers/ApiErrorHandler')
const { getOffset, getNextPage, getPreviousPage } = require('../../../helpers/pagination')
const productTransformer = require('../../../helpers/transformer/product')

const createProduct = async (req, res, next) => {
    try {
        const { name, desc, category_id, stock, price, weight } = req.body
        const product = await Product.create({
            id: nanoid(),
            name,
            desc,
            slug: generateSlug(name),
            category_id,
            stock: parseInt(stock),
            price: parseInt(price),
            weight: parseInt(weight),
        })
        res.status(201).json(
            successApi(201, 'Created', product)
        )
    } catch (error) {
        next(error)
    }
}

const getAllProducts = async (req, res, next) => {
    try {
        const { page, limit } = req.query
        const currentPage = parseInt(page) || 1
        const currentLimit = parseInt(limit) || 2
        let sequelizeParams = {}
        let product = []

        sequelizeParams.include ={
            model: ProductCategory,
            as: 'category'
        }
        sequelizeParams.limit = currentLimit
        sequelizeParams.offset = getOffset(currentPage, currentLimit)

        let { count, rows } = await Product.findAndCountAll(sequelizeParams)
        rows = productTransformer.list(rows)
        product = {
            total_page: Math.ceil(count / currentLimit),
            previous_page: getPreviousPage(currentPage),
            current_page: currentPage,
            next_page: getNextPage(currentPage, currentLimit, count),
            total_result: count,
            limit: currentLimit,
            result: rows
        }

        res.status(200).json(
            successApi(200, 'Ok', product)
        )
    } catch (error) {
        next(error)
    }
}

const detailProduct = async (req, res, next) => {
    try {
        const { slug } = req.params
        const product = await Product.findOne({
            where: {
                slug
            },
            include: {
                model: ProductCategory,
                as: 'category'
            }
        })
        if (!product) throw new ApiErrorHandler(404, 'PRODUCT NOT FOUND')
        res.status(200).json(
            successApi(200, 'Ok', productTransformer.detail(product))
        )
    } catch (error) {
        next(error)
    }
}

const updateProduct = async (req, res, next) => {
    try {
        const { id } = req.params
        const { name, desc, category_id, stock, price, weight } = req.body

        const product = await Product.findByPk(id)
        if (!product) throw new ApiErrorHandler(404, 'PRODUCT  NOT FOUND')

        product.name = name
        product.desc = desc
        product.category_id = category_id
        product.stock = parseInt(stock)
        product.price = parseInt(price)
        product.weight = parseInt(weight)
        await product.save()
        res.status(200).json(
            successApi(200, 'Ok', product)
        )
    } catch (error) {
        next(error)
    }
}

const removeProduct = async (req, res, next) => {
    try {
        const product = await Product.findByPk(req.params.id)
        if (!product) throw new ApiErrorHandler(404, 'PRODUCT  NOT FOUND')
        await product.destroy()

        res.status(200).json(
            successApi(200, 'Ok', product)
        )
    } catch (error) {
        next(error)
    }
}

module.exports = {
    createProduct,
    getAllProducts,
    detailProduct,
    updateProduct,
    removeProduct
}