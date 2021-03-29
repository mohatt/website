import { getActivatedRoute, getMatchingRoute } from 'gatsby-plugin-advanced-pages'

export default function useCurrentRoute() {
  return getActivatedRoute() || getMatchingRoute('/404')
}
