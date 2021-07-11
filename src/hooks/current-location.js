import { withPrefix } from 'gatsby'
import { useLocation } from '@gatsbyjs/reach-router'

const pathPrefix = withPrefix('/')
function withoutPrefix(path) {
  if (pathPrefix === '/') {
    return path
  }

  return path.indexOf(pathPrefix) === 0
    ? path.replace(pathPrefix, '/')
    : path
}

export function useCurrentPath() {
  const location = useLocation()
  const path = location.pathname
  return [path, withoutPrefix(path)]
}

export { useLocation as useCurrentLocation }
