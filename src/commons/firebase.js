import { initializeApp, setLogLevel } from 'firebase/app'
import { getAnalytics, logEvent } from 'firebase/analytics'
import { initializePerformance, trace } from 'firebase/performance'

const IS_PROD = __ENVIRONMENT__ === 'production'
const CONFIG_FIREBASE = __ENVIRONMENT_CONFIG__.firebase
const CONFIG_TRACKING_ID = CONFIG_FIREBASE.measurementId

// Initialize app
const $ = window
const app = initializeApp(CONFIG_FIREBASE)
if (!IS_PROD) {
  setLogLevel('debug')
}

// Setup gtag dataLayer and add custom config
$.dataLayer = $.dataLayer || []
$.gtag = function () {
  $.dataLayer.push(arguments)
}

function configureGtag(config) {
  return $.gtag('config', CONFIG_TRACKING_ID, config)
}

$.gtag('js', new Date())
configureGtag({ send_page_view: false })

// Initialize analytics and performance components
const analytics = getAnalytics(app)
const performance = initializePerformance(app)

let analyticsUserProps = {}
export default {
  app,
  analytics: {
    event: function() {
      return logEvent(analytics, ...arguments)
    },
    config: function(options) {
      return configureGtag({
        ...options,
        update: true
      })
    },
    user: function (name, value) {
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
    trace: function() {
      return trace(performance, ...arguments)
    }
  }
}
