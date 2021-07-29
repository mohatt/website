exports.themes = {
  color: createColorThemes([
    [
      'default',
      {
        primary: '#b28e59',
        secondary: '#234e52',
        accent: '#222',
        typo: '#f7f3e3',
        'typo-dim': '#9a937c',
        'typo-dimmer': '#7c8171',
      },
      true,
    ],
    [
      'breeze',
      {
        primary: '#b25959',
        secondary: '#233e52',
        accent: '#222',
        typo: '#f7f3e3',
        'typo-dim': '#7c8d9a',
        'typo-dimmer': '#717c81',
      },
      true,
    ],
  ]),
  edges: createEdgesThemes(['default', 'xl', 'md', 'sm']),
}

exports.colors = {
  transparent: 'transparent',
  current: 'currentColor',
  primary: 'var(--primary)',
  secondary: 'var(--secondary)',
  accent: 'var(--accent)',
  typo: 'var(--typo)',
  'typo-dim': 'var(--typo-dim)',
  'typo-dimmer': 'var(--typo-dimmer)',
}

exports.screens = {
  xs: '410px',
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
  '3xl': '1680px',
  '4xl': '1920px',
}

function createColorThemes(themes) {
  return themes.map(([id, colors, dark]) => ({
    id, colors, dark, class: 'color-theme-' + id + (dark ? ' dark' : '')
  }))
}

function createEdgesThemes(themes) {
  return themes.map(id => ({ id, class: 'edges-theme-' + id }))
}
