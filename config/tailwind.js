module.exports = {
  theme: {
    fontFamily: {
      mono: ['"IBM Plex Mono"', 'monospace'],
      sans: ['"IBM Plex Sans"', 'sans-serif'],
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
      },
      screens: {
        '2xl': '1440px',
      },
      fontSize: {
        xl: '1.35rem',
        '2xl': '1.65rem',
      },
    },
  },
  variants: {
    extend: {
      fontSize: ['rfs'],
      width: ['rfs'],
      maxWidth: ['rfs'],
    },
  },
  plugins: [
    require('tailwindcss-rfs'),
    require('@tailwindcss/typography'),
  ],
  purge: false,
}
