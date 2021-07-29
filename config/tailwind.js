const _ = require('lodash')
const { fontFamily } = require('tailwindcss/defaultTheme')
const { themes, screens, colors } = require('../src/constants/tailwind')

module.exports = {
  darkMode: 'class',
  mode: 'jit',
  theme: {
    fontFamily: {
      display: ['"IBM Plex Mono"', ...fontFamily.mono],
      body: ['"IBM Plex Serif"', ...fontFamily.serif],
      mono: ['"IBM Plex Mono"', ...fontFamily.mono],
    },
    colors,
    screens,
    extend: {
      width: {
        inherit: 'inherit',
      },
      height: {
        inherit: 'inherit',
      },
      transitionProperty: {
        box: 'height, width, margin, padding',
      },
    },
  },
  plugins: [],
  purge: {
    content: [
      './src/**/*.js',
    ],
    safelist: [
      ..._.uniq(themes.color.map(t => t.class.split(' ')).flat()),
      ...themes.edges.map(t => t.class),
    ],
  },
}
