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
      },
      true,
    ],
    [
      'eclipse',
      {
        primary: '#f98376',
        secondary: '#fff',
        accent: '#f7f6f3',
        typo: '#3d3d3d',
        'typo-dim': '#928763',
      },
      false,
    ],
    [
      'moonlight',
      {
        primary: '#75a1fa',
        secondary: '#fff',
        accent: '#f3f5f7',
        typo: '#3d3d3d',
        'typo-dim': '#73819d',
      },
      false,
    ],
    [
      'trajan',
      {
        primary: '#667a8d',
        secondary: '#f8f1e9',
        accent: '#e8e4e0',
        typo: '#342d26',
        'typo-dim': '#969089',
      },
      false,
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
  print: { 'raw': 'print' },
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
    id, colors, dark, class: 'ct-' + id + (dark ? ' dark' : '')
  }))
}

function createEdgesThemes(themes) {
  return themes.map(id => ({ id, class: 'et-' + id }))
}
