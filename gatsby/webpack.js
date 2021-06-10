const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const env = require('../config/environment')

module.exports = function ({ stage, plugins: gatsbyPlugins, actions }) {
  const plugins = [
    gatsbyPlugins.define({
      __ENVIRONMENT__: JSON.stringify(env.is),
      __ENVIRONMENT_CONFIG__: JSON.stringify(env.config),
    })
  ]

  if (stage === 'build-javascript') {
    plugins.push(new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      reportFilename: 'webpack.report.html',
      openAnalyzer: false
    }))
  }

  actions.setWebpackConfig({ plugins })
}
