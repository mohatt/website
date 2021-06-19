const _ = require('lodash')
const { fontFamily } = require('tailwindcss/defaultTheme')
const themes = require('../src/providers/theme/themes')

module.exports = {
  darkMode: 'class',
  mode: 'jit',
  theme: {
    fontFamily: {
      display: ['"IBM Plex Mono"', ...fontFamily.mono],
      body: ['"IBM Plex Serif"', ...fontFamily.serif],
      mono: ['"IBM Plex Mono"', ...fontFamily.mono],
    },
    extend: {
      colors: _.mapValues(themes.THEME_DEFAULT.colors, ((v, k) => `var(--${k})`)),
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
    ],
    safelist: [
      ..._.uniq(themes.THEME_LIST.map(t => t.getClassNames()).flat())
    ]
  },
}