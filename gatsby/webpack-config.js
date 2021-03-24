const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

// Modify webpack config based on project needs
module.exports = function ({ stage, actions }) {
  if (stage === 'build-javascript') {
    actions.setWebpackConfig({
      plugins: [
        new BundleAnalyzerPlugin({
          analyzerMode: 'static',
          reportFilename: 'webpack.report.html',
          openAnalyzer: false
        }),
      ]
    })
  }
}
