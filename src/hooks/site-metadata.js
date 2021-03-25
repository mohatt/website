import { useStaticQuery, graphql } from 'gatsby'

export default () => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            url
            copyright
            author {
              name
              screenName
              contacts {
                email
                twitter
                github
              }
            }
            menu {
              label
              to
            }
          }
        }
      }
    `
  )

  return site.siteMetadata
}