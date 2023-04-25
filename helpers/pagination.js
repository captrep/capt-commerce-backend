const getOffset = (page, limit) => {
    return (page * limit) - limit;
}
   
const getNextPage = (page, limit, total) => {
    if ((total/limit) > page) {
        return page + 1;
    }

    return null
}

const getPreviousPage = (page) => {
    if (page <= 1) {
        return null
    }
    return page - 1;
}

module.exports = {
    getOffset, getNextPage, getPreviousPage
}