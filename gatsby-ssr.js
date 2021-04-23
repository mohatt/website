module.exports = require('./gatsby').ssr

const browser = require('./gatsby-browser')
module.exports.wrapRootElement = browser.wrapRootElement
module.exports.wrapPageElement = browser.wrapPageElement
