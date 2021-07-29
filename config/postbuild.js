const deployment = require('./deployment')

module.exports = {
  enabled: true,
  reporting: false,
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
        // selectors with important modifier `!`
        // eg :-moz-focusring ::-webkit-file-upload-button !underline
        /^[:!]/,
        // keyframes selectors
        // eg 50% {}
        /^[0-9]+%$/,
        // custom-value selectors
        // eg w-[50rem]
        /\[[^[]+]$/,
      ],
    },
  },
  'http-headers': {
    enabled: true,
    provider: 'firebase',
    headers: {
      '[*]': !deployment.is.production ? { 'X-Robots-Tag': 'noindex' } : {},
      '[pages]': {
        link: [
          '<https://www.googletagmanager.com>; rel=preconnect',
          '<https://www.google-analytics.com>; rel=preconnect',
        ],
      },
    },
  },
  minify: {
    enabled: true,
    style: ['default', {
      discardComments: {
        remove: comment => {
          return comment !== '!'
        },
      },
    }],
  },
}
