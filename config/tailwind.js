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
        primary: 'var(--primary)',
        secondary: 'var(--secondary)',
        accent: 'var(--accent)',
        typo: 'var(--typo)',
        'typo-dim': 'var(--typo-dim)',
        'typo-dimmer': 'var(--typo-dimmer)',
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
