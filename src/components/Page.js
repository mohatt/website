import React from 'react'
import Helmet from 'react-helmet'
import { useSiteMetadata, useCurrentRoute } from '../hooks'
import { Layout } from '.'

export default function Page({ children, pretitle, title, description }) {
  const site = useSiteMetadata()
  const { path } = useCurrentRoute()
  title = title ? `${title} — ${site.title}` : site.title
  description = description || site.description
  return (
    <Layout>
      <Helmet>
        <title>{title}</title>
        <meta name='description' content={description} />
        <meta name='og:title' content={title} />
        <meta name='og:description' content={description} />
        <meta name='og:type' content='website' />
        <meta name='og:site_name' content={site.title} />
        <meta name='twitter:title' content={title} />
        <meta name='twitter:card' content='summary' />
        <meta name='twitter:description' content={description} />
      </Helmet>
      <div className='px-20 font-display italic'>
        {pretitle || `require('.${path === '/' ? '/index' : path}.js');`}
      </div>
      {children}
    </Layout>
  )
}
