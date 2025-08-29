const { projects } = require('../.firebaserc')

// Current deploy targets
const config = {
  develop: {
    url: 'http://localhost:8000',
    analytics: 'XX-000000',
  },
  'staging-local': {
    url: 'http://localhost:9000',
    analytics: 'G-BGXXP9P64L',
  },
  staging: {
    url: `https://${projects.staging}.web.app`,
    analytics: 'G-BGXXP9P64L',
  },
  production: {
    url: `https://${projects.production}.web.app`,
    analytics: 'G-EC5KQR5PF7',
  },
}

function createDeployment() {
  let target = 'develop'
  if (process.env.NODE_ENV === 'production') {
    target = process.env.CI ? 'production' : 'staging-local'
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

  console.info(`Current deploy target: ${target}`)

  return {
    target,
    config: { ...config[target], url, channel },
    date: new Date(),
    is: {
      local: ['develop', 'staging-local'].includes(target),
      staging: ['staging', 'staging-local'].includes(target),
      production: target === 'production',
      live: channel === 'live',
    },
  }
}

module.exports = createDeployment()
