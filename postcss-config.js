'use strict'

const presetenv = require('postcss-preset-env')({
  /* use stage 1 features + css nesting rules */
  stage: 1,
  features: {
    'nesting-rules': true
  }
})

const rfs = require('rfs')({
  baseFontSize: '1rem',
  fontSizeUnit: 'rem',
  breakpointUnit: 'px'
})

module.exports = [
  require('postcss-import'),
  require('tailwindcss'),
  rfs,
  presetenv
]
