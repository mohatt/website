const projects = {
  staging: {
    projectId: "mohatt-staging",
    apiKey: "AIzaSyDt0r8Z9pEvLYJBSa4YtsoApnFKCZrOvCs",
    appId: "1:809896687731:web:542557b9d73453ec1bd206",
    measurementId: "G-WYGTR7R4NX"
  },
  production: {
    projectId: "mohatt",
    apiKey: "AIzaSyCCUU0dXV_m5CIP2WgO8iOlBhQKVK0gkk4",
    appId: "1:485833880063:web:e8efb2c30563aecdb377ca",
    measurementId: "G-EC5KQR5PF7"
  }
}

const config = {
  development: {
    url: 'http://localhost:8000',
    firebase: null
  },
  'staging-local': {
    url: 'http://localhost:9000',
    firebase: projects.staging
  },
  staging: {
    url: 'https://mohatt-staging.web.app',
    firebase: projects.staging
  },
  production: {
    url: 'https://mohatt.web.app',
    firebase: projects.production
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
