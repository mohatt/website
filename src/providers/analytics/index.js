import React, { useContext, useEffect, useRef, useMemo } from 'react'
import { environment, environmentConfig, isBrowser } from '../../commons/environment'
import { useCurrentLocation, useSiteMetadata } from '../../hooks'
import { Analytics, initializeAnalytics } from './analytics'

const AnalyticsContext = React.createContext()

export function AnalyticsProvider({ children }) {
  const { title } = useSiteMetadata()
  const analytics = useRef(new Analytics(
    environmentConfig.analyticsId,
    {
      app_name: title,
      app_version: environment,
      send_page_view: false,
    }
  )).current

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
