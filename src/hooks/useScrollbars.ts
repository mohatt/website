import { useEffect, useRef } from 'react'
import { useOverlayScrollbars, UseOverlayScrollbarsParams } from 'overlayscrollbars-react'
import 'overlayscrollbars/overlayscrollbars.css'

export interface UseScrollbarsProps extends UseOverlayScrollbarsParams {}

/**
 * Handles OverlayScrollbars initialization.
 */
export function useScrollbars<T extends HTMLElement>(props?: UseOverlayScrollbarsParams) {
  const ref = useRef<T>()
  const [initialize, instance] = useOverlayScrollbars(props)

  useEffect(() => {
    initialize(ref.current)
  }, [initialize])

  return [ref, instance] as const
}
