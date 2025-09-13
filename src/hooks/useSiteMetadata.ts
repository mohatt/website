import { graphql, useStaticQuery } from 'gatsby'

export interface SiteMetadata {
  socialBanner: Queries.SocialBannerFragment['childImageSharp']['socialBanner']
}

export function useSiteMetadata(): SiteMetadata {
  const data = useStaticQuery(graphql`
    query {
      socialBanner: file(relativePath: { eq: "site/social-banner-photo.jpg" }) {
        ...SocialBanner
      }
    }
  `)
  const {
    socialBanner: {
      childImageSharp: { socialBanner },
    },
  } = data
  return { socialBanner }
}

export const SocialBannerFragment = graphql`
  fragment SocialBanner on File {
    childImageSharp {
      socialBanner: resize(width: 1200, height: 630, fit: COVER, cropFocus: CENTER) {
        src
        width
        height
      }
    }
  }
`
