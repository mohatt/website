// Color themes
const THEME_DEFAULT = 'default'
const THEME_STORAGE_KEY = 'mohatt:theme'
const THEME_LIST = {
  default: {
    name: 'Default',
    colors: {
      primary: '#b28e59',
      secondary: '#234e52',
      accent: '#222',
      typo: '#f7f3e3',
      'typo-dim': '#9a937c',
      'typo-dimmer': '#7c8171',
    },
    dark: true
  },
  breeze: {
    name: 'Breeze',
    colors: {
      primary: '#b25959',
      secondary: '#233e52',
      accent: '#222',
      typo: '#f7f3e3',
      'typo-dim': '#7c8d9a',
      'typo-dimmer': '#717c81',
    },
    dark: true
  }
}

module.exports = {
  THEME_LIST,
  THEME_DEFAULT,
  THEME_STORAGE_KEY,
  default: THEME_LIST[THEME_DEFAULT]
}
