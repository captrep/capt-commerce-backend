const multer = require('multer')
const ApiErrorHandler = require('../helpers/ApiErrorHandler')
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images')
    },
    filename: (req, file, cb) => {
        cb(null, new Date().getTime() + '-' + file.originalname)
    }
})

const fileFilter = (req, file, cb) => {
    
    if (file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true)
    } else {
        cb(null, false)
        return cb(new ApiErrorHandler(422, 'error validating request data', {images: 'NOT_IMAGE_FORMATTED'}))
    }
}
const upload = multer({storage, fileFilter, limits: {fileSize: 2126698} }).single('image')

module.exports = upload