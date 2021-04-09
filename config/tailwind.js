const _ = require('lodash')
const tailwind = require('tailwindcss/defaultTheme')
const colors = require('../src/commons').THEME_LIST[0].colors

module.exports = {
  darkMode: 'class',
  mode: 'jit',
  theme: {
    fontFamily: {
      display: ['"IBM Plex Mono"', ...tailwind.fontFamily.mono],
      body: ['"IBM Plex Serif"', ...tailwind.fontFamily.serif],
      mono: ['"IBM Plex Mono"', ...tailwind.fontFamily.mono],
    },
    extend: {
      colors: _.mapValues(colors, ((v, k) => `var(--${k})`)),
      width: {
        inherit: 'inherit',
      },
      height: {
        inherit: 'inherit',
      },
      transitionProperty: {
        box: 'height, width, margin, padding'
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
  purge: {
    content: [
      './src/**/*.js',
      // './public/**/*.html',
      './src/css/themes.css',
      './src/css/whitelist.txt',
    ],
    options: {
      extractors: [],
    }
  },
}
