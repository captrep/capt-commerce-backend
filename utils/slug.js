const generateSlug = (title) => {
    return title
        .replace(/[&\/\\#,+()$~%.'!@%'":*?<>{}]/g, '')
        .replace(/ /g, '-')
        .toLowerCase()
}

module.exports = generateSlug;