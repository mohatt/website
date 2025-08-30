import React, { createContext, useContext, useEffect, useMemo, useRef } from 'react'
import { $document } from '../../constants'
import { useSiteMetadata } from '../../hooks'
import { createAnalytics, initializeAnalytics } from './analytics'

const AnalyticsContext = createContext()

export function AnalyticsProvider({ children, location }) {
  const { href, pathname, search, hash } = location
  const { deployment } = useSiteMetadata()
  const instance = useRef(null)
  const prevHref = useRef('')

  if (!instance.current) {
    instance.current = createAnalytics(deployment.config.analytics, {
      send_page_view: false,
    })
    prevHref.current = $document && $document.referrer
  }

  if (href !== prevHref.current) {
    instance.current.config({
      page_path: pathname + search + hash,
      page_referrer: prevHref.current,
    })
    prevHref.current = href
  }

  useEffect(() => initializeAnalytics(instance.current), [])

  return <AnalyticsContext.Provider value={instance.current}>{children}</AnalyticsContext.Provider>
}

export function useAnalytics() {
  return useContext(AnalyticsContext)
}

export function useAnalyticsCallback(callback, deps) {
  const analytics = useAnalytics()
  return useMemo(
    () => callback(analytics),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    deps,
  )
}
