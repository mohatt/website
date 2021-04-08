const tailwind = require('tailwindcss/defaultTheme')

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
