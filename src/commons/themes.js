// Theme interface
function Theme(id, name, colors, dark) {
  this.id = id
  this.name = name
  this.colors = colors
  this.dark = dark

  this.getClassName = () => this.getClassNames().join(' ')
  this.getClassNames = () => ['theme-' + this.id].concat(this.dark ? ['dark'] : [])
}

// Availabe themes
const themes = [
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
  ),
]

module.exports = {
  THEME_STORAGE_KEY: 'mohatt:theme',
  THEME_DEFAULT: themes[0],
  THEME_LIST: themes
}
