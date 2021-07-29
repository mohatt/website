import { graphql, useStaticQuery } from 'gatsby'

export default function useSiteMetadata() {
  const data = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            deployment {
              date
              config {
                url
                analytics
              }
            }
          }
        }
      }
    `
  )

  return data.site.siteMetadata
}
