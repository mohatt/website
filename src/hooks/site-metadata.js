import { useStaticQuery, graphql } from 'gatsby'

export default function useSiteMetadata() {
  const data = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            titleShort
            description
            url
            copyright
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

  return data.site.siteMetadata
}
