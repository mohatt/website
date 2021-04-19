module.exports = require('./gatsby').ssr
module.exports.wrapRootElement = require('./src/wrapRootElement').default
module.exports.wrapPageElement = require('./src/wrapPageElement').default
