const { NODE_ENV, BUILD_ENV, CI } = process.env

const CONFIG = {
  development: {
    url: 'http://0.0.0.0:8000',
    analytics: ''
  },
  'staging-local': {
    url: 'http://0.0.0.0:5000',
    analytics: 'G-WYVRHE98ND'
  },
  staging: {
    url: 'https://mohatt--staging-kz69njsk.web.app',
    analytics: 'G-WYVRHE98ND'
  },
  production: {
    url: 'https://mohatt.web.app',
    analytics: ''
  },
}

function Environment() {
  this.is = 'development'
  if (NODE_ENV === 'production') {
    this.is = CI ? 'production' : 'staging-local';
    if (BUILD_ENV) {
      if(CONFIG[BUILD_ENV] === undefined) {
        throw new Error(`Unsupported build environment "${BUILD_ENV}"`)
      }
      this.is = BUILD_ENV
    }
  }

  this.config = CONFIG[this.is]

  this.isDevelopment = () => this.is === 'development'
  this.isStaging = () => this.is === 'staging' || this.is === 'staging-local'
  this.isProduction = () => this.is === 'production'
  this.isProductionLike = () => this.isStaging() || this.isProduction()
}

module.exports = new Environment()
