const {nanoid} = require('nanoid');

const ApiErrorHandler = require('../../../../../helpers/ApiErrorHandler')
const { successApi } = require('../../../../../utils/response')
const userAddressTransformer = require('../../../../../helpers/transformer/userAddress')
const { UserAddress } = require('../../../../../database/models')

const addressInfo = async (req, res, next) => {
    try {
        const address = await UserAddress.findAll({
            where: {
                user_id: req.user.id
            }
        })

        if (address.length === 0) throw new ApiErrorHandler(404, 'ADDRESS NOT FOUND')
         
        res.status(200).json(
            successApi(200, 'OK', userAddressTransformer.list(address))
        )
        
    } catch (error) {
        next(error)
    }
}

const addAddress = async (req, res, next) => {
    try {
        const { address_line1, address_line2, city, postalcode, country,  mobile } = req.body
        const address = await UserAddress.create({
            id: nanoid(),
            user_id: req.user.id,
            address_line1,
            address_line2,
            city,
            postalcode,
            country,
            mobile
        });
        
        res.status(201).json(
            successApi(201, 'Created', userAddressTransformer.detail(address.toJSON()))
        )
    } catch (error) {
        next(error)
    }
}

const updateAddress = async (req, res, next) => {
    try {
        const { address_line1, address_line2, city, postalcode, country,  mobile } = req.body
        const address = await UserAddress.findByPk(req.params.id)

        if (address === null) throw new ApiErrorHandler(404, 'NOT FOUND')

        const update = await UserAddress.update(
        {
            address_line1: address_line1,
            address_line2: address_line2,
            city: city,
            postalcode: postalcode,
            country: country,
            mobile: mobile
        }, 
        {
            where : {
                id: address.id
            }
        })

        if (update.length === 0) throw new ApiErrorHandler(500, 'Something went wrong with database')
        const updatedAddress = await UserAddress.findByPk(req.params.id)
        res.status(200).json(
            successApi(200, 'OK', userAddressTransformer.detail(updatedAddress.toJSON()))
        )
        
    } catch (error) {
        next(error)
    }
}

const removeAddress = async (req, res, next) => {
    try {
        const address = await UserAddress.findByPk(req.params.id)
        if (!address) throw new ApiErrorHandler(404, 'ADDRESS NOT FOUND')
        await address.destroy()
        
        res.status(200).json(
            successApi(200, 'OK', {message: 'User address has been deleted'})
        )
        
    } catch (error) {
        next(error)
    }
}

module.exports = {
    addressInfo,
    addAddress,
    updateAddress,
    removeAddress
}