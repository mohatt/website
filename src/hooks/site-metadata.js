import { graphql, useStaticQuery } from 'gatsby'

export default function useSiteMetadata() {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          deployment {
            date(formatString: "YYYY-MM-DD")
            config {
              url
              analytics
            }
          }
        }
      }
      socialBanner: file(relativePath: { eq: "site/social-banner-photo.jpg" }) {
        ...SocialBannerFragment
      }
    }
  `)
  const { site: { siteMetadata }, socialBanner: { childImageSharp: { socialBanner } } } = data
  return { ...siteMetadata, socialBanner }
}

export const SocialBannerFragment = graphql`
  fragment SocialBannerFragment on File {
    childImageSharp {
      socialBanner: resize(width: 1200, height: 630, fit: COVER, cropFocus: CENTER) {
        src
        width
        height
      }
    }
  }
`
