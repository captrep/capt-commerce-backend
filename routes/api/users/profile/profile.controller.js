const ApiErrorHandler = require('../../../../helpers/ApiErrorHandler')
const { successApi } = require('../../../../utils/response')
const userTransformer = require('../../../../helpers/transformer/user')
const fs = require('fs')

const profileInfo = async (req, res, next) => {
    try {
        res.status(200).json(
            successApi(200, 'OK', userTransformer.detail(req.user.toJSON()))
        );
    } catch (err) {
        next(err)
    }
}

const updateProfile = async (req, res, next) => {
    try {
        const user = req.user
        const { firstName, lastName, mobile } = req.body

        user.firstName = firstName
        user.lastName = lastName
        user.mobile = mobile
        await user.save()

        res.status(200).json(
            successApi(200, 'OK', userTransformer.detail(user.toJSON()))
        );
    } catch (err) {
        next(err)
    }
}

const updateImage = async (req, res, next) => {
    try {
        const user = req.user
        if (user.image !== '') {
            const imageBefore = user.image.split('\\')
            const imageStorage = fs.readdirSync('images')
            if (imageStorage.includes(imageBefore[1])) {
                fs.unlink(`images\\${imageBefore[1]}`, (err) => {
                    err ? console.log(err) : console.log(`Succes Deleted images`)
                })
            }
        }
        
        user.image = req.file.path
        await user.save()

        res.status(200).json(
            successApi(200, 'OK', {image: user.image})
        )
    } catch (err) {
        next(err)
    }
}

const deleteImage = async (req, res, next) => {
    try {
        const user = req.user
        if (user.image !== '') {
            const imageBefore = user.image.split('\\')
            const imageStorage = fs.readdirSync('images')
            if (imageStorage.includes(imageBefore[1])) {
                fs.unlink(`images\\${imageBefore[1]}`, (err) => {
                    err ? console.log(err) : console.log(`Succes Deleted images`)
                })
            }
            
            user.image = ''
            await user.save()
    
            res.status(200).json(
                successApi(200, 'OK', {image: 'User image has been deleted'})
            )
        }

    } catch (err) {
        next(err)
    }
}

module.exports = {
    profileInfo,
    updateProfile,
    updateImage,
    deleteImage
}