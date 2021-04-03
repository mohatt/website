// Theme interface
const Theme = function(id, name, dark) {
  this.id = id
  this.name = name
  this.dark = dark

  this.getClassName = () => this.getClassNames().join(' ')
  this.getClassNames = () => ['theme-' + this.id]
    .concat(this.dark ? ['dark'] : [])
}

// Key saved in localStorage
exports.THEME_STORAGE_KEY = 'mohatt:theme'
// Availabe themes
exports.THEME_LIST = [
  new Theme('default', 'Default', true),
  new Theme('breeze', 'Breeze', true),
]
