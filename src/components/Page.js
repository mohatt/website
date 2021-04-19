import React from 'react'
import Helmet from 'react-helmet'
import { useSiteMetadata } from '../hooks'
import { Layout, Section } from '.'

const PageMeta = React.memo(({ title, description, pretext }) => {
  const site = useSiteMetadata()
  const seoTitle = title ? `${title} — ${site.title}` : site.title
  const seoDescription = description || site.description
  if (typeof pretext !== 'string') {
    const func = pretext?.func || (title || site.title).replace(/[-_\s.]+(.)?/g, (_, c) => c ? c.toUpperCase() : '')
    const args = pretext?.args || {}
    pretext = `render(<${func} ${Object.keys(args)
      .filter(a => args[a] !== undefined)
      .map(a => `${a}=${JSON.stringify(args[a])} `)
      .join('')
    }/>);`
  }
  return (
    <>
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
      <Section spacing={false} className='font-display italic'>{pretext}</Section>
    </>
  )
})

export default class Page extends React.Component {
  /**
   * Page metadta
   */
  title = null
  description = null
  pretext = null

  /**
   * Default layout
   */
  static layout = Layout

  /**
   * Should be implemented by page components
   */
  view() {
    return null
  }

  render() {
    const content = this.view()
    return (
      <>
        <PageMeta title={this.title} description={this.description} pretext={this.pretext} />
        {content}
      </>
    )
  }
}
