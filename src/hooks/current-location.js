import { useLocation } from '@gatsbyjs/reach-router'
import { withoutPrefix } from '../commons/utils'

export function useCurrentPath() {
  const location = useLocation()
  return {
    path: withoutPrefix(location.pathname),
    realpath: location.pathname
  }
}

export { useLocation as useCurrentLocation }
