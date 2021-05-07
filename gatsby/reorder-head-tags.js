/**
 * This should be baked into gatsby-plugin-react-helmet
 *
 * @see https://github.com/gatsbyjs/gatsby/issues/22206#issuecomment-710591572
 */
module.exports = ({ getHeadComponents, replaceHeadComponents }) => {
  const headComponents = getHeadComponents()
  const order = ["title", "base", "meta", "link", "noscript", "script", "style"]

  const sortedHeadComponents = headComponents
    .slice(0)
    .flat()
    .sort((x, y) => {
      return order.indexOf(x.type) - order.indexOf(y.type)
    })

  replaceHeadComponents(sortedHeadComponents)
}
