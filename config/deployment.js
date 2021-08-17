// Current deploy targets
const config = {
  develop: {
    url: 'http://localhost:8000',
    analytics: 'XX-000000'
  },
  'staging-local': {
    url: 'http://localhost:9000',
    analytics: 'G-BGXXP9P64L',
  },
  staging: {
    url: 'https://mohatt-staging.web.app',
    analytics: 'G-BGXXP9P64L',
  },
  production: {
    url: 'https://mohatt.web.app',
    analytics: 'G-EC5KQR5PF7',
  },
}

function createDeployment() {
  let target = 'develop'
  if (process.env.NODE_ENV === 'production') {
    target = process.env.CI ? 'production' : 'staging-local'
    const envTarget = process.env.DEPLOY_TARGET
    if (envTarget) {
      if(!config[envTarget]) {
        throw new Error(`Invalid deploy target "${envTarget}"`)
      }
      target = envTarget
    }
  }

  console.info(`Current deploy target: ${target}`)

  return {
    target,
    config: config[target],
    date: new Date(),
    is: {
      local: ['develop', 'staging-local'].includes(target),
      staging: ['staging', 'staging-local'].includes(target),
      production: target === 'production',
    },
  }
}

module.exports = createDeployment()
