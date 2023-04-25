const successApi = (code, status, data = {}) => {
    let res = {
        code,
        status,

    }

    if (Object.keys(data).length > 0) {
        res.data = data;
    }

    return {
        code,
        status,
        data
    }
}

const failedApi = (code, message, data = {}) => {
    let res = {
        error: {
            code,
            message,
        }

    }
    
    if (Object.keys(data).length > 0) {
        res.error.errors = data;
    }

    return res;
}

module.exports = {
    successApi,
    failedApi
}