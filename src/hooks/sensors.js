import { useEffect, useState } from 'react'

/**
 * Used to perform a two-pass rendering as a workaround for React hydration issue
 *
 * @see https://github.com/gatsbyjs/gatsby/issues/14601#issuecomment-499922794
 * @see https://reactjs.org/docs/react-dom.html#hydrate
 * @see https://blog.logrocket.com/fixing-gatsbys-rehydration-issue/
 * @see https://www.joshwcomeau.com/react/the-perils-of-rehydration/
 *
 * @return boolean
 */
export function useMounted() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  return mounted
}
