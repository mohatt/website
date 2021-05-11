import { isBrowser, isProduction } from '../../commons/environment'

export class Analytics {
  id
  settings
  userProps = {}

  constructor(id, settings = {}) {
    this.id = id
    this.settings = settings
    gtagPush('js', new Date())
    gtagPush('config', this.id, this.settings)
  }

  config = config => {
    gtagPush('config', this.id, {
      ...config,
      update: true
    })
  }

  event = (name, params) => {
    gtagPush('event', name, {
      ...params,
      send_to: this.id
    })
  }

  user = (name, value) => {
    if (typeof name === 'string') {
      this.userProps[name] = value
    } else {
      this.userProps = {
        ...this.userProps,
        ...name
      }
    }
    gtagPush('config', this.id, {
      user_properties: this.userProps,
      update: true
    })
  }
}

function gtagPush () {
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
}

export function initializeAnalytics (analytics) {
  const script = document.createElement('script')
  script.src = `https://www.googletagmanager.com/gtag/js?id=${analytics.id}`
  script.async = true
  document.head.appendChild(script)
}
