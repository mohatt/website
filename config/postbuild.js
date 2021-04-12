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
      standard: [
        // pseudo selectors starting with `:`
        // eg :-moz-focusring ::-webkit-file-upload-button
        /^:/,
        // keyframes selectors
        // eg 50% {}
        /^[0-9]+%$/
      ]
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
