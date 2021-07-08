const _ = require('lodash')
const { fontFamily } = require('tailwindcss/defaultTheme')
const { THEME_LIST, THEME_DEFAULT } = require('../src/providers/theme/themes')

module.exports = {
  darkMode: 'class',
  mode: 'jit',
  theme: {
    fontFamily: {
      display: ['"IBM Plex Mono"', ...fontFamily.mono],
      body: ['"IBM Plex Serif"', ...fontFamily.serif],
      mono: ['"IBM Plex Mono"', ...fontFamily.mono],
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      ..._.mapValues(THEME_DEFAULT.colors, (v, k) => `var(--${k})`),
    },
    screens: {
      xs: '410px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
      '3xl': '1680px',
      '4xl': '1920px',
    },
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
  plugins: [
    require('@tailwindcss/typography'),
  ],
  purge: {
    content: [
      './src/**/*.js',
    ],
    safelist: [
      ..._.uniq(THEME_LIST.map(t => t.getClassNames()).flat()),
    ]
  },
}
