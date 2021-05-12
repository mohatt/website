const config = {
  development: {
    url: 'http://localhost:8000',
    analyticsId: 'XX-000000'
  },
  'staging-local': {
    url: 'http://localhost:9000',
    analyticsId: 'G-BGXXP9P64L',
  },
  staging: {
    url: 'https://mohatt-staging.web.app',
    analyticsId: 'G-BGXXP9P64L',
  },
  production: {
    url: 'https://mohatt.web.app',
    analyticsId: 'G-EC5KQR5PF7',
  },
}

function Environment() {
  this.is = 'development'
  if (process.env.NODE_ENV === 'production') {
    this.is = process.env.CI ? 'production' : 'staging-local';
    const BUILD_ENV = process.env.BUILD_ENV
    if (BUILD_ENV) {
      if(config[BUILD_ENV] === undefined) {
        throw new Error(`Unsupported build environment "${BUILD_ENV}"`)
      }
      this.is = BUILD_ENV
    }
  }

  console.info(`Current build environment: ${this.is}`)

  this.config = config[this.is]

  this.isDevelopment = () => this.is === 'development'
  this.isStaging = () => this.is === 'staging' || this.is === 'staging-local'
  this.isProduction = () => this.is === 'production'
  this.isProductionLike = () => this.isStaging() || this.isProduction()
}

const env = new Environment()

module.exports = env
