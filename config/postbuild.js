module.exports = {
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
  }
}
