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

function PageComponentSnippet({ $code, $comp = 'undefined', ...props }) {
  let className = 'font-display italic'
  if (!$code) {
    $comp = $comp.replace(/(?:^[^A-Za-z]*|[\W_]+)(.)?/g, (_, c) => c ? c.toUpperCase() : '')
    $code = `render(<${$comp} ${Object.keys(props)
      .filter(a => props[a] !== undefined)
      .map(a => `${a}=${JSON.stringify(props[a])} `)
      .join('')
    }/>);`
  } else {
    className += ' text-lg'
  }
  return (
    <Section spacing={false} className={className}>{$code}</Section>
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
        $code: this.snippet
      }
    } else if(!this.snippet.$comp) {
      this.snippet.$comp = this.title
    }
    return (
      <>
        <PageHelmet title={this.title} description={this.description} />
        <PageComponentSnippet {...this.snippet} />
        {content}
      </>
    )
  }
}
