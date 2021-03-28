module.exports = {
  purgecss: {
    enabled: true,
    allowSymbols: true,
    safelist: [
      'theme:default',
      'theme:breeze',
    ]
  },
  'netlify-headers': {
    enabled: true
  }
}
