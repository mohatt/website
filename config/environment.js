const firebaseConfig = {
  dev: {
    apiKey: "AIzaSyCCUU0dXV_m5CIP2WgO8iOlBhQKVK0gkk4",
    projectId: "mohatt",
    appId: "1:485833880063:web:3106eba17514f9d5b377ca",
    measurementId: "G-K3VND9PPEE"
  },
  prod: {
    apiKey: "AIzaSyCCUU0dXV_m5CIP2WgO8iOlBhQKVK0gkk4",
    projectId: "mohatt",
    appId: "1:485833880063:web:3106eba17514f9d5b377ca",
    measurementId: "G-K3VND9PPEE"
  }
}

const config = {
  development: {
    url: 'http://0.0.0.0:8000',
    firebase: null
  },
  'staging-local': {
    url: 'http://0.0.0.0:5000',
    firebase: firebaseConfig.dev
  },
  staging: {
    url: 'https://mohatt--staging-kz69njsk.web.app',
    analytics: firebaseConfig.dev
  },
  production: {
    url: 'https://mohatt.web.app',
    analytics: firebaseConfig.prod
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
