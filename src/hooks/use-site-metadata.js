import { useStaticQuery, graphql } from 'gatsby'

const useSiteMetadata = () => {
  const { site } = useStaticQuery(
    graphql`
      query SiteMetaData {
        site {
          siteMetadata {
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
              route
            }
            url
            title
            description
            copyright
          }
        }
      }
    `
  )

  return site.siteMetadata
}

export default useSiteMetadata
