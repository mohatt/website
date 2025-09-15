export const $window =
  !!(
    typeof window !== 'undefined' &&
    typeof window.document !== 'undefined' &&
    typeof window.document.createElement !== 'undefined'
  ) && window
export const $document = $window && $window.document

export * from './site'
export * from './menu'
export * from './tailwind'
export * from './icons'
export * from './network-handles'
export * from './skill-tags'
export * from './resume'
