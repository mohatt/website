import { initializeApp, setLogLevel } from 'firebase/app'
import { getAnalytics, logEvent } from 'firebase/analytics'
import { initializePerformance, trace } from 'firebase/performance'

const ENV = __ENVIRONMENT__
const FIREBASE_CONFIG = __ENVIRONMENT_CONFIG__.firebase

const app = initializeApp(FIREBASE_CONFIG)
if (ENV !== 'production') {
  setLogLevel('log')
}

// Setup custom gtag config
(function (window) {
  function gtag() {
    window.dataLayer.push(arguments);
  }

  window.dataLayer = window.dataLayer || []
  window.gtag = gtag

  gtag('js', new Date())
  gtag('config', FIREBASE_CONFIG.measurementId, {
    send_page_view: false
  })
})(window)

const analytics = getAnalytics(app)
const performance = initializePerformance(app)

export default {
  app,
  analytics: {
    log: (...args) => logEvent(analytics, ...args)
  },
  performance: {
    trace: (...args) => trace(performance, ...args)
  }
}
