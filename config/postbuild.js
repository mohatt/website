module.exports = {
  enabled: true,
  ignore: [
    'webpack.report.html',
  ],
  purgecss: {
    enabled: true,
    allowSymbols: true,
    writeRejected: true,
    safelist: {
      // pseudo selectors starting with `:`
      // eg :-moz-focusring ::-webkit-file-upload-button
      standard: [/^:/]
    },
  },
  'netlify-headers': {
    enabled: true
  },
  minify: {
    enabled: true,
    style: ['default', {
      discardComments: {
        remove: comment => {
          return comment !== '!'
        }
      }
    }]
  }
}
