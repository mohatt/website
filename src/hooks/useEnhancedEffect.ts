import { useLayoutEffect, useEffect } from 'react'

/**
 * A version of `React.useLayoutEffect` that does not show a warning when server-side rendering.
 * This is useful for effects that are only needed for client-side rendering but not for SSR.
 *
 * @see https://gist.github.com/gaearon/e7d97cdf38a2907924ea12e4ebdf3c85
 */
export const useEnhancedEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect
