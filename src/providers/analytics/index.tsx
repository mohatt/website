import { createContext, useContext, useEffect, useMemo, useRef, ReactNode } from 'react'
import type { WindowLocation } from '@reach/router'
import { site, $document } from '../../constants'
import { Analytics, createAnalytics, installAnalytics } from './analytics'

const AnalyticsContext = createContext<Analytics>(undefined)

interface AnalyticsProviderProps {
  location: WindowLocation
  children: ReactNode
}

export function AnalyticsProvider({ children, location }: AnalyticsProviderProps) {
  const { href, pathname, search, hash } = location
  const instance = useRef<Analytics>(null)
  const prevHref = useRef<string>('')

  if (!instance.current) {
    instance.current = createAnalytics(site.deployment.ga4, {
      send_page_view: false,
    })
    prevHref.current = $document?.referrer
  }

  if (href !== prevHref.current) {
    instance.current.config({
      page_path: pathname + search + hash,
      page_referrer: prevHref.current,
    })
    prevHref.current = href
  }

  useEffect(() => {
    installAnalytics(instance.current)
  }, [])

  return <AnalyticsContext.Provider value={instance.current}>{children}</AnalyticsContext.Provider>
}

export function useAnalytics() {
  return useContext(AnalyticsContext)
}

export function useAnalyticsEffect(callback: (analytics: Analytics) => void, deps) {
  const analytics = useAnalytics()

  /**
   * @todo: consider refactoring to useEffect or useLayoutEffect
   * const useIsomorphicEffect = $window ? useLayoutEffect : useEffect
   */
  return useMemo(
    () => {
      callback(analytics)
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    deps,
  )
}
