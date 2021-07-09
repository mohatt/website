function ColorTheme(id, colors, dark) {
  return {
    id,
    colors,
    dark,
    get className() {
      return this.classNames.join(' ')
    },
    get classNames() {
      return ['color-theme-' + id].concat(dark ? ['dark'] : [])
    }
  }
}

function EdgesTheme(id) {
  return { id, className: 'edges-theme-' + id }
}

function ThemeState({ color, edges } = {}) {
  color = color && themes.color.find(t => t.id === color) || themes.color[0]
  edges = edges && themes.edges.find(t => t.id === edges) || themes.edges[0]
  return {
    color,
    edges,
    state: {
      color: color.id,
      edges: edges.id,
    },
    className: color.className + ' ' + edges.className,
    cycle(type) {
      const list = themes[type]
      const next = list[(list.indexOf(this[type]) + 1) % list.length].id
      return Object.assign({}, this.state, { [type]: next })
    },
  }
}

// Availabe themes
const themes = {
  color: [
    new ColorTheme(
      'default',
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
    new ColorTheme(
      'breeze',
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
  ],
  edges: [
    new EdgesTheme('default'),
    new EdgesTheme('funny'),
    new EdgesTheme('medium'),
    new EdgesTheme('sharp'),
  ],
}

exports.storageKey = 'mohatt:theme'
exports.themes = themes
exports.defaultState = new ThemeState
exports.ThemeState = ThemeState
