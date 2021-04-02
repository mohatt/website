module.exports = {
  ignore: [
    'webpack.report.html',
  ],
  extensions: {
    html: {
      concurrency: 5
    }
  },
  purgecss: {
    enabled: true,
    allowSymbols: true
  },
  'netlify-headers': {
    enabled: true
  }
}
