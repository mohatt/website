import React, { createContext, useContext, useRef } from 'react'
import { withPrefix } from 'gatsby'

const slash = '/'
const pathPrefix = withPrefix(slash)
const PathContext = createContext()

export function PathProvider({ children, location: { pathname } }) {
  const ref = useRef([])

  const path = pathname.endsWith(slash) && pathname !== pathPrefix
    ? pathname.slice(0, -1)
    : pathname

  if (ref.current[1] !== path) {
    const withoutPrefix = pathPrefix !== slash && path.startsWith(pathPrefix)
      ? path.replace(pathPrefix, slash)
      : path
    ref.current = [withoutPrefix, path]
  }

  return (
    <PathContext.Provider value={ref.current}>
      {children}
    </PathContext.Provider>
  )
}

export function usePath() {
  return useContext(PathContext)
}
