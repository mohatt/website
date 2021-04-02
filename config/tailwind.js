const _ = require('lodash')
const tailwind = require('tailwindcss/defaultTheme')
const themes = require('./themes')

module.exports = {
  theme: {
    fontFamily: {
      display: ['"IBM Plex Mono"', ...tailwind.fontFamily.mono],
      body: ['"IBM Plex Serif"', ...tailwind.fontFamily.serif],
      mono: ['"IBM Plex Mono"', ...tailwind.fontFamily.mono],
    },
    extend: {
      colors: _.mapValues(themes.default.colors, ((c, k) => `var(--${k})`)),
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
  purge: {
    content: [
      './src/**/*.js',
      // './public/**/*.html',
      './src/assets/css/whitelist.txt',
    ],
    options: {
      extractors: [
        {
          extensions: ['txt'],
          extractor: content => {
            return _.uniq(
              content
                .trim()
                .split(/\s+/)
                .concat(themes.THEME_LIST.map(t => t.getClassNames()))
                .flat()
            )
          }
        }
      ]
    }
  },
  darkMode: 'class'
}
