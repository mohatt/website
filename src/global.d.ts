/**
 * Environment variables accepted during build and exposed at runtime.
 */
declare namespace NodeJS {
  interface ProcessEnv {
    // -------------------------------
    // Input environment variables (can be set by you/CI before build)
    // -------------------------------

    /**
     * Standard Node.js environment.
     * Usually "development" (gatsby develop) or "production" (gatsby build).
     */
    NODE_ENV: 'development' | 'production' | 'test'

    /**
     * Optional CI flag.
     * Many CI/CD providers set this automatically.
     */
    CI?: 'true'

    /**
     * Deployment target.
     * If provided, must match one of the keys in the deployment config.
     */
    DEPLOY_TARGET?: 'develop' | 'local' | 'staging' | 'production'

    /**
     * Override the deploy URL.
     * Defaults to the config target URL.
     */
    DEPLOY_URL?: string

    /**
     * The deploy channel (e.g. "live", "preview").
     */
    DEPLOY_CHANNEL?: string

    /**
     * The commit SHA for the deploy.
     */
    DEPLOY_SHA?: string

    // -------------------------------
    // Output environment variables (written by `createDeployment()` into `process.env` during build)
    // -------------------------------

    /**
     * Site title from gatsby-config `siteMetadata.title`.
     */
    GATSBY_SITE_TITLE: string

    /**
     * Site description from gatsby-config `siteMetadata.description`.
     */
    GATSBY_SITE_DESCRIPTION: string

    /**
     * Current Node environment string, forwarded to client.
     */
    GATSBY_DEPLOY_ENV: ProcessEnv['NODE_ENV']

    /**
     * Effective deploy target (resolved from `process.env.DEPLOY_TARGET`).
     */
    GATSBY_DEPLOY_TARGET: ProcessEnv['DEPLOY_TARGET']

    /**
     * Full URL for the deployed site.
     */
    GATSBY_DEPLOY_URL: string

    /**
     * Deploy channel (default: `live`).
     */
    GATSBY_DEPLOY_CHANNEL: 'live' | string

    /**
     * Commit SHA for the deploy (default: `local`).
     */
    GATSBY_DEPLOY_SHA: 'local' | string

    /**
     * ISO-8601 timestamp for the current deploy.
     */
    GATSBY_DEPLOY_DATE: string

    /**
     * Google Analytics 4 measurement ID for the current deploy.
     */
    GATSBY_GA4_ID: string

    /**
     * Firebase configuration object for the current deploy.
     * Stored as JSON string and should be parsed before use.
     */
    GATSBY_FIREBASE_CONFIG: string
  }
}

declare module '*.module.css' {
  const classes: { readonly [key: string]: string }
  export = classes
  export default classes
}
declare module '*.jpg' {
  const src: string
  export default src
}
declare module '*.jpeg' {
  const src: string
  export default src
}
declare module '*.png' {
  const src: string
  export default src
}
declare module '*.gif' {
  const src: string
  export default src
}
declare module '*.webp' {
  const src: string
  export default src
}
declare module '*.svg' {
  const src: string
  export default src
}
