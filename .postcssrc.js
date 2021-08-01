/**
 * This config file is only used when importing css files as raw string
 *
 * @example
 *  import styles from '!raw-loader!postcss-loader!path/to/styles.css'
 */
module.exports = require('./config/postcss')

module.exports.plugins.push(
  require('cssnano')({
    preset: ['default', { discardComments: { removeAll: true } }]
  })
)
