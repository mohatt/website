export const isBrowser = !!(
  typeof window !== 'undefined' &&
  typeof window.document !== 'undefined' &&
  typeof window.document.createElement !== 'undefined'
)

export const environment = __ENVIRONMENT__
export const environmentConfig = __ENVIRONMENT_CONFIG__

export const isProduction = environment === 'production'
export const isDevelopment = environment === 'development'
