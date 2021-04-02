const _ = require('lodash')
const tailwind = require('tailwindcss/defaultTheme')
const theme = require('./themes').default

module.exports = {
  theme: {
    fontFamily: {
      display: ['"IBM Plex Mono"', ...tailwind.fontFamily.mono],
      body: ['"IBM Plex Serif"', ...tailwind.fontFamily.serif],
      mono: ['"IBM Plex Mono"', ...tailwind.fontFamily.mono],
    },
    extend: {
      colors: _.mapValues(theme.colors, ((c, k) => `var(--${k})`)),
      width: {
        inherit: 'inherit',
      },
      height: {
        inherit: 'inherit',
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
  purge: false,
  darkMode: 'class'
}
