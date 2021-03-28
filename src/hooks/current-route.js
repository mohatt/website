import { useMemo } from 'react'
import { getActivatedRoute, getMatchingRoute } from 'gatsby-plugin-advanced-pages'
import { useLocation } from '@reach/router'

export default () => {
  const path = useLocation().pathname
  return useMemo(() => getActivatedRoute() || getMatchingRoute('/404'), [path])
}
