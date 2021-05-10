import { isProduction, environmentConfig } from '../../commons/environment'
import { initializeApp, setLogLevel } from 'firebase/app'
import { getAnalytics, logEvent } from 'firebase/analytics'
import { initializePerformance, trace } from 'firebase/performance'

if (!isProduction) {
  setLogLevel('debug')
}

// Initialize app
const app = initializeApp(environmentConfig.firebase)

// Setup gtag dataLayer and add custom config
const $ = window
$.dataLayer = $.dataLayer || []
$.gtag = function () {
  $.dataLayer.push(arguments)
}

function configureGtag(config) {
  return $.gtag('config', environmentConfig.firebase.measurementId, config)
}

$.gtag('js', new Date())
configureGtag({ send_page_view: false })

// Initialize analytics and performance components
const analytics = getAnalytics(app)
const performance = initializePerformance(app)

let analyticsUserProps = {}
export default {
  analytics: {
    event () {
      return logEvent(analytics, ...arguments)
    },
    config (options) {
      return configureGtag({
        ...options,
        update: true
      })
    },
    user (name, value) {
      if (typeof name === 'string') {
        analyticsUserProps[name] = value
      } else {
        analyticsUserProps = {
          ...analyticsUserProps,
          ...name
        }
      }
      return configureGtag({
        user_properties: analyticsUserProps,
        update: true
      })
    }
  },
  performance: {
    trace () {
      return trace(performance, ...arguments)
    }
  }
}
