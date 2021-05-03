const env = require('../config/environment')

module.exports = function ({ stage, plugins, actions }) {
  actions.setWebpackConfig({
    plugins: [
      plugins.define({
        __ENVIRONMENT__: JSON.stringify(env.is),
        __ENVIRONMENT_CONFIG__: JSON.stringify(env.config),
      }),
    ]
  })
}
