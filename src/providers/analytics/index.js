import React, { useContext, useEffect, useRef } from 'react'
import { environment, environmentConfig } from '../../commons/environment'
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

  useEffect(() => initializeAnalytics(analytics), [])

  useEffect(() => {
    analytics.config({
      page_path: location.pathname + location.search + location.hash,
      page_referrer: referrer.current || document.referrer
    })
    analytics.event('page_view')
    referrer.current = location.href
  }, [location.href])

  return (
    <AnalyticsContext.Provider value={analytics}>
      {children}
    </AnalyticsContext.Provider>
  )
}

export function useAnalytics() {
  return useContext(AnalyticsContext)
}

export function useAnalyticsEffect(effect, deps) {
  const analytics = useAnalytics()
  useEffect(() => effect(analytics), deps)
}
