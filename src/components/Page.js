import React from 'react'
import { Helmet } from 'react-helmet'
import { site } from '../constants'
import { useAnalyticsCallback, useSiteMetadata } from '../hooks'
import { Layout, Section } from '.'
import socialBanner from '../images/social-banner.png'

function PageHelmet({ title = '', description, noIndex, image }) {
  const { deployment } = useSiteMetadata()
  const seoTitle = title ? `${title} — ${site.title}` : site.title
  const seoDescription = description || site.description
  const ogImage = image || socialBanner

  useAnalyticsCallback(({ config, event }) => {
    config({ page_title: title })
    event('page_view')
  }, [])

  return (
    <Helmet
      title={seoTitle}
      meta={[
        noIndex === true
          ? { name: 'robots', content: 'noindex' }
          : { name: 'description', content: seoDescription },
        { name: 'og:title', content: seoTitle },
        { name: 'og:description', content: seoDescription },
        { name: 'og:image', content: deployment.config.url + ogImage },
      ]}
    />
  )
}

function PageComponentSnippet({ $code, $comp = 'undefined', ...props }) {
  let className = 'font-display italic'
  if (!$code) {
    $comp = $comp.replace(/(?:^[^A-Za-z]*|[\W_]+)(.)?/g, (_, c) => c ? c.toUpperCase() : '')
    $code = `<${$comp} ${Object.keys(props)
      .filter(a => props[a] !== undefined)
      .map(a => `${a}=${JSON.stringify(props[a])} `)
      .join('')
    }/>`
  } else {
    className += ' text-lg'
  }
  return (
    <Section spacing={false} className={className}>
      {$code}
    </Section>
  )
}

/**
 * Base component for all page components
 * @abstract
 */
export default class Page extends React.Component {
  /**
   * SEO title
   * @type string
   */
  title

  /**
   * SEO description
   * @type string
   */
  description

  /**
   * Image to be used in social media links
   * @type string
   */
  image

  /**
   * Prevents search engines from indexing the page
   * @type boolean
   */
  noIndex

  /**
   * Page snippet
   * @type Object|string
   */
  snippet = {}

  /**
   * Default layout
   * @type Function
   */
  static Layout = Layout

  /**
   * Should be implemented by child Page components
   * @return {JSX.Element}
   */
  view() {
    return null
  }

  /**
   * Renders Page view template
   * @return {JSX.Element}
   */
  render() {
    const content = this.view()
    if (typeof this.snippet === 'string') {
      this.snippet = {
        $code: this.snippet,
      }
    } else if (!this.snippet.$comp) {
      this.snippet.$comp = this.title
    }
    return (
      <>
        <PageHelmet
          title={this.title}
          description={this.description}
          noIndex={this.noIndex}
          image={this.image}
        />
        <PageComponentSnippet {...this.snippet} />
        {content}
      </>
    )
  }
}
