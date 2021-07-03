import { useEffect, useMemo, useRef } from 'react'
import { environmentConfig, isBrowser } from '../../commons/environment'
import { useCurrentLocation } from '../../hooks'
import { Analytics, initializeAnalytics } from './analytics'

const analytics = new Analytics(environmentConfig.analyticsId, {
  send_page_view: false,
})

export function AnalyticsProvider({ children }) {
  const location = useCurrentLocation()
  const url = location.href
  const referrer = useRef(isBrowser && document.referrer)

  useAnalyticsCallback(({ config }) => {
    config({
      page_path: location.pathname + location.search + location.hash,
      page_referrer: referrer.current
    })
    referrer.current = url
  }, [url])

  useEffect(() => initializeAnalytics(analytics), [])

  return children
}

export function useAnalytics() {
  return analytics
}

export function useAnalyticsCallback(callback, deps) {
  return useMemo(
    () => isBrowser && callback(analytics),
    // eslint-disable-next-line
    deps
  )
}
