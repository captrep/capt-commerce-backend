const ApiErrorHandler = require('../helpers/ApiErrorHandler')
const { failedApi } = require('../utils/response')
const multer = require('multer')

const errorHandlingApi = async (err, req, res, next) => {
    if (err instanceof ApiErrorHandler) {
        const { statusCode, message, data } = err
        
        return res.status(statusCode).json(
            failedApi(statusCode, message, data)
        );
    }
    if (err instanceof multer.MulterError) {
        const errors = new Object()
        errors[err.field] = err.message
        
        return res.status(422).json(
            failedApi(422, 'error validating request data', errors)
        );
    }
    res.status(500).json(err);
}

module.exports = errorHandlingApi;