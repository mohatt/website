import { getActivatedRoute, getMatchingRoute } from 'gatsby-plugin-advanced-pages'

export default () => {
  return getActivatedRoute() || getMatchingRoute('/404')
}
