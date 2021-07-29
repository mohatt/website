import React, { createContext, useContext, useEffect, useMemo, useRef } from 'react'
import { $document } from '../../constants'
import { useSiteMetadata } from '../../hooks'
import { createAnalytics, initializeAnalytics } from './analytics'

const AnalyticsContext = createContext()

export function AnalyticsProvider({ children, location }) {
  const { href, pathname, search, hash } = location
  const { deployment } = useSiteMetadata()
  const { current } = useRef({})

  if (!current.instance) {
    current.instance = createAnalytics(deployment.config.analytics, {
      send_page_view: false,
    })
    current.ref = $document && $document.referrer
  }

  if (href !== current.ref) {
    current.instance.config({
      page_path: pathname + search + hash,
      page_referrer: current.ref,
    })
    current.ref = href
  }

  useEffect(() => initializeAnalytics(current.instance), [])

  return (
    <AnalyticsContext.Provider value={current.instance}>
      {children}
    </AnalyticsContext.Provider>
  )
}

export function useAnalytics() {
  return useContext(AnalyticsContext)
}

export function useAnalyticsCallback(callback, deps) {
  const analytics = useAnalytics()
  return useMemo(() => callback(analytics), deps)
}
