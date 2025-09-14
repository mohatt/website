import { createContext, useContext, useRef, useMemo, ReactNode } from 'react'
import { withPrefix } from 'gatsby'
import { useLocation } from '@reach/router'

export type PathState = readonly [withoutPrefix: string, path: string]

const slash = '/'
const pathPrefix = withPrefix(slash)

const PathContext = createContext<PathState>(undefined)

export interface PathProviderProps {
  children: ReactNode
}

export function PathProvider({ children }: PathProviderProps) {
  const { pathname } = useLocation()
  const previous = useRef<PathState>(null)

  const state = useMemo<PathState>(() => {
    const fullPath =
      pathname.endsWith(slash) && pathname !== pathPrefix ? pathname.slice(0, -1) : pathname

    if (previous.current?.[1] === fullPath) return previous.current

    const pathWithoutPrefix =
      pathPrefix !== slash && fullPath.startsWith(pathPrefix)
        ? fullPath.slice(pathPrefix.length)
        : fullPath

    previous.current = [pathWithoutPrefix || slash, fullPath] as const
    return previous.current
  }, [pathname])

  return <PathContext.Provider value={state}>{children}</PathContext.Provider>
}

export function usePath() {
  const ctx = useContext(PathContext)
  if (!ctx) {
    throw new Error('usePath must be used inside PathProvider')
  }
  return ctx
}
