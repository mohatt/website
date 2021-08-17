import React from 'react'
import { Helmet } from 'react-helmet-async'
import { site } from '../constants'
import { cx } from '../util'
import { useAnalyticsCallback, useSiteMetadata } from '../hooks'
import Providers from '../providers'
import { LayoutContext } from '../providers/layout'
import { DefaultLayout } from '../layouts'
import { Section } from '.'
import socialBanner from '../images/social-banner.png'

function PageHelmet({ page: { context, title = '', description, noIndex, image } }) {
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
      htmlAttributes={{ 'data-layout': context.id }}
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
   * Page actions
   * @type {JSX.Element}
   */
  actions

  /**
   * Default layout
   * @type Function
   */
  static Layout = DefaultLayout

  /**
   * Default providers
   * @type Function
   */
  static Providers = Providers

  static contextType = LayoutContext

  /**
   * Should be implemented by child Page components
   * @return {JSX.Element}
   */
  view() {
    return null
  }

  preView() {
    let { snippet, actions } = this
    const isText = typeof snippet === 'string'
    if (!isText) {
      let { $comp = this.title || 'undefined', ...props } = snippet
      $comp = $comp.replace(/(?:^[^A-Za-z]*|[\W_]+)(.)?/g, (_, c) => c ? c.toUpperCase() : '')
      snippet = `<${$comp} ${Object.keys(props)
        .filter(a => props[a] !== undefined)
        .map(a => `${a}=${JSON.stringify(props[a])} `)
        .join('')
      }/>`
    }
    return (
      <Section spacing={false} className={cx('flex font-display italic mb-4', isText && 'text-lg')}>
        <div className='flex-grow'>{snippet}</div>
        {actions && (
          <div className='text-right'>
            {actions}
          </div>
        )}
      </Section>
    )
  }

  render() {
    const { Layout, isPrint } = this.context
    const page = this.view()
    return (
      <>
        <PageHelmet page={this} />
        <Layout layout={this.context}>
          {!isPrint && this.preView()}
          {page}
        </Layout>
      </>
    )
  }
}
