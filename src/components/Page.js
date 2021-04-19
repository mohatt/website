import React from 'react'
import Helmet from 'react-helmet'
import { useSiteMetadata } from '../hooks'
import { Layout, Section } from '.'

function PageHelmet({ title, description }) {
  const site = useSiteMetadata()
  const seoTitle = title ? `${title} — ${site.title}` : site.title
  const seoDescription = description || site.description
  return (
    <Helmet>
      <title>{seoTitle}</title>
      <meta name='description' content={seoDescription} />
      <meta name='og:title' content={seoTitle} />
      <meta name='og:description' content={seoDescription} />
      <meta name='og:type' content='website' />
      <meta name='og:site_name' content={site.title} />
      <meta name='twitter:title' content={seoTitle} />
      <meta name='twitter:card' content='summary' />
      <meta name='twitter:description' content={seoDescription} />
    </Helmet>
  )
}

function PageSnippet({ $title, $text, $type, ...props }) {
  if (!$text) {
    $type = $type || $title.replace(/[-_\s.]+(.)?/g, (_, c) => c ? c.toUpperCase() : '')
    $text = `render(<${$type} ${Object.keys(props)
      .filter(a => props[a] !== undefined)
      .map(a => `${a}=${JSON.stringify(props[a])} `)
      .join('')
    }/>);`
  }
  return (
    <Section spacing={false} className='font-display italic'>{$text}</Section>
  )
}

/**
 * Base component for all page components
 * @abstract
 */
export default class Page extends React.Component {
  /**
   * Page seo title
   * @type string
   */
  title

  /**
   * Page seo description
   * @type string
   */
  description

  /**
   * Page snippet
   * @type Object|string
   */
  snippet = {}

  /**
   * Default layout
   * @type Function
   */
  static layout = Layout

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
        $text: this.snippet
      }
    }
    return (
      <>
        <PageHelmet title={this.title} description={this.description} />
        <PageSnippet $title={this.title} {...this.snippet} />
        {content}
      </>
    )
  }
}
