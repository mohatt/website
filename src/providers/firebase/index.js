import React, { useContext, useState, useEffect, useRef } from 'react'
import { environment, isDevelopment } from '../../commons/environment'
import { useCurrentLocation, useSiteMetadata } from '../../hooks'

const FirebaseContext = React.createContext()

export function FirebaseProvider({ children }) {
  const [components, setComponents] = useState({
    analytics: {},
    performance: {},
  })

  const { title } = useSiteMetadata()
  const location = useCurrentLocation()
  const referrer = useRef()
  const { config } = components.analytics

  useEffect(() => {
    if(isDevelopment) {
      return
    }

    /**
     * Firebase analytics and performance components don't support SSR so
     *  we have to dynamically import them.
     *
     * @see https://webpack.js.org/api/module-methods/#magic-comments
     */
    import('./firebase' /* webpackMode: "eager" */)
      .then(({ default: exports }) => {
        exports.analytics.config({
          app_name: title,
          app_version: environment
        })
        setComponents(exports)
      })
  }, [])

  useEffect(() => {
    if (config) {
      config({
        page_path: location.pathname + location.search + location.hash,
        page_referrer: referrer.current || document.referrer
      })
      referrer.current = location.href
    }
  }, [config, location.href])

  return (
    <FirebaseContext.Provider value={components}>
      {children}
    </FirebaseContext.Provider>
  )
}

export function useAnalytics() {
  const { analytics } = useContext(FirebaseContext)
  return analytics
}

export function useAnalyticsEffect(effect, deps) {
  const analytics = useAnalytics()
  useEffect(() => {
    if (analytics.event) {
      effect(analytics)
    }
  },[analytics, ...deps])
}

export function usePerformance() {
  const { performance } = useContext(FirebaseContext)
  return performance
}

export function usePerformanceEffect(effect, deps) {
  const performance = usePerformance()
  useEffect(() => {
    if (performance.trace) {
      effect(performance)
    }
  },[performance, ...deps])
}
