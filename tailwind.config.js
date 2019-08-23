const _ = require('lodash')

module.exports = {
  theme: {
    fontFamily: {
      mono: ['"IBM Plex Mono"', 'monospace'],
      sans: ['"IBM Plex Sans"', 'sans-serif']
    },
    rfs: theme => theme('fontSize'),
    extend: {
      colors: {
        typo: '#f7f3e3',
        'typo-dimmer': '#7c8171',
        'typo-dim': '#9a937c',
        accent: '#222222',
        primary: '#b28e59',
        secondary: '#234e52'
      },
      width: {
        inherit: 'inherit'
      },
      height: {
        inherit: 'inherit'
      },
      screens: {
        '2xl': '1440px'
      },
      fontSize: {
        xl: '1.35rem',
        '2xl': '1.65rem'
      }
    }
  },
  variants: {},
  plugins: [
    require('tailwindcss-transitions')(),
    function ({ theme, variants, e, addBase, addUtilities }) {
      const defaultRfsTheme = {}
      const defaultRfsVariants = []

      const rfsTheme = theme('rfs', defaultRfsTheme)

      const rfstUtilities = _.fromPairs(
        _.map(rfsTheme, (value, modifier) => {
          return [
            `.${e(`rfs-${modifier}`)}`,
            {
              rfs: value
            }
          ]
        })
      )

      addUtilities(rfstUtilities, defaultRfsVariants)
    }
  ]
}
