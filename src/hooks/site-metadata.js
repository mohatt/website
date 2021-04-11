import { useStaticQuery, graphql } from 'gatsby'

export default function useSiteMetadata() {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            url
            copyright
            theme
            contacts {
              type
              to
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
