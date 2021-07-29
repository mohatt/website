import { $window, $document } from '../../constants'

if ($window) {
  $window.dataLayer = $window.dataLayer || []
  $window.gtag = gtag
  gtag('js', new Date())
}

function gtag() {
  if (!$window) {
    return
  }

  if (process.env.NODE_ENV !== `production`) {
    console.log('gtag', arguments)
  }

  $window.dataLayer.push(arguments)
}

export function createAnalytics(id, settings = {}) {
  gtag('config', id, settings)
  let userProps = {}

  return {
    id,
    config(config) {
      gtag('config', id, Object.assign({}, config, { update: true }))
    },
    event(name, params) {
      gtag('event', name, Object.assign({}, params, { send_to: id }))
    },
    user(name, value) {
      if (typeof name === 'string') {
        userProps[name] = value
      } else {
        userProps = Object.assign({}, userProps, name)
      }

      gtag('config', id, {
        user_properties: userProps,
        update: true,
      })
    },
  }
}

export function initializeAnalytics(analytics) {
  const script = $document.createElement('script')
  script.src = `https://www.googletagmanager.com/gtag/js?id=${analytics.id}`
  script.async = true
  $document.head.appendChild(script)
}
