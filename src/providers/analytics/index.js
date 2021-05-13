import React, { useContext, useEffect, useRef, useMemo } from 'react'
import { environmentConfig, isBrowser } from '../../commons/environment'
import { useCurrentLocation } from '../../hooks'
import { Analytics, initializeAnalytics } from './analytics'

const AnalyticsContext = React.createContext()
const analytics = new Analytics(environmentConfig.analyticsId, {
  send_page_view: false
})

export function AnalyticsProvider({ children }) {
  const location = useCurrentLocation()
  const referrer = useRef()

  useMemo(() => {
    if (!isBrowser) {
      return
    }
    analytics.config({
      page_path: location.pathname + location.search + location.hash,
      page_referrer: referrer.current || document.referrer
    })
    referrer.current = location.href
  }, [location.href])

  useEffect(() => initializeAnalytics(analytics), [])

  return (
    <AnalyticsContext.Provider value={analytics}>
      {children}
    </AnalyticsContext.Provider>
  )
}

export function useAnalytics() {
  return useContext(AnalyticsContext)
}

export function useAnalyticsCallback(callback, deps) {
  const analytics = useAnalytics()
  return useMemo(() => isBrowser && callback(analytics), deps)
}
