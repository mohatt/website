import type { ReactNode } from 'react'
import { Helmet } from 'react-helmet-async'
import { useLocation } from '@reach/router'
import { useLayout, SiteSocialBanner, useSiteMetadata } from '@/hooks'
import { site } from '@/constants'
import avatarAlt from '@/images/avatar/photo-nobg.webp'

export interface PageHeadProps {
  // SEO title
  title?: string
  // SEO description
  description?: string
  // Prevents search engines from indexing the page
  noIndex?: boolean
  // Image to be used in social media links
  image?: SiteSocialBanner
  // Extra Head tags specific to this page
  children?: ReactNode
}

export default function PageHead(props: PageHeadProps) {
  const layout = useLayout()
  const { pathname } = useLocation()
  const { socialBanner } = useSiteMetadata()
  const { title, description, noIndex, image, children } = props
  const seoTitle = title ? `${title} — ${site.title}` : site.title
  const seoDescription = description || site.description
  const ogImage = image ?? socialBanner

  /**
   * Gatsby Head doesn't re-render when layout context changes, so we have to use Helmet for now.
   *
   * @see https://github.com/gatsbyjs/gatsby/issues/38488
   */
  /*
  return (
    <>
      <html lang="en" data-layout={layout.id} />
      {noIndex && <meta name="robots" content="noindex" />}
      <title>{seoTitle}</title>
      <meta name="description" content={seoDescription} />
      <meta property="og:title" content={seoTitle} />
      <meta property="og:description" content={seoDescription} />
      <meta property="og:type" content='website' />
      <meta property="og:url" content={site.deployment.url + pathname} />
      <meta property="og:image" content={site.deployment.url + ogImage.src} />
      <meta property="og:image:width" content={ogImage.width.toString()} />
      <meta property="og:image:height" content={ogImage.height.toString()} />
      <meta property="og:image:alt" content={title || site.title} />
      <meta property="twitter:card" content='summary_large_image' />
      <link rel="prefetch" as='image' href={avatarAlt} />
      {children}
    </>
  )
  */

  return (
    <>
      <Helmet
        title={seoTitle}
        htmlAttributes={{ lang: 'en', 'data-layout': layout.id }}
        meta={[
          noIndex
            ? { name: 'robots', content: 'noindex' }
            : { name: 'description', content: seoDescription },
          { property: 'og:title', content: seoTitle },
          { property: 'og:description', content: seoDescription },
          { property: 'og:type', content: 'website' },
          { property: 'og:url', content: site.deployment.url + pathname },
          { property: 'og:image', content: site.deployment.url + ogImage.src },
          { property: 'og:image:width', content: ogImage.width.toString() },
          { property: 'og:image:height', content: ogImage.height.toString() },
          { property: 'og:image:alt', content: `Preview of ${seoTitle}` },
          { property: 'twitter:card', content: 'summary_large_image' },
        ]}
        link={[{ rel: 'prefetch', as: 'image', href: avatarAlt }]}
      />
      {children}
    </>
  )
}
