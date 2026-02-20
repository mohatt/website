/**
 * Deploy targets and configurations
 */
const config = {
  develop: {
    url: 'http://localhost:8000',
    ga4: 'XX-000000',
    get firebase() {
      return config.staging.firebase
    },
  },
  local: {
    url: 'http://localhost:9000',
    get ga4() {
      return config.staging.ga4
    },
    get firebase() {
      return config.staging.firebase
    },
  },
  staging: {
    url: `https://mohatt-staging.web.app`,
    ga4: 'G-BGXXP9P64L',
    firebase: {
      apiKey: 'AIzaSyDt0r8Z9pEvLYJBSa4YtsoApnFKCZrOvCs',
      authDomain: 'mohatt-staging.firebaseapp.com',
      projectId: 'mohatt-staging',
      storageBucket: 'mohatt-staging.appspot.com',
      messagingSenderId: '809896687731',
      appId: '1:809896687731:web:542557b9d73453ec1bd206',
    },
  },
  production: {
    url: `https://mohatt.dev`,
    ga4: 'G-EC5KQR5PF7',
    firebase: {
      apiKey: 'AIzaSyCCUU0dXV_m5CIP2WgO8iOlBhQKVK0gkk4',
      authDomain: 'mohatt.firebaseapp.com',
      projectId: 'mohatt',
      storageBucket: 'mohatt.appspot.com',
      messagingSenderId: '485833880063',
      appId: '1:485833880063:web:e8efb2c30563aecdb377ca',
    },
  },
}

function createDeployment() {
  let target = 'develop' as typeof process.env.DEPLOY_TARGET
  const env = process.env.NODE_ENV
  if (env === 'production') {
    target = process.env.CI ? 'staging' : 'local'
    const envTarget = process.env.DEPLOY_TARGET
    if (envTarget) {
      if (!config[envTarget]) {
        throw new Error(`Invalid deploy target "${envTarget}"`)
      }
      target = envTarget
    }
  }
  const url = process.env.DEPLOY_URL || config[target].url
  const channel = process.env.DEPLOY_CHANNEL || 'live'
  const sha = process.env.DEPLOY_SHA || 'local'
  const date = new Date()
  const { ga4, firebase } = config[target]

  console.info(`Current deploy target: ${target}/${env}`)

  // Write environment variables to process.env so they can be accessed in the client
  process.env.GATSBY_DEPLOY_ENV = env
  process.env.GATSBY_DEPLOY_TARGET = target
  process.env.GATSBY_DEPLOY_URL = url
  process.env.GATSBY_DEPLOY_CHANNEL = channel
  process.env.GATSBY_DEPLOY_SHA = sha
  process.env.GATSBY_DEPLOY_DATE = date.toISOString()
  process.env.GATSBY_GA4_ID = ga4
  process.env.GATSBY_FIREBASE_CONFIG = JSON.stringify(firebase)

  return {
    env,
    target,
    channel,
    date,
    sha,
    config: { url, ga4, firebase },
  }
}

const deployment = createDeployment()

export default deployment
