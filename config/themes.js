// Theme interface
class Theme {
  constructor(id, name, colors, dark) {
    this.id = id;
    this.name = name;
    this.colors = colors;
    this.dark = dark;
  }

  getClassNames() {
    const classes = ['theme-' + this.id]
    this.dark && classes.push('dark')
    return classes
  }

  getClassName() {
    return this.getClassNames().join(' ')
  }
}

// Default themes
const THEME_DEFAULT = 'default'
// Key saved in localStorage
const THEME_STORAGE_KEY = 'mohatt:theme'
// Availabe themes
const THEME_LIST = [
  new Theme(
    'default',
    'Default',
    {
      primary: '#b28e59',
      secondary: '#234e52',
      accent: '#222',
      typo: '#f7f3e3',
      'typo-dim': '#9a937c',
      'typo-dimmer': '#7c8171',
    },
    true
  ),
  new Theme(
    'breeze',
    'Breeze',
    {
      primary: '#b25959',
      secondary: '#233e52',
      accent: '#222',
      typo: '#f7f3e3',
      'typo-dim': '#7c8d9a',
      'typo-dimmer': '#717c81',
    },
    true
  )
]

module.exports = {
  THEME_LIST,
  THEME_DEFAULT,
  THEME_STORAGE_KEY,
  default: THEME_LIST.find(t => t.id === THEME_DEFAULT)
}
