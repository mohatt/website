const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  theme: {
    fontFamily: {
      display: ['"IBM Plex Mono"', ...defaultTheme.fontFamily.mono],
      body: ['"IBM Plex Serif"', ...defaultTheme.fontFamily.serif],
      mono: ['"IBM Plex Mono"', ...defaultTheme.fontFamily.mono],
    },
    extend: {
      colors: {
        typo: '#f7f3e3',
        'typo-dimmer': '#7c8171',
        'typo-dim': '#9a937c',
        accent: '#222222',
        primary: '#b28e59',
        secondary: '#234e52',
      },
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
}
