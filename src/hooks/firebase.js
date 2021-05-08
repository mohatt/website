import React, { useContext, useState, useEffect } from 'react'
import { useSiteMetadata } from '.'

const FirebaseContext = React.createContext()

export function FirebaseProvider({ children }) {
  const { title } = useSiteMetadata()
  const env = __ENVIRONMENT__
  const [components, setComponents] = useState({
    analytics: {},
    performance: {},
  })

  useEffect(() => {
    if(env === 'development') {
      return
    }

    /**
     * Firebase analytics and performance components don't support SSR so
     *  we have to dynamically import them. We are using 'eager' mode to
     *  avoid generating an additional bundle (+1 network request).
     *
     * @see https://webpack.js.org/api/module-methods/#magic-comments
     */
    import('../commons/firebase' /* webpackMode: "eager" */)
      .then(({ default: exports }) => {
        exports.analytics.config({
          app_name: title,
          app_version: env
        })
        setComponents(exports)
      })
  }, [])

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

export function useAnalyticsEffect(callback, deps) {
  const analytics = useAnalytics()
  return useEffect(() => {
    if (analytics.event) {
      callback(analytics)
    }
  },[analytics, ...deps])
}

export function usePerformance() {
  const { performance } = useContext(FirebaseContext)
  return performance
}

export function usePerformanceEffect(callback, deps) {
  const performance = usePerformance()
  return useEffect(() => {
    if (performance.trace) {
      callback(performance)
    }
  },[performance, ...deps])
}
