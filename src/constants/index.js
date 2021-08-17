export const $window = !!(
  typeof window !== 'undefined' &&
  typeof window.document !== 'undefined' &&
  typeof window.document.createElement !== 'undefined'
) && window
export const $document = $window && $window.document

export { site } from './site'
export { themes, colors as themeColors, screens as themeScreens } from './tailwind'
export { icons } from './icons'
export { networkHandles } from './network-handles'
export { skillTags, skillTagGroups } from './skill-tags'
