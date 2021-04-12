import React from 'react'
import Helmet from 'react-helmet'
import { useSiteMetadata } from '../hooks'
import { Layout } from '.'

export default function Page({ children, title, description, pre }) {
  const site = useSiteMetadata()
  const seoTitle = title ? `${title} — ${site.title}` : site.title
  const seoDescription = description || site.description
  if (typeof pre !== 'string') {
    const func = pre?.func || (title || site.title).replace(/[-_\s.]+(.)?/g, (_, c) => c ? c.toUpperCase() : '')
    const args = pre?.args || {}
    pre = `render(<${func} ${Object.keys(args)
      .filter(a => args[a] !== undefined)
      .map(a => `${a}=${JSON.stringify(args[a])} `)
      .join('')
    }/>);`
  }
  return (
    <Layout>
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
      <div className='px-20 font-display italic'>{pre}</div>
      {children}
    </Layout>
  )
}
