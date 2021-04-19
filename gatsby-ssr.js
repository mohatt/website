/**
 * Please don't make any changes unless you are aware
 *  of how Gatsby statically processes this file
 *
 * This is a dummy export to let Gatsby know that this
 * is a valid commonjs module with valid APIs
 *
 * @see gatsby/src/bootstrap/resolve-module-exports.ts #L123
 */
module.exports.onRenderBody = () => null

module.exports = {
  ...require('./gatsby').ssr,
  ...require('./src/wrappers')
}
