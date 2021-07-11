import { isBrowser, isProduction } from '../../commons/environment'

export function Analytics(id, settings = {}) {
  this.id = id
  let userProps = {}

  gtagPush('config', id, settings)

  this.config = config => {
    gtagPush('config', id, Object.assign({}, config, { update: true }))
  }

  this.event = (name, params) => {
    gtagPush('event', name, Object.assign({}, params, { send_to: id }))
  }

  this.user = (name, value) => {
    if (typeof name === 'string') {
      userProps[name] = value
    } else {
      userProps = Object.assign({}, userProps, name)
    }

    gtagPush('config', id, {
      user_properties: userProps,
      update: true,
    })
  }
}

export function initializeAnalytics(analytics) {
  const script = document.createElement('script')
  script.src = `https://www.googletagmanager.com/gtag/js?id=${analytics.id}`
  script.async = true
  document.head.appendChild(script)
}

function gtagPush() {
  if (!isBrowser) {
    return
  }

  if (!isProduction) {
    console.log('gtag', arguments)
  }

  window.dataLayer.push(arguments)
}

if (isBrowser) {
  window.dataLayer = window.dataLayer || []
  window.gtag = gtagPush
  gtagPush('js', new Date())
}
