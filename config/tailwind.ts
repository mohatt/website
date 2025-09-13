import _ from 'lodash'
import defaultTheme from 'tailwindcss/defaultTheme'
import { themes, themeScreens, themeColors } from '../src/constants/tailwind'

export default {
  darkMode: 'class',
  theme: {
    fontFamily: {
      display: ['"IBM Plex Mono"', ...defaultTheme.fontFamily.mono],
      body: ['"IBM Plex Serif"', ...defaultTheme.fontFamily.serif],
      mono: ['"IBM Plex Mono"', ...defaultTheme.fontFamily.mono],
      sans: ['Arimo', 'Arial', ...defaultTheme.fontFamily.sans],
    },
    colors: themeColors,
    screens: themeScreens,
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
  content: ['./src/**/*.{js,jsx,ts,tsx}', './content/**/*.mdx'],
  safelist: [
    ..._.uniq(themes.color.map((t) => t.class.split(' ')).flat()),
    ...themes.edges.map((t) => t.class),
  ],
}
