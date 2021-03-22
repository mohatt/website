import { useStaticQuery, graphql } from 'gatsby'

const useSiteMetadata = () => {
  const { site } = useStaticQuery(
    graphql`
      query SiteMetaData {
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

export default useSiteMetadata
