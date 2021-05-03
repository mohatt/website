import React, { useContext, useState, useEffect } from 'react'

const FirebaseContext = React.createContext()

export function FirebaseProvider({ children }) {
  const [services, setServices] = useState({
    analytics: {},
    performance: {},
  })

  useEffect(() => {
    /**
     * Firebase analytics and performance components don't support SSR so
     *  we have to dynamically import them. We are using 'eager' mode to
     *  avoid generating an additional bundle (+1 network request).
     *
     * @see https://webpack.js.org/api/module-methods/#magic-comments
     */
    import('../commons/firebase' /* webpackMode: "eager" */)
      .then(exports => {
        setServices(exports.default)
      })
  }, [])

  return (
    <FirebaseContext.Provider value={services}>
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
    if (analytics.log) {
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
