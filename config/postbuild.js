const env = require('./environment')

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
  'http-headers': {
    enabled: true,
    provider: 'firebase',
    headers: {
      '[*]': !env.isProduction()
        ? { 'X-Robots-Tag': 'noindex' }
        : {},
      '[pages]': {
        link: [
          '<https://www.googletagmanager.com>; rel=preconnect',
          '<https://www.google-analytics.com>; rel=preconnect',
        ]
      }
    }
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
