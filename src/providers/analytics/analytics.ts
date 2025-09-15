import { $window, $document } from '@/constants'

declare global {
  interface Window {
    dataLayer: any[]
    gtag: Gtag.Gtag
  }
}

const gtag: Gtag.Gtag = function () {
  if (!$window) {
    return
  }

  if (process.env.NODE_ENV !== `production`) {
    console.log('gtag', arguments)
  }

  $window.dataLayer.push(arguments)
}

function initDataLayer() {
  if (!$window) {
    return
  }
  $window.dataLayer = $window.dataLayer || []
  $window.gtag = gtag
  gtag('js', new Date())
}

export interface Analytics {
  id: string
  config: (config: Gtag.GtagCommands['config'][1]) => void
  event: (...args: Gtag.GtagCommands['event']) => void
  user: ((property: string, value: string) => void) &
    ((properties: Record<string, string | number>) => void)
}

export function createAnalytics(id: string, settings?: Gtag.GtagCommands['config'][1]): Analytics {
  initDataLayer()
  gtag('config', id, settings ?? {})
  let userProps = {}

  return {
    id,
    config(config) {
      gtag('config', id, { ...config, update: true })
    },
    event(name, params) {
      gtag('event', name, { ...params, send_to: id })
    },
    user(prop: string | Record<string, string | number>, value?: string) {
      if (typeof prop === 'string') {
        userProps[prop] = value
      } else {
        userProps = { ...userProps, ...prop }
      }

      gtag('config', id, {
        user_properties: userProps,
        update: true,
      })
    },
  }
}

export function installAnalytics(analytics: Analytics) {
  const script = $document.createElement('script')
  script.id = 'ga-gtag'
  script.src = `https://www.googletagmanager.com/gtag/js?id=${analytics.id}`
  script.async = true
  $document.head.appendChild(script)
}
